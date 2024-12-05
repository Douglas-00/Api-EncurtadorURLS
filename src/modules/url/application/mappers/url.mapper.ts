import * as crypto from 'crypto';

export class UrlMapper {
  private static readonly URL_LENGTH = 6;

  static generateShortUrl() {
    const randomBytes = crypto.randomBytes(4);
    const shortUrl = UrlMapper.toBase64Url(randomBytes);

    shortUrl.slice(0, UrlMapper.URL_LENGTH);

    return shortUrl;
  }

  private static toBase64Url(buffer: Buffer): string {
    return buffer
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
