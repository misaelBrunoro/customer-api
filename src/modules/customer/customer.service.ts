import { CustomerDto } from './dto/customer.dto'
import { v4 as uuidv4 } from 'uuid'
import { plainToClass } from 'class-transformer'
import { RedisCacheService } from '../../redis-cache/redis-cache.service'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UpdateCustomerDto } from './dto/update-customer.dto'

const BASE_KEY = 'customer:'

@Injectable()
export class CustomerService {
  constructor(private readonly redisService: RedisCacheService) {}

  async index(): Promise<CustomerDto[]> {
    const customers: CustomerDto[] = []
    const keys = await this.redisService.keys(BASE_KEY + '*')
    await Promise.all(
      keys.map(async (key) => {
        const data = await this.redisService.get(key)
        customers.push(plainToClass(CustomerDto, JSON.parse(data)))
      }),
    )
    return customers
  }

  async store(customerDto: CustomerDto) {
    await this.redisService.set(
      BASE_KEY + uuidv4(),
      JSON.stringify(customerDto),
    )
  }

  async show(id: string): Promise<CustomerDto> {
    const customer = await this.redisService.get(BASE_KEY + id)

    if (!customer) {
      throw new NotFoundException('cliente inexistente')
    }

    return plainToClass(CustomerDto, JSON.parse(customer))
  }

  async put(id: string, customerDto: UpdateCustomerDto) {
    const customerAlreadyExist = await this.redisService.get(
      BASE_KEY + customerDto.id,
    )
    if (customerAlreadyExist) {
      throw new ConflictException('conflito de ID')
    }

    const customerToUpdate = await this.redisService.get(BASE_KEY + id)
    if (!customerToUpdate) {
      throw new NotFoundException('cliente inexistente')
    }
    await this.redisService.del(BASE_KEY + id)

    const customer: CustomerDto = {
      document: customerDto.document,
      name: customerDto.name,
    }
    await this.redisService.set(
      BASE_KEY + customerDto.id,
      JSON.stringify(customer),
    )
  }
}
