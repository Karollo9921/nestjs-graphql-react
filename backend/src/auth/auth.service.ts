import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ITokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../libs/users';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        Number(this.configService.getOrThrow('JWT_EXPIRATION')),
    );

    const toketPayload: ITokenPayload = {
      _id: `${user._id}`,
      email: user.email,
    };

    const token = this.jwtService.sign(toketPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
