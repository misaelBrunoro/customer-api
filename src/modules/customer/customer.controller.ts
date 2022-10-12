import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '../auth/auth.guard'
import { CustomerService } from './customer.service'
import { CustomerDto } from './dto/customer.dto'

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async index() {
    return this.customerService.index()
  }

  @Post()
  @UseGuards(AuthGuard)
  async store(@Body() customerDto: CustomerDto) {
    return this.customerService.store(customerDto)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.customerService.show(id)
  }
}