import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';
import { UserDTO } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUser(): Promise<User[]> {
    const currUser = await this.userModel.find();
    return currUser;
  }

  async createUser(newUser: UserDTO): Promise<User> {
    /* const userCreated = new this.userModel(newUser)
        return await userCreated.save() */
    const userCreated = await this.userModel.create(newUser);
    return userCreated;
  }

  async deleteUser(userId: string): Promise<User> {
    const userEliminated = await this.userModel.findByIdAndDelete(userId);
    return userEliminated;
  }

  async updateUser(userId: string, newUser: UserDTO): Promise<User> {
    const userUpdated = await this.userModel.findByIdAndUpdate(
      userId,
      newUser,
      { new: true },
    );
    return userUpdated;
  }
}
