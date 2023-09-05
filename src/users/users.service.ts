import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserResponse } from './dto/user.response';
import { plainIntoUserResponse } from '../common/helpers/plain-into-user.response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(signUpUserDto: SignUpUserDto): Promise<UserResponse> {
    const user = await this.userModel.create(signUpUserDto);
    return plainIntoUserResponse(user);
  }

  async verify(signInUserDto: SignInUserDto): Promise<UserResponse> {
    const user: User = await this.userModel.findOne({
      email: signInUserDto.email,
    });
    const isSamePassword: boolean = user
      ? await this.comparePassword(signInUserDto.password, user.password)
      : false;
    if (!isSamePassword) {
      throw new BadRequestException(`email or password mismatch our records`);
    }
    return plainIntoUserResponse(user);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findUserBySlug(slug: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ slug });
    console.log(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  update(id: number, updateUserDto: SignInUserDto) {
    return `This action updates a #${id} user`;
  }

  private async comparePassword(
    candidatePassword: string,
    hashedPassword,
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
