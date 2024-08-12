import { Injectable } from '@nestjs/common';
import { ItCompany } from './entities/it-company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ItCompany)
    private readonly itCompanyRepository: Repository<ItCompany>
  ) { }

  async getAllCompanies(): Promise<Array<ItCompany>> {
    return await this.itCompanyRepository.find({});
  }
}
