import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUrlUseCase } from '../../application/useCase/create.useCase';
import { CreateUrlRequestDto } from '../dto/create/request.dto';
import { CreateUrlResponseDto } from '../dto/create/response.dto';
import { URL_RESOURCE } from './route';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { Public } from 'src/modules/common/decorators/public.decorator';

@ApiTags('URLs')
@Controller(URL_RESOURCE)
export class CreateUrlController {
  constructor(private readonly useCase: CreateUrlUseCase) {}

  @Post('shorten/public')
  @ApiOperation({
    summary: 'Encurta uma URL (pública)',
    description:
      'Cria uma URL encurtada para o URL origem, sem necessidade de autenticação.',
  })
  @ApiResponse({ status: 200, description: 'URL shorten created success.' })
  @ApiResponse({ status: 409, description: 'URL already exists.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Public()
  async shortenUrlPublic(
    @Body() createUrlDto: CreateUrlRequestDto,
  ): Promise<CreateUrlResponseDto> {
    return this.useCase.execute(createUrlDto, null);
  }

  @Post('shorten')
  @ApiOperation({
    summary: 'Encurta uma URL (privada)',
    description:
      'Cria uma URL encurtada para o URL origem e associa ao usuário autenticado.',
  })
  @ApiResponse({ status: 200, description: 'URL shorten created success.' })
  @ApiResponse({ status: 409, description: 'URL already exists.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async shortenUrlAuthenticated(
    @Body() createUrlDto: CreateUrlRequestDto,
    @Req() request: any,
  ): Promise<CreateUrlResponseDto> {
    const userId = request.user?.sub;

    return this.useCase.execute(createUrlDto, userId);
  }
}
