import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './controllers/auth.controller';
import { ItCompaniesController } from './controllers/it-companies.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
          queue: 'auth_queue'
        }
      },
      {
        name: 'RUSSIAN-IT-COMPANIES_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
          queue: 'russian-it-companies_queue'
        }
      }
    ]),
  ],
  controllers: [
    AuthController,
    ItCompaniesController
  ],
  providers: [AppService],
})
export class AppModule { }
