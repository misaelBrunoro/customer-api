import { InjectRedis } from '@nestjs-modules/ioredis'
import { CustomerDto } from './dto/customer.dto'
import { uuid } from 'uuidv4'
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
    await this.redis.set(uuid(), JSON.stringify(customerDto));
  }

  async show(id: string) {
    const redisData = await this.redis.get(REDIS_KEY + id);
    return { redisData };
  }
}