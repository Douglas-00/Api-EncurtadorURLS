import { Module } from '@nestjs/common';
import { CreateUrlUseCase } from './application/useCase/create.useCase';
import { CreateUrlController } from './infra/controller/create.controller';
import { UrlPrismaRepository } from './infra/repositories/prisma-url.repository';
import { ListUrlsUseCase } from './application/useCase/list.useCase';
import { DeleteUrlUseCase } from './application/useCase/delete.useCase';
import { UpdateUrlUseCase } from './application/useCase/update.useCase';
import { UpdateUrlController } from './infra/controller/update.controller';
import { DeleteUrlController } from './infra/controller/delete.controller';
import { ListUrlController } from './infra/controller/list.controller';

@Module({
  providers: [
    {
      provide: 'UrlPrismaRepository',
      useClass: UrlPrismaRepository,
    },
    CreateUrlUseCase,
    DeleteUrlUseCase,
    UpdateUrlUseCase,
    ListUrlsUseCase,
  ],
  controllers: [
    CreateUrlController,
    UpdateUrlController,
    DeleteUrlController,
    ListUrlController,
  ],
  exports: [],
})
export class UrlModule {}
