import { Injectable } from '@nestjs/common';
import { RegistrationUserType } from './types/registration-user.type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async registrationUser(payload: RegistrationUserType): Promise<{
    access_token: string
  }> {
    const newUser: { login: string, password: string, id?: number } = {
      login: payload.login,
      password: await bcrypt.hash(payload.password, 11)
    };

    Object.assign(newUser, await this.userRepository.save(newUser))

    return {
      access_token: await this.jwtService.signAsync({
        userName: newUser.login,
        userId: newUser.id
      })
    }
  }

  async getUserById(userId: number): Promise<any> {
    return await this.userRepository.findOne({
      where: {
        id: userId
      },
      select: [
        'login',
        'password'
      ]
    })
  }

  checkUserAuth(): { success: boolean } {
    return {
      success: true
    }
  }
}
