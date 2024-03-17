import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { LibUsersModule } from 'src/libs/users';

@Module({
  imports: [LibUsersModule],
  providers: [UsersResolver],
})
export class UsersModule {}
