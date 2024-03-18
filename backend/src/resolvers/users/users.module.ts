import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { LibUsersModule } from 'src/libs/users';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from 'src/auth';

@Module({
  imports: [LibUsersModule],
  providers: [UsersResolver, { provide: APP_GUARD, useClass: GqlAuthGuard }],
})
export class UsersModule {}
