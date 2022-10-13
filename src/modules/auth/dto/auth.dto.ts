import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  readonly password: string
}
