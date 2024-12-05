import { Injectable, Inject } from '@nestjs/common';
import { UrlRepository } from '../domain/repositories/url.repository';
import { UrlMapper } from '../mappers/url.mapper';
import { Url } from '@prisma/client';
import { ListUrlResponseDto } from '../../infra/dto/list/response.dto';

@Injectable()
export class ListUrlsUseCase {
  constructor(
    @Inject('UrlPrismaRepository')
    private readonly urlRepository: UrlRepository,
  ) {}

  async execute(userId: number): Promise<ListUrlResponseDto[]> {
    const urls = await this.urlRepository.findAllByUserId(userId);

    return UrlMapper.toListResponseDto(urls as Url[]);
  }
}
