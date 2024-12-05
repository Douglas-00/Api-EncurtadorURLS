import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class ShortUrlDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^([a-zA-Z0-9_-]{6})$/, {
    message: 'shortUrl must be exactly 6 characters long',
  })
  shortUrl: string;
}
