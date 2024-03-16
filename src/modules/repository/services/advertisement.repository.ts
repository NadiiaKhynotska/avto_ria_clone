import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { AdvertisementListRequestDto } from '../../advertisement/models/dto/request/advertisement-list.request.dto';

@Injectable()
export class AdvertisementRepository extends Repository<AdvertisementEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvertisementEntity, dataSource.manager);
  }

  public async findByIdOrThrow(id: string): Promise<AdvertisementEntity> {
    const entity = await this.findOneBy({ id });
    if (!entity) {
      throw new UnprocessableEntityException('Advertisement not found');
    }
    return entity;
  }

  public async getAll(
    query: AdvertisementListRequestDto,
  ): Promise<[AdvertisementEntity[], number]> {
    const qb = this.createQueryBuilder('advertisement');
    qb.leftJoinAndSelect('advertisement.car', 'car');
    qb.orderBy('car_id', 'ASC');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
