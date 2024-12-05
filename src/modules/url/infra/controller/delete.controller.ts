import {
  Controller,
  Delete,
  Param,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { DeleteUrlUseCase } from '../../application/useCase/delete.useCase';
import { URL_RESOURCE } from './route';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUrlRequestDto } from '../dto/delete/request.dto';
import { DeleteUrlResponseDto } from '../dto/delete/response.dto';

@ApiTags('URLs')
@Controller(URL_RESOURCE)
export class DeleteUrlController {
  constructor(private readonly deleteUrlUseCase: DeleteUrlUseCase) {}

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a shortened URL',
    description:
      'Allows the user to delete a shortened URL associated with their account. Deletion is logical (soft delete)',
  })
  @ApiResponse({ status: 200, description: 'URL deleted successfully.' })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async deleteUrl(
    @Param() { id }: DeleteUrlRequestDto,
    @Req() request: any,
  ): Promise<DeleteUrlResponseDto> {
    const userId = request.user.sub;

    return await this.deleteUrlUseCase.execute(id, userId);
  }
}
