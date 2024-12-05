import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../domain/repositories/url.repository';
import { UpdateUrlResponseDto } from '../../infra/dto/update/response.dto';

@Injectable()
export class UpdateUrlUseCase {
  constructor(
    @Inject('UrlPrismaRepository')
    private readonly urlRepository: UrlRepository,
  ) {}

  async execute(
    id: number,
    userId: number,
    fromUrl: string,
  ): Promise<UpdateUrlResponseDto> {
    const url = await this.urlRepository.findById(id, userId);

    if (!url) {
      throw new NotFoundException(
        'URL not found or you are not authorized to update this URL',
      );
    }

    await this.urlRepository.update(id, fromUrl);

    return {
      message: 'URL updated successfully',
    };
  }
}
