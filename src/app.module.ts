import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prisma.module';
import { LoggerModule } from './modules/logger/logger.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PrismaModule, LoggerModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
