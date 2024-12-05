import { URL_RESOURCE } from './route';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ListUrlResponseDto } from '../dto/list/response.dto';
import { ListUrlsUseCase } from '../../application/useCase/list.useCase';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('URLs')
@Controller(URL_RESOURCE)
export class ListUrlController {
  constructor(private readonly listUrlUseCase: ListUrlsUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'List users shortened URLs',
    description:
      'Returns all shortened URLs associated with the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of URLs retrieved successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard)
  async listUrls(@Req() request: any): Promise<ListUrlResponseDto[]> {
    const userId = request.user.sub;

    return await this.listUrlUseCase.execute(userId);
  }
}
