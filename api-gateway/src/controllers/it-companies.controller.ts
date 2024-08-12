import { Controller, Get, Headers, HttpStatus } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app.service';

class GetAllItCompaniesResData {
  @ApiProperty({ description: 'Company identifier' })
  id: number;

  @ApiProperty({ description: 'Company name' })
  name: string;
}
class GetAllItCompaniesRes {
  @ApiProperty({ description: 'Success identifier' })
  success: boolean;

  @ApiProperty({ description: 'Microservices\'s response', isArray: true, type: GetAllItCompaniesResData })
  data: Array<{
    id: number;
    name: string;
  }>;

  @ApiProperty({ description: 'Error message', nullable: true })
  error: null | string
}

@ApiTags('Russian It Companies')
@Controller()
export class ItCompaniesController {
  constructor(
    private readonly appService: AppService
  ) { }

  @ApiOperation({ summary: 'Получение всех российских IT-компаний' })
  @ApiHeader({ name: 'Authorization', description: 'Authorization Bearer token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get all it companies', type: GetAllItCompaniesRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @Get('/it-companies')
  async getItCompanies(
    @Headers() headers: any
  ): Promise<{
    success: boolean,
    data: Array<{
      id: number,
      name: string,
    }>,
    error: null | string
  }> {
    return {
      success: true,
      data: await this.appService.getAllItCompanies(headers),
      error: null
    }
  }
}
