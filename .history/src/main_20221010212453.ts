import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)


  const swaggerOptions = new DocumentBuilder().setTitle('customer-api').setDescription("Customer API").setVersion('1.0').build()

  await app.listen(3000)
}
bootstrap();
