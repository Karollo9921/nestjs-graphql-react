import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserInput: CreateUserInput) {
    return this.usersRepository.create({
      ...createUserInput,
      password: await this.hashPassword(createUserInput.password),
    });
  }

  async findAll() {
    return this.usersRepository.find({});
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      _id: new Types.ObjectId(id),
    });

    if (user) return user;

    throw new NotFoundException('User does not exists');
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const updatedUser = await this.usersRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      {
        $set: {
          ...updateUserInput,
        },
      },
      { new: true },
    );

    if (updatedUser) return updatedUser;

    throw new NotFoundException('User does not exists');
  }

  async remove(id: string): Promise<User> {
    const removedUser = await this.usersRepository.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });

    if (removedUser) return removedUser;

    throw new NotFoundException('User does not exists');
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
