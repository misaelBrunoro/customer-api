import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CustomerDto {
    @ApiProperty({ required: true, type: Number })
    @IsNumber()
    @IsNotEmpty()
    readonly document: number

    @ApiProperty({ required: true, type: String })
    @IsString()
    @IsNotEmpty()
    readonly name: string
}