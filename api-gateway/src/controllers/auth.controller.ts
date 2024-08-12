import { Body, Controller, Get, Post, Headers, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { RegistrationUserDto } from 'src/dtos/registration-user.dto';

class RegistrationResData {
  @ApiProperty({ description: 'Access token' })
  access_token: string;
}
class RegistrationRes {
  @ApiProperty({ description: 'Success identifier' })
  success: boolean;

  @ApiProperty({ description: 'Microservices\'s response', type: RegistrationResData })
  data: {
    access_token: string;
  }

  @ApiProperty({ description: 'Error message', nullable: true })
  error: null | string;
}

class UserInfoResData {
  @ApiProperty({ description: 'User login' })
  login: string;

  @ApiProperty({ description: 'User password' })
  password: string;
}
class UserInfoRes {
  @ApiProperty({ description: 'Success identifier' })
  success: boolean;

  @ApiProperty({ description: 'Microservices\'s response', type: UserInfoResData })
  data: {
    login: string;
    password: string;
  }

  @ApiProperty({ description: 'Error message', nullable: true })
  error: null | string;
}

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly appService: AppService
  ) { }

  @ApiOperation({ summary: 'Регистрация пользователя и получение токена авторизации' })
  @ApiBody({ type: RegistrationUserDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created user', type: RegistrationRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @Post('/registration')
  async registrationUser(
    @Body() payload: RegistrationUserDto,
  ): Promise<{
    success: boolean,
    data: {
      access_token: string
    },
    error: null | string
  }> {
    return {
      success: true,
      data: await this.appService.registrationUser(payload),
      error: null,
    }
  }

  @ApiOperation({ summary: 'Получение информации пользователя' })
  @ApiHeader({ name: 'Authorization', description: 'Authorization Bearer token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get user info', type: UserInfoRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @Get('/user-info')
  async getInfoUser(
    @Headers() headers: any
  ): Promise<{
    success: boolean,
    data: {
      login: string,
      password: string,
    },
    error: null | string
  }> {
    return {
      success: true,
      data: await this.appService.getUserInfo(headers),
      error: null
    }
  }
}


