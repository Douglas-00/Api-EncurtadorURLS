export class Url {
  id?: number;
  fromUrl: string;
  shortUrl: string;
  userId?: number;
  clicks?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  constructor(
    id: number,
    url: string,
    shortUrl: string,
    userId: number,
    clicks: number,
  ) {
    this.id = id;
    this.fromUrl = url;
    this.shortUrl = shortUrl;
    this.userId = userId;
    this.clicks = clicks;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
