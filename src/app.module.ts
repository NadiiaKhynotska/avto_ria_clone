import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/config';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // PostgresModule,
    // RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    // ArticleModule,
    // AuthModule,
    HealthModule,
    // RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
