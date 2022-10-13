import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { AuthResponseDto } from './dto/auth-response.dto'
import { RedisCacheService } from 'src/redis-cache/redis-cache.service'

const BASE_KEY = 'user-auth'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(RedisCacheService)
    private readonly redisService: RedisCacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    let auth = await this.redisService.get(BASE_KEY)
    auth = plainToClass(AuthResponseDto, JSON.parse(auth))
    return this.validateRequest(request, auth)
  }

  async validateRequest(request: any, auth: AuthResponseDto): Promise<boolean> {
    const token = request.headers.authorization
    if ('Bearer ' + auth.access_token === token) {
      return true
    }
    return false
  }
}
