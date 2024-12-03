import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prisma.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
