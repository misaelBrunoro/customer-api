import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@ApiTags('auths')
@Controller('auths')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post()
 //@UseGuards(JwtAuthGuard)
  async store(@Body() authDto: AuthDto) {
    return this.authService.store(authDto)
  }
}