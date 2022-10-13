import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UpdateCustomerDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  readonly id: string

  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  @IsNotEmpty()
  readonly document: number

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  readonly name: string
}
