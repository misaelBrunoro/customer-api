import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(helmet())

  const swaggerOptions = new DocumentBuilder()
  .setTitle('customer-api')
  .setDescription("Customer API")
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, swaggerOptions)

  SwaggerModule.setup('/docs', app, document)

  await app.listen(process.env.APP_PORT || 3000)

  process.on('unhandledRejection', (reason, promise) => {
    console.error(reason)
    console.log(promise)
  })

  process.on('uncaughtException', (err) => {
    console.error(err)
  })
}

bootstrap().catch((err) => console.error(err))
