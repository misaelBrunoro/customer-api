import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ImportsModule } from './modules/imports.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    ImportsModule,
  ],
})
export class AppModule {}
