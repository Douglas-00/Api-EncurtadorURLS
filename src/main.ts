import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Config Swagger
  const config = new DocumentBuilder()
    .setTitle('Encurtador de URL')
    .setDescription('APi de encurtador de URL')
    .setVersion('1.0')
    .addTag('encurtador')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
