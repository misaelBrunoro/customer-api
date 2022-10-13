import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@ApiTags('auths')
@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async store(@Body() authDto: AuthDto): Promise<Observable<Promise<any>>> {
    return this.authService.doLogin(authDto)
  }
}
