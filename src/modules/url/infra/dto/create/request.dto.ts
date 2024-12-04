import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlRequestDto {
  @ApiProperty({
    description: 'The original URL to shorten',
    example: 'https://example.com/some-long-url',
  })
  @IsString()
  @IsNotEmpty()
  fromUrl: string;
}
