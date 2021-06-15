import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { CreateUserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('create-user')
  async createUser(@Body() body: CreateUserDTO) {
    const user = await this.userService.createUser(body);
    return {
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        profilePhotoUrl: user.profilePhotoUrl,
        createdAt: user.createdAt,
      },
    };
  }

  @Post('sign-in')
  async login(@Body() body: LoginDTO) {
    const { userName, password } = body;
    const valid = await this.authService.validateUser(userName, password);
    if (!valid) {
      throw new UnauthorizedException();
    }

    const token = await this.authService.generateAccessToken(userName);
    return {
      data: {
        token: token.token,
        userName,
      },
    };
  }
}
