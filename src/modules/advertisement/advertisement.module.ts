import { Module } from '@nestjs/common';

import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './services/advertisement.service';

@Module({
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
  exports: [],
})
export class AdvertisementModule {}
