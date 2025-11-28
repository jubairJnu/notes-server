import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { AppError } from "../common/errors/app-error";

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const isExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (isExist) {
      throw new AppError('User with this email already exists', 400);
    }
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  findOne(email: string) {
    return this.userModel.findOne({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id);
  }
}
