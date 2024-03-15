import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from 'src/common/database';
import { User, UserSchema } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
})
export class UsersModule {}
