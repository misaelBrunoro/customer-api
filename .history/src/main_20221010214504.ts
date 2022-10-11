import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)


  const swaggerOptions = new DocumentBuilder()
  .setTitle('customer-api')
  .setDescription("Customer API")
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, swaggerOptions)

  SwaggerModule.setup('/docs', app, document)

  app.use(helmet())
  app.use(cookieParser());
  await app.listen(3000)
}
bootstrap();
