import {
  Controller,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUrlUseCase } from '../../application/useCase/create.useCase';
import { CreateUrlRequestDto } from '../dto/create/request.dto';
import { CreateUrlResponseDto } from '../dto/create/response.dto';
import { URL_RESOURCE } from './route';

@ApiTags('URLs')
@Controller(URL_RESOURCE)
export class CreateUrlController {
  constructor(private readonly useCase: CreateUrlUseCase) {}

  @Post('shorten')
  @ApiOperation({
    summary: 'Encurta uma URL',
    description: 'Cria uma URL encurtada para o URL origem.',
  })
  @ApiResponse({ status: 200, description: 'URL shorten created success.' })
  @ApiResponse({ status: 409, description: 'URL already exists.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  //   @UseGuards(JwtAuthGuard) // Garantir que o usuário esteja autenticado
  async shortenUrl(
    @Body() createUrlDto: CreateUrlRequestDto,
    // @Param() { userId }: CreateUrlByUserIdRequestDto,
  ): Promise<CreateUrlResponseDto> {
    const userId = null;
    return this.useCase.execute(createUrlDto, userId);
  }
}
