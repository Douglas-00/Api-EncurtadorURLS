import * as crypto from 'crypto';
import { Url } from '../domain/entities/url.entity';

export class UrlMapper {
  private static readonly URL_LENGTH = 6;

  static generateShortUrl() {
    const randomBytes = crypto.randomBytes(4);
    const shortUrl = UrlMapper.toBase64Url(randomBytes);

    shortUrl.slice(0, UrlMapper.URL_LENGTH);

    return shortUrl;
  }

  static toListResponseDto(urls: Url[]) {
    const baseUrl = process.env.BASE_URL || 'http://localhost';

    return urls.map((url) => ({
      id: url.id,
      fromUrl: url.fromUrl,
      shortUrl: `${baseUrl}/${url.shortUrl}`,
      clicks: url.clicks,
    }));
  }

  private static toBase64Url(buffer: Buffer): string {
    return buffer
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
