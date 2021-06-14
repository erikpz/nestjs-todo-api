import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':userName')
  async getUser(@Param('userName') userName) {
    console.log(userName);
    const user = await this.userService.getUser(userName);
    return {
      ok: true,
      status: 200,
      data: {
        _id: user._id,
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
}
