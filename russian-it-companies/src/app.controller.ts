import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthUserGuard } from './guards/auth.guard';
import { ItCompany } from './entities/it-company.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(AuthUserGuard)
  @MessagePattern({ cmd: 'get-all-russian-it-companies' })
  async getAllCompanies(): Promise<Array<ItCompany>> {
    return await this.appService.getAllCompanies();
  }
}
