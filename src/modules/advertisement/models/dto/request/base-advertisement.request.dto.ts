import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { RegionsEnum } from '../../../../../database/enums/regions.enum';

export class BaseAdvertisementRequestDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @ApiProperty()
  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @ApiProperty()
  @IsString()
  @Length(0, 3000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  body: string;

  @ApiProperty()
  @IsEnum(RegionsEnum)
  // @Transform(TransformHelper.trim)
  @Type(() => String)
  region: RegionsEnum;

  @ApiProperty()
  @IsNumber()
  @Min(1988)
  @Max(new Date().getFullYear())
  // @Transform(TransformHelper.trim)
  @Type(() => Number)
  year: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  color: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(3000)
  // @Transform(TransformHelper.trim)
  mileage: number;

  @ApiProperty()
  @IsInt()
  @Min(100)
  @Max(1000000)
  // @Transform(TransformHelper.trim)
  // @Type(() => String)
  prise: number;

  // @ApiProperty()
  @IsString()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  currency: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  image: string;

  @ApiProperty()
  @IsString()
  @Transform(TransformHelper.toLowerCase)
  @Type(() => String)
  car_brand: string;

  @ApiProperty()
  @IsString()
  @Transform(TransformHelper.toLowerCase)
  @Type(() => String)
  car_model: string;
}
