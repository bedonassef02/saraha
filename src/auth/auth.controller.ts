import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpUserDto } from '../users/dto/sign-up-user.dto';
import { UserResponse } from '../users/dto/user.response';
import { CookieTokenInterceptor } from './interceptors/cookie-token.interceptor';
import { SignInUserDto } from '../users/dto/sign-in-user.dto';
import { SignInInterceptor } from './interceptors/sign-in.interceptor';
import { SignUpInterceptor } from './interceptors/sign-up.interceptor';
import { IsEmailExistPipe } from '../common/pipes/is-email-exist.pipe';
import { IsSlugExistPipe } from '../common/pipes/is-slug-exist.pipe';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(CookieTokenInterceptor, SignUpInterceptor)
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() signUpUserDto: SignUpUserDto,
    @Body('email', IsEmailExistPipe) email: string,
    @Body('slug', IsSlugExistPipe) slug: string,
  ): Promise<UserResponse> {
    return await this.authService.signUp(signUpUserDto);
  }

  @Post('signin')
  @UseInterceptors(CookieTokenInterceptor, SignInInterceptor)
  @HttpCode(HttpStatus.OK)
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
