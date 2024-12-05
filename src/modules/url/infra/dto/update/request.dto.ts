import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsString, Matches } from 'class-validator';

export class UpdateUrlRequestDto {
  @ApiPropertyOptional({
    description: 'The original URL to shorten',
    example: 'https://example.com/some-long-url',
  })
  @IsString()
  @Matches(/^(https?:\/\/)/, {
    message: 'The URL must start with http:// or https://',
  })
  fromUrl?: string;
}

export class UpdateUrlIdRequestDto {
  @ApiProperty({ description: 'Id da URL', example: 1 })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
