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
import { CreateUserDTO } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':userName')
  async helloUser(@Param('userName') userName) {
    console.log(userName);
    const user = await this.userService.getUser(userName);
    return {
      ok: true,
      status: 200,
      data: user,
    };
  }
}
