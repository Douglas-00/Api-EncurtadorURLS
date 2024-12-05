import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../domain/repositories/url.repository';
import { DeleteUrlResponseDto } from '../../infra/dto/delete/response.dto';

@Injectable()
export class DeleteUrlUseCase {
  constructor(
    @Inject('UrlPrismaRepository')
    private readonly urlRepository: UrlRepository,
  ) {}

  async execute(id: number, userId: number): Promise<DeleteUrlResponseDto> {
    const url = await this.urlRepository.findById(id, userId);

    if (!url) {
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
