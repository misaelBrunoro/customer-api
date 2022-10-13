import { AuthDto } from './dto/auth.dto'
import { HttpService } from '@nestjs/axios'
import { AuthResquestDto } from './dto/auth-request.dto'
import { catchError, map, Observable } from 'rxjs'
import { BadGatewayException, Injectable } from '@nestjs/common'
import * as querystring from 'query-string'
import { RedisCacheService } from 'src/redis-cache/redis-cache.service'

const BASE_KEY = 'user-auth'
const AUTH_ENDPOINT = 'auth/realms/careers/protocol/openid-connect/token'

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisCacheService,
    private readonly http: HttpService,
  ) {}

  doLogin(authDto: AuthDto): Observable<Promise<any>> {
    const request: AuthResquestDto = {
      grant_type: 'client_credentials',
      client_id: 'customers',
      client_secret: '453000f7-47a0-4489-bc47-891c742650e2',
      username: authDto.username,
      password: authDto.password,
      scope: 'openid',
    }
    return this.http
      .post(
        process.env.SSO_URL + AUTH_ENDPOINT,
        querystring.stringify(request),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(
        map(async (res) => {
          await this.redisService.set(BASE_KEY, JSON.stringify(res.data))
          return res.data
        }),
      )
      .pipe(
        catchError(() => {
          throw new BadGatewayException('SSO indisponível')
        }),
      )
  }
}
