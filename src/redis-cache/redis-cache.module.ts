import { Global, Module } from '@nestjs/common'
import { RedisModule } from '@nestjs-modules/ioredis'
import { ConfigService } from '@nestjs/config'
import { RedisCacheService } from './redis-cache.service'

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        config: {
          host: config.get<string>('REDIS_HOST'),
          password: config.get<string>('REDIS_PASSWORD'),
          port: config.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
