import { Controller, Get, Post, Delete, Put, Res, HttpStatus, Body } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UserService } from './user.service';
 

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post('/create-user')
    async createUser(@Res() res, @Body() body: UserDTO){
        const user = await this.userService.createUser(body)
        return res.status(HttpStatus.OK).json({
            ok: true,
            status: 201,
            data: user
        })
    }

}
