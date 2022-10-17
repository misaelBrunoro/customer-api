import { InjectRedis } from '@nestjs-modules/ioredis'
import { BadGatewayException, Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { RedisCacheInterface } from './redis-cache.interface'

@Injectable()
export class RedisCacheService implements RedisCacheInterface {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async keys(key: string): Promise<any> {
    return await this.redis.keys(key, function (err, res) {
      if (err) throw new BadGatewayException('cache indisponível')
      return res
    })
  }

  async get(key: string): Promise<any> {
    return await this.redis.get(key, function (err, res) {
      if (err) throw new BadGatewayException('cache indisponível')
      return res
    })
  }

  async set(key: string, value: any): Promise<any> {
    return await this.redis.set(key, value, function (err, res) {
      if (err) throw new BadGatewayException('cache indisponível')
      return res
    })
  }

  async del(key: string): Promise<any> {
    return await this.redis.del(key, function (err, res) {
      if (err) throw new BadGatewayException('cache indisponível')
      return res
    })
  }
}
