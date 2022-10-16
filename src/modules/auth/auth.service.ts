import { AuthDto } from './dto/auth.dto'
import { HttpService } from '@nestjs/axios'
import { AuthResquestDto } from './dto/auth-request.dto'
import { catchError, map, Observable, firstValueFrom } from 'rxjs'
import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common'
import * as querystring from 'query-string'
import { RedisCacheService } from '../../redis-cache/redis-cache.service'
import { plainToClass } from 'class-transformer'
import { AuthResponseDto } from './dto/auth-response.dto'
import { AUTH_ENDPOINT, BASE_KEY_AUTH, CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, OPEN_ID } from '../../utils/consts'

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisCacheService,
    private readonly http: HttpService,
  ) {}

  async doLogin(authDto: AuthDto): Promise<AuthResponseDto> {
    const request: AuthResquestDto = {
      grant_type: GRANT_TYPE,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: authDto.username,
      password: authDto.password,
      scope: OPEN_ID,
    }
  
    return await firstValueFrom(this.login(request))
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
          await this.redisService.set(BASE_KEY_AUTH, JSON.stringify(res.data))
          return plainToClass(AuthResponseDto, res.data)
        }),
      )
      .pipe(
        catchError((err) => {
          if (err.response.status >= 500) {
            throw new BadGatewayException('SSO indisponível')
          }
          throw new BadRequestException(err.response.data)
        }),
      )
  }
}
