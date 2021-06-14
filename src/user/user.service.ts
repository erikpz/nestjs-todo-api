import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDTO } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    const currUser = await this.userModel.find();
    return currUser;
  }
  
  async getUser(userName: string): Promise<User> {
    const currUser = await this.userModel.findOne({ userName });
    return currUser;
  }

  async createUser(newUser: CreateUserDTO): Promise<User> {
    /* const userCreated = new this.userModel(newUser)
        return await userCreated.save() */
    const salt = await bcrypt.genSalt();
    const cryptPassword = await bcrypt.hash(newUser.password, salt);
    const userCreated = await this.userModel.create({
      ...newUser,
      password: cryptPassword,
    });
    return userCreated;
  }

  async deleteUser(userId: string): Promise<User> {
    const userEliminated = await this.userModel.findByIdAndDelete(userId);
    return userEliminated;
  }

  async updateUser(userId: string, newUser: CreateUserDTO): Promise<User> {
    const userUpdated = await this.userModel.findByIdAndUpdate(
      userId,
      newUser,
      { new: true },
    );
    return userUpdated;
  }
}
