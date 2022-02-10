import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.MONGO_DB_URI);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
