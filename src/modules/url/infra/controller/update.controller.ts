import {
  Controller,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { URL_RESOURCE } from './route';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { UpdateUrlUseCase } from '../../application/useCase/update.useCase';
import {
  UpdateUrlIdRequestDto,
  UpdateUrlRequestDto,
} from '../dto/update/request.dto';
import { UpdateUrlResponseDto } from '../dto/update/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('URLs')
@Controller(URL_RESOURCE)
export class UpdateUrlController {
  constructor(private readonly updateUrlUseCase: UpdateUrlUseCase) {}

  @Put(':id')
  @ApiOperation({
    summary: 'Updates the target of a shortened URL',
    description:
      'Allows the user to change the destination address of a shortened URL.',
  })
  @ApiResponse({ status: 200, description: 'URL updated successfully.' })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async updateUrl(
    @Param() { id }: UpdateUrlIdRequestDto,
    @Body() updateUrlDto: UpdateUrlRequestDto,
    @Req() request: any,
  ): Promise<UpdateUrlResponseDto> {
    const userId = request.user.sub;

    await this.updateUrlUseCase.execute(id, userId, updateUrlDto.fromUrl);

    return {
      message: 'URL updated successfully',
    };
  }
}
