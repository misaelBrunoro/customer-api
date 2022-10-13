import { InjectRedis } from '@nestjs-modules/ioredis'
import { BadGatewayException, Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisCacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async keys(key): Promise<any> {
    return await this.redis.keys(key, function (err, res) {
      if (err) throw new BadGatewayException('cache indisponível')
      return res
    })
  }

  async get(key): Promise<any> {
    return await this.redis.get(key, function (err, res) {
      if (err) throw new BadGatewayException('cache indisponível')
      return res
    })
  }

  async set(key, value): Promise<any> {
    return await this.redis.set(key, value, function (err, res) {
      if (err) throw new BadGatewayException('cache indisponível')
      return res
    })
  }

  async del(key): Promise<any> {
    return await this.redis.del(key, function (err, res) {
      if (err) throw new BadGatewayException('cache indisponível')
      return res
    })
  }
}
