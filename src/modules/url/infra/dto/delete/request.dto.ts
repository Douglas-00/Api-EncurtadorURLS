import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class DeleteUrlRequestDto {
  @ApiProperty({ description: 'Id da URL', example: 1 })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
