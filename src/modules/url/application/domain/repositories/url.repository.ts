import { Url } from '../entities/url.entity';

export interface UrlRepository {
  create(fromUrl: string, shortUrl: string): Promise<Url>;
  delete(id: number): Promise<void>;
  update(id: number, fromUrl: string): Promise<Url>;
  updateUser(UrlId: number, userId: number): Promise<Url>;
  findAllByUserId(userId: number): Promise<Partial<Url>[]>;
  findById(id: number, userId: number): Promise<Partial<Url>>;
  findUserById(userId: number): Promise<boolean>;
}
