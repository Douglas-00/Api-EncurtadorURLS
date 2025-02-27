import { Injectable } from '@nestjs/common';
import { Url } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { UrlRepository } from '../../application/domain/repositories/url.repository';

@Injectable()
export class UrlPrismaRepository implements UrlRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(fromUrl: string, shortUrl: string): Promise<Url> {
    return this.prisma.url.create({
      data: {
        fromUrl,
        shortUrl,
      },
    });
  }

  async findAllByUserId(userId: number): Promise<Partial<Url>[]> {
    return this.prisma.url.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.url.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }

  async update(id: number, fromUrl: string): Promise<Url> {
    return await this.prisma.url.update({
      where: { id, deletedAt: null },
      data: { fromUrl },
    });
  }

  async updateUser(UrlId: number, userId: number): Promise<Url> {
    return this.prisma.url.update({
      where: { id: UrlId },
      data: {
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findById(id: number, userId: number): Promise<Url | null> {
    return this.prisma.url.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });
  }

  async findUserById(userId: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return !!user;
  }

  async findByShortUrl(shortUrl: string): Promise<Partial<Url> | null> {
    return this.prisma.url.findUnique({
      where: {
        shortUrl,
        deletedAt: null,
      },
    });
  }

  async updateClicks(id: number, totalClick: number): Promise<Url> {
    return this.prisma.url.update({
      where: { id },
      data: { clicks: totalClick },
    });
  }
}
