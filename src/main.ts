import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { join } from 'path';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: process.env.CORS || '*' }));
  app.useStaticAssets(join(__dirname, '..', 'assets'), { prefix: '/imgs/' });
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
