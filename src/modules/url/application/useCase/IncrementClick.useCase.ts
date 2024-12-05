import { Injectable, Inject } from '@nestjs/common';
import { UrlRepository } from '../domain/repositories/url.repository';
import { RedisService } from 'src/modules/redis/redis.service';
import { Url } from '../domain/entities/url.entity';

@Injectable()
export class IncrementClickUseCase {
  constructor(
    @Inject('UrlPrismaRepository')
    private readonly urlRepository: UrlRepository,
    private readonly redisService: RedisService,
  ) {}

  async execute(shortUrl: string): Promise<Partial<Url>> {
    await this.redisService.incrementClickCount(shortUrl);

    const count = await this.redisService.getClickCount(shortUrl);

    const url = await this.urlRepository.findByShortUrl(shortUrl);

    if (url) {
      await this.urlRepository.updateClicks(url.id, count);
    }

    return {
      fromUrl: url.fromUrl,
      shortUrl: url.shortUrl,
      clicks: count,
    };
  }
}
