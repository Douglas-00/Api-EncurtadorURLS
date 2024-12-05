import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../domain/repositories/url.repository';
import { RedisService } from 'src/modules/redis/redis.service';
import { Url } from '../domain/entities/url.entity';
import { AppLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class IncrementClickUseCase {
  constructor(
    @Inject('UrlPrismaRepository')
    private readonly urlRepository: UrlRepository,
    private readonly redisService: RedisService,
    private readonly logger: AppLogger,
  ) {}

  async execute(shortUrl: string): Promise<Partial<Url>> {
    const verifyUrl = await this.urlRepository.findByShortUrl(shortUrl);

    if (!verifyUrl) {
      this.logger.warn('URL not found');
      throw new NotFoundException('URL not found');
    }

    await this.redisService.incrementClickCount(shortUrl);

    const count = await this.redisService.getClickCount(shortUrl);

    const url = await this.urlRepository.findByShortUrl(shortUrl);

    if (url) {
      this.logger.warn('Updating URL clicks');
      await this.urlRepository.updateClicks(url.id, count);
    }

    return {
      fromUrl: url.fromUrl,
      shortUrl: url.shortUrl,
      clicks: count,
    };
  }
}
