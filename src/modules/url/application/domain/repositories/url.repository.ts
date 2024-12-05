import { Url } from '../entities/url.entity';

export interface UrlRepository {
  create(fromUrl: string, shortUrl: string): Promise<Url>;
  findByShortUrl(shortUrl: string): Promise<Url | null>;
  findByUrl(url: string): Promise<Url | null>;
  delete(id: number): Promise<void>;
  update(id: number, shortUrl: string): Promise<Url>;
  updateUser(UrlId: number, userId: number): Promise<Url>;
}
