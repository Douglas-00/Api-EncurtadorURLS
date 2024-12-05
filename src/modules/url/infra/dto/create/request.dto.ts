import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUrlRequestDto {
  @ApiProperty({
    description: 'The original URL to shorten',
    example: 'https://example.com/some-long-url',
  })
  @IsString()
  @IsNotEmpty()
  fromUrl: string;
}

export class CreateUrlByUserIdRequestDto {
  @ApiProperty({
    description: 'The ID USER',
    example: '1 or 2',
  })
  @IsInt()
  @Type(() => Number)
  userId: number;
}
