import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { DatabaseModule } from './modules/database/database.module';
import databaseConfigDev from './modules/database/database.config.dev';
import ApiRouter, { ApiRouterProvider } from './modules/api/api.router.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [databaseConfigDev],
    }),
    DatabaseModule,
    AuthenticationModule,
    ...ApiRouterProvider,
    RouterModule.register([ApiRouter]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
