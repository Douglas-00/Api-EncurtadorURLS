import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../domain/repositories/url.repository';
import { DeleteUrlResponseDto } from '../../infra/dto/delete/response.dto';
import { AppLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class DeleteUrlUseCase {
  constructor(
    @Inject('UrlPrismaRepository')
    private readonly urlRepository: UrlRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(id: number, userId: number): Promise<DeleteUrlResponseDto> {
    const url = await this.urlRepository.findById(id, userId);

    if (!url) {
      this.logger.warn('URL not found');
      throw new NotFoundException(
        'URL not found or you are not authorized to delete this URL',
      );
    }

    await this.urlRepository.delete(id);

    return {
      message: 'URL deleted successfully',
    };
  }
}
