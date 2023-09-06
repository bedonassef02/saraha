import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpUserDto } from '../users/dto/sign-up-user.dto';
import { UserResponse } from '../users/dto/user.response';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../users/types/payload';
import { SignInUserDto } from '../users/dto/sign-in-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto): Promise<UserResponse> {
    const user: UserResponse = await this.usersService.create(signUpUserDto);
    user.token = await this.generateToken(user.user);
    return user;
  }

  async signIn(signInUserDto: SignInUserDto): Promise<UserResponse> {
    const user: UserResponse = await this.usersService.verify(signInUserDto);
    user.token = await this.generateToken(user.user);
    return user;
  }

  private async generateToken(payload: Payload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async decodeToken(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }
}
