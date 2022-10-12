import { InjectRedis } from '@nestjs-modules/ioredis'
import { uuid } from 'uuidv4'
import { AuthDto } from './dto/auth.dto'
import Redis from 'ioredis'

const REDIS_KEY = 'user-auth'

export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async store(authDto: AuthDto) {
    await this.redis.set(uuid(), JSON.stringify(authDto));
  }

  async get() {
    const redisData = await this.redis.get(REDIS_KEY);
    return { redisData };
  }
}