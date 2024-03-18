import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User, UsersService } from '../../libs/users';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly usersService: UsersService) {
    super({
      nameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersService.verifyUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Credentials not valid!');
    }

    return user;
  }
}
