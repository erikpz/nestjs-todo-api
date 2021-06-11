import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}
bootstrap();
