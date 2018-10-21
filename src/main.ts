import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: 'http://192.168.1.38:8080' }));
  app.useStaticAssets(join(__dirname, '..', 'assets'), { prefix: '/imgs/' });
  await app.listen(3000);
}
bootstrap();
