import { Module } from '@nestjs/common'
import { RedisModule } from '@nestjs-modules/ioredis'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ImportsModule } from './modules/imports.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    RedisModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        config: { 
          host: config.get<string>('REDIS_HOST'),
          password: config.get<string>('REDIS_PASSWORD'),
          port: config.get<number>('REDIS_PORT')
        },
      }),
      inject: [ConfigService],
    }),
    ImportsModule
  ],
})

export class AppModule {}
