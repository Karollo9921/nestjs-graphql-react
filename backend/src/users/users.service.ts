import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserInput: CreateUserInput) {
    return this.usersRepository.create(createUserInput as unknown as User);
  }

  async findAll() {
    return this.usersRepository.find({});
  }

  async findOne(id: string) {
    return this.usersRepository.findOne({ _id: new Types.ObjectId(id) });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.usersRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateUserInput,
    );
  }

  async remove(id: string): Promise<User> {
    return this.usersRepository.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });
  }
}
