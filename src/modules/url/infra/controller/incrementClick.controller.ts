import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { URL_RESOURCE } from './route';
import { IncrementClickUseCase } from '../../application/useCase/IncrementClick.useCase';

@ApiTags('URLs')
@Controller(URL_RESOURCE)
export class IncrementClickController {
  constructor(private readonly useCase: IncrementClickUseCase) {}

  @Get(':shortUrl')
  @ApiOperation({
    summary: 'Redirects to the original URL and counts the click.',
    description:
      'When accessing a shortened URL, the system counts the click and redirects the user.',
  })
  @ApiResponse({ status: 302, description: 'Redirects to the original URL.' })
  @ApiResponse({
    status: 404,
    description: 'URL not found or already deleted.',
  })
  @Redirect()
  async redirectToOriginalUrl(
    @Param('shortUrl') shortUrl: string,
  ): Promise<any> {
    const url = await this.useCase.execute(shortUrl);

    return {
      url: url.fromUrl,
    };
  }
}
