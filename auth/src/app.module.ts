import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'auth_db',
      entities: [User],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'secret-key',
      signOptions: { expiresIn: '30 days' }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
