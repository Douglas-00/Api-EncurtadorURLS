import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../domain/repositories/url.repository';
import { AppLogger } from 'src/modules/logger/logger.service';
import { UpdateUrlResponseDto } from '../../infra/dto/update/response.dto';

@Injectable()
export class UpdateUrlUseCase {
  constructor(
    @Inject('UrlPrismaRepository')
    private readonly urlRepository: UrlRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(
    Id: number,
    userId: number,
    fromUrl: string,
  ): Promise<UpdateUrlResponseDto> {
    this.logger.warn('Updating URLs');
    const url = await this.urlRepository.findById(Id, userId);

    if (!url) {
      this.logger.warn('URL not found');
      throw new NotFoundException(
        'URL not found or you are not authorized to update this URL',
      );
    }

    await this.urlRepository.update(Id, fromUrl);

    return {
      message: 'URL updated successfully',
    };
  }
}
