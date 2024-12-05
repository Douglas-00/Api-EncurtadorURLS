import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prisma.module';
import { LoggerModule } from './modules/logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { UrlModule } from './modules/url/url.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, LoggerModule, AuthModule, UserModule, UrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
