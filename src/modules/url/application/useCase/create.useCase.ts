import { Injectable, ConflictException, Inject } from '@nestjs/common';
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

    const existingUrl = await this.urlRepository.findByUrl(fromUrl);

    if (existingUrl) {
      throw new ConflictException('URL already exists');
    }

    const shortUrl = UrlMapper.generateShortUrl();

    const newUrl = await this.urlRepository.create(fromUrl, shortUrl);

    if (userId) {
      await this.urlRepository.updateUser(newUrl.id, userId);
    }

    return {
      shortUrl: newUrl.shortUrl,
    };
  }
}
