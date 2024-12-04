import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlResponseDto {
  @ApiProperty({
    description: 'The shortened URL',
    example: 'http://localhost/aZbKq7',
  })
  shortUrl: string;
}
