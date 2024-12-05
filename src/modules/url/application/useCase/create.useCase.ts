import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../domain/repositories/url.repository';
import { CreateUrlRequestDto } from '../../infra/dto/create/request.dto';
import { CreateUrlResponseDto } from '../../infra/dto/create/response.dto';
import { UrlMapper } from '../mappers/url.mapper';

@Injectable()
export class CreateUrlUseCase {
  constructor(
    @Inject('UrlPrismaRepository')
    private readonly urlRepository: UrlRepository,
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
        throw new NotFoundException('User not found');
      }
    }

    const newUrl = await this.urlRepository.create(fromUrl, shortUrl);

    if (userId) {
      await this.urlRepository.updateUser(newUrl.id, userId);
    }

    return {
      shortUrl: newUrl.shortUrl,
    };
  }
}
