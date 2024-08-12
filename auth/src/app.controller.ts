import { Body, Controller, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, MessagePattern, NatsContext } from '@nestjs/microservices';
import { RegistrationUserType } from './types/registration-user.type';
import { User } from './entities/user.entity';
import { AuthUserGuard } from './quards/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @MessagePattern({ cmd: 'registration-user' })
  async registrationUser(
    @Body() payload: RegistrationUserType
  ): Promise<{
    access_token: string
  }> {
    return await this.appService.registrationUser(payload);
  }

  @UseGuards(AuthUserGuard)
  @MessagePattern({ cmd: 'get-user-info' })
  async getUserInfo(
    @Body() req: any,
  ): Promise<User> {
    return await this.appService.getUserById(req['cookies'].uId);
  }

  @UseGuards(AuthUserGuard)
  @MessagePattern({ cmd: 'check-user-auth' })
  checkUserAuth(): { success: boolean } {
    return this.appService.checkUserAuth();
  }
}
