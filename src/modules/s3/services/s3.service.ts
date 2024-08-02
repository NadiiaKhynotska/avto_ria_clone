// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { MinioService } from 'nestjs-minio-client';
// import { join } from 'path';
//
// import { Config, S3Config } from '../../../configs/config.type';
// import { CarRepository } from '../../repository/services/car.repository';
//
// @Injectable()
// export class S3Service {
//   constructor(
//     private readonly minioService: MinioService,
//     private readonly carRepository: CarRepository,
//     private readonly configService: ConfigService<Config>,
//   ) {}
//
//   async uploadFile(file: Express.Multer.File, carId: string): Promise<string> {
//     const filePath = this.buildPath(file.originalname, carId);
//     const s3Config = this.configService.get<S3Config>('s3');
//     try {
//       const { bucketName } = s3Config;
//       await this.minioService.client.putObject(
//         bucketName,
//         filePath,
//         file.mimetype,
//         file.size,
//         // objectAcl,
//       );
//       return filePath;
//     } catch (error) {
//       // console.error('Error uploading file to MinIO:', error);
//       throw error;
//     }
//   }
//
//   async deleteFile(filePath: string): Promise<void> {
//     const s3Config = this.configService.get<S3Config>('s3');
//     try {
//       const { bucketName } = s3Config;
//       await this.minioService.client.removeObject(bucketName, filePath);
//     } catch (error) {
//       // console.error('Error deleting file from MinIO:', error);
//       throw error;
//     }
//   }
//
//   async uploadCarPhoto(
//     file: Express.Multer.File,
//     carId: string,
//   ): Promise<string> {
//     const s3Config = this.configService.get<S3Config>('s3');
//     const filePath = await this.uploadFile(file, carId);
//     const { bucketPath } = s3Config;
//     const urlPhoto = `${bucketPath}${filePath}`;
//     const car = await this.carRepository.findOneBy({ id: carId });
//     car.image = urlPhoto;
//     await this.carRepository.save(car);
//     return urlPhoto;
//   }
//
//   async deleteCarPhoto(carId: string): Promise<void> {
//     const car = await this.carRepository.findOneBy({ id: carId });
//     if (!car || !car.image) {
//       throw new NotFoundException('Car photo not found');
//     }
//
//     const s3Config = this.configService.get<S3Config>('s3');
//     const { bucketPath } = s3Config;
//     const filePath = car.image.replace(bucketPath, '');
//     await this.deleteFile(filePath);
//     car.image = null;
//     await this.carRepository.save(car);
//   }
//
//   private buildPath(fileName: string, carId: string): string {
//     return join('cars', carId, fileName);
//   }
// }
import * as path from 'node:path';

import {
  DeleteObjectCommand,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';

import getConfigs from '../../../configs/config';
import { CarRepository } from '../../repository/services/car.repository';
import { s3ClientMinio } from '../configs/minio-config';

dotenv.config({ path: './environments/local.env' });

const s3Config = getConfigs().s3;

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  constructor(private readonly carRepository: CarRepository) {
    this.client = s3ClientMinio;
  }

  async uploadCarPhoto(
    file: Express.Multer.File,
    carId: string,
  ): Promise<string> {
    const car = await this.carRepository.findByIdOrThrow(carId);

    if (car.image) {
      await this.deleteFileFromS3(car.image);
    }

    const filePath = this.buildPath(file.originalname, carId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: s3Config.bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: s3Config.objectAcl as ObjectCannedACL,
        ContentLength: file.size,
      }),
    );
    await this.carRepository.save(car);
    return filePath;
  }

  async deleteFileFromS3(filePath: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: s3Config.bucketName,
          Key: filePath,
        }),
      );
    } catch (error) {
      throw new NotFoundException(
        `Failed to delete file from S3: ${error.message}`,
      );
    }
  }

  private buildPath(fileName: string, carId: string): string {
    return `cars/${carId}/${v4()}${path.extname(fileName)}`;
  }
}
