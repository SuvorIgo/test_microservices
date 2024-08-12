import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegistrationUserDto } from './dtos/registration-user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: ClientProxy,
    @Inject('RUSSIAN-IT-COMPANIES_SERVICE')
    private readonly rusItCompanies: ClientProxy
  ) { }

  async registrationUser(payload: RegistrationUserDto): Promise<{
    access_token: string;
  }> {
    return await lastValueFrom(this.authService.send({ cmd: 'registration-user' }, payload));
  }

  async getUserInfo(headers: any): Promise<any> {
    return await lastValueFrom(this.authService.send({ cmd: 'get-user-info' }, { headers }));
  }

  async getAllItCompanies(headers: any): Promise<any> {
    return await lastValueFrom(this.rusItCompanies.send({ cmd: 'get-all-russian-it-companies' }, { headers }));
  }
}
