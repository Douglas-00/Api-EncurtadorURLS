import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateUserRequestDto {
  @ApiPropertyOptional({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    required: false,
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Senha do usuário, deve ter pelo menos 6 caracteres',
    example: 'password123',
    required: false,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    description: 'Senha do usuário, deve ter pelo menos 6 caracteres',
    example: 'password123',
    required: false,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @IsOptional()
  oldPassword?: string;
}

export class UpdateUserIdRequestDto {
  @ApiProperty({ description: 'Id do usuário', example: 1 })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
