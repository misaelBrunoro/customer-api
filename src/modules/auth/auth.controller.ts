import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthResponseDto } from './dto/auth-response.dto'
import { AuthDto } from './dto/auth.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async store(@Body() authDto: AuthDto): Promise<AuthResponseDto> {
    return this.authService.doLogin(authDto)
  }
}
