import { Injectable } from '@nestjs/common';
import { Url } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { UrlRepository } from '../../application/domain/repositories/url.repository';

@Injectable()
export class UrlPrismaRepository implements UrlRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUrl(fromUrl: string): Promise<Url | null> {
    return this.prisma.url.findFirst({
      where: {
        fromUrl,
      },
    });
  }

  async findByShortUrl(shortUrl: string): Promise<Url | null> {
    return this.prisma.url.findUnique({
      where: {
        shortUrl,
      },
    });
  }

  async create(payload: {
    fromUrl: string;
    shortUrl: string;
    userId?: number | null;
  }): Promise<Url> {
    return this.prisma.url.create({
      data: {
        fromUrl: payload.fromUrl,
        shortUrl: payload.shortUrl,
        userId: payload.userId || null,
      },
    });
  }

  async findAllByUserId(userId: number): Promise<Url[]> {
    return this.prisma.url.findMany({
      where: {
        userId,
        deletedAt: null,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.url.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async update(id: number, shortUrl: string): Promise<Url> {
    return await this.prisma.url.update({
      where: { id },
      data: { shortUrl },
    });
  }
}
