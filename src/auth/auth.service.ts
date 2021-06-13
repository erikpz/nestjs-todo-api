import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string) {
    const user = await this.usersService.getUser(userName);
    return await bcrypt.compareSync(password, user.password);
  }

  async generateAccessToken(userName: string) {
    const user = await this.usersService.getUser(userName);
    const payload = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      profilePhotoUrl: user.profilePhotoUrl,
      createdAt: user.createdAt,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
