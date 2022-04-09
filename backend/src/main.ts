import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Tuture')
    .setDescription('A platform to match tutor and student.')
    .setVersion('1.0')
    .addTag('appointment')
    .addTag('auth')
    .addTag('chat')
    .addTag('review')
    .addTag('score')
    .addTag('student')
    .addTag('subject')
    .addTag('tutor')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const fs = require('fs');
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
