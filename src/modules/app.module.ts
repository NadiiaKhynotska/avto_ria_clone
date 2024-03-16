import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/config';
import { AdminManagerModule } from './admin-manager/admin-manager.module';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { AuthModule } from './auth/auth.module';
import { CarBrandModelModule } from './car-brand-model/car-brand-model.module';
import { HealthModule } from './health/health.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostgresModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    AdminManagerModule,
    AdvertisementModule,
    CarBrandModelModule,
    AuthModule,
    HealthModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
