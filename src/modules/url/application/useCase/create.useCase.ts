import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../domain/repositories/url.repository';
import { CreateUrlRequestDto } from '../../infra/dto/create/request.dto';
import { CreateUrlResponseDto } from '../../infra/dto/create/response.dto';
import { UrlMapper } from '../mappers/url.mapper';
import { AppLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class CreateUrlUseCase {
  constructor(
    @Inject('UrlPrismaRepository')
    private readonly urlRepository: UrlRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(
    payload: CreateUrlRequestDto,
    userId?: number,
  ): Promise<CreateUrlResponseDto> {
    const { fromUrl } = payload;

    const shortUrl = UrlMapper.generateShortUrl();

    if (userId) {
      const userExists = await this.urlRepository.findUserById(userId);
      if (!userExists) {
        this.logger.warn('User not found');
        throw new NotFoundException('User not found');
      }
    }

    const newUrl = await this.urlRepository.create(fromUrl, shortUrl);

    if (userId) {
      this.logger.warn('Updating user with URL');
      await this.urlRepository.updateUser(newUrl.id, userId);
    }

    return {
      shortUrl: newUrl.shortUrl,
    };
  }
}
