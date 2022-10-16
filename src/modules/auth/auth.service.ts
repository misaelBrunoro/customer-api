import { AuthDto } from './dto/auth.dto'
import { HttpService } from '@nestjs/axios'
import { AuthResquestDto } from './dto/auth-request.dto'
import { catchError, map, Observable } from 'rxjs'
import { BadGatewayException, Injectable } from '@nestjs/common'
import * as querystring from 'query-string'
import { RedisCacheService } from '../../redis-cache/redis-cache.service'
import { plainToClass } from 'class-transformer'
import { AuthResponseDto } from './dto/auth-response.dto'

const BASE_KEY = 'user-auth'
const AUTH_ENDPOINT = 'auth/realms/careers/protocol/openid-connect/token'
const CLIENT_SECRET = '453000f7-47a0-4489-bc47-891c742650e2'
const CLIENT_ID = 'customers'
const GRANT_TYPE = 'client_credentials'
const OPEN_ID = 'openid'

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisCacheService,
    private readonly http: HttpService,
  ) {}

  doLogin(authDto: AuthDto): Observable<Promise<AuthResponseDto>> {
    const request: AuthResquestDto = {
      grant_type: CLIENT_SECRET,
      client_id: CLIENT_ID,
      client_secret: GRANT_TYPE,
      username: authDto.username,
      password: authDto.password,
      scope: OPEN_ID,
    }
    return this.login(request)
  }

  private login(
    request: AuthResquestDto,
  ): Observable<Promise<AuthResponseDto>> {
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
          return plainToClass(AuthResponseDto, res.data)
        }),
      )
      .pipe(
        catchError(() => {
          throw new BadGatewayException('SSO indisponível')
        }),
      )
  }
}
