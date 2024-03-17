import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database';
import { User, UserSchema } from './entities';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class LibUsersModule {}
