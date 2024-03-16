import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { CarEntity } from '../../../database/entities/car.entity';
import { AdvertisementResponseDto } from '../models/dto/response/advertisement.response.dto';

export class AdvertisementMapper {
  public static toResponseDto(
    advertisementEntity: AdvertisementEntity,
    carEntity: CarEntity,
  ): AdvertisementResponseDto {
    return {
      advertisement_id: advertisementEntity.id,
      title: advertisementEntity.title,
      description: advertisementEntity.description,
      body: advertisementEntity.description,
      status: advertisementEntity.status,
      region: advertisementEntity.region,
      user_id: advertisementEntity.user_id,
      car_id: carEntity.id,
      year: carEntity.year,
      color: carEntity.color,
      mileage: carEntity.mileage,
      prise: carEntity.prise,
      currency: carEntity.currency,
      image: carEntity.image,
    };
  }

  // public static ToListResponseDto(
  //   entities: AdvertisementResponseDto[],
  //   total: number,
  //   query: AdvertisementListRequestDto,
  // ): AdvertisementListResponseDto {
  //   const listResponse:AdvertisementResponseDto[]= entities.map(entity)=>{
  //
  //   }
  //   return {
  //     data: entities.map(this.toResponseDto),
  //     meta: {
  //       limit: query.limit,
  //       offset: query.offset,
  //       total,
  //     },
  //   };
  // }
}
