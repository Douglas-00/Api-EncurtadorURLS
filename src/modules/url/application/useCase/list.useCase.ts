import { Injectable, Inject } from '@nestjs/common';
import { UrlRepository } from '../domain/repositories/url.repository';
import { UrlMapper } from '../mappers/url.mapper';
import { Url } from '@prisma/client';
import { ListUrlResponseDto } from '../../infra/dto/list/response.dto';
import { AppLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class ListUrlsUseCase {
  constructor(
    @Inject('UrlPrismaRepository')
    private readonly urlRepository: UrlRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(userId: number): Promise<ListUrlResponseDto[]> {
    this.logger.warn('Listing URLs');
    const urls = await this.urlRepository.findAllByUserId(userId);

    return UrlMapper.toListResponseDto(urls as Url[]);
  }
}
