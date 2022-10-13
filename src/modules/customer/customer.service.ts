import { InjectRedis } from '@nestjs-modules/ioredis'
import { CustomerDto } from './dto/customer.dto'
import { v4 as uuidv4 } from 'uuid'
import Redis from 'ioredis'

const REDIS_KEY = 'customer:'

export class CustomerService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async index() {
    const redisData = await this.redis.get(REDIS_KEY + '*');
    return { redisData };
  }

  async store(customerDto: CustomerDto) {
    await this.redis.set(uuidv4(), JSON.stringify(customerDto));
  }

  async show(id: string) {
    const redisData = await this.redis.get(REDIS_KEY + id);
    return { redisData };
  }
}