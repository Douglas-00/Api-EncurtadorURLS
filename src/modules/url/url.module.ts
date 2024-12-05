import { Module } from '@nestjs/common';
import { CreateUrlUseCase } from './application/useCase/create.useCase';
import { CreateUrlController } from './infra/controller/create.controller';
import { UrlPrismaRepository } from './infra/repositories/prisma-url.repository';

@Module({
  controllers: [CreateUrlController],
  providers: [
    {
      provide: 'UrlPrismaRepository',
      useClass: UrlPrismaRepository,
    },
    CreateUrlUseCase,
  ],
  exports: [],
})
export class UrlModule {}
