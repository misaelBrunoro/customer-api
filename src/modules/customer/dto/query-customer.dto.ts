import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CustomerQuery {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  readonly id: string
}