import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpUserDto } from '../users/dto/sign-up-user.dto';
import { UserResponse } from '../users/dto/user.response';
import { CookieTokenInterceptor } from './interceptors/cookie-token.interceptor';
import { SignInUserDto } from '../users/dto/sign-in-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(CookieTokenInterceptor)
  async signUp(@Body() signUpUserDto: SignUpUserDto): Promise<UserResponse> {
    return await this.authService.signUp(signUpUserDto);
  }

  @Post('signin')
  @UseInterceptors(CookieTokenInterceptor)
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<UserResponse> {
    return await this.authService.signIn(signInUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }
}
