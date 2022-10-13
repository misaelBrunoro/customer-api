import { InjectRedis } from '@nestjs-modules/ioredis'
import { v4 as uuidv4 } from 'uuid'
import { AuthDto } from './dto/auth.dto'
import Redis from 'ioredis'

const REDIS_KEY = 'user-auth'

export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async store(authDto: AuthDto) {
    await this.redis.set(uuidv4(), JSON.stringify(authDto));
  }

  async get() {
    const redisData = await this.redis.get(REDIS_KEY);
    return { redisData };
  }
}