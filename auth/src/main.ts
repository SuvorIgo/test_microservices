import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'],
      queue: 'auth_queue'
    }
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.listen();
}
bootstrap();
