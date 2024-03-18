import { Controller, Res } from '@nestjs/common';
import { CurrentUser } from './decorators';
import { User } from '../libs/users';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
  }

  // async logout() {}

  // async signup() {}
}
