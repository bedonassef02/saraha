import {
  Controller,
  Body,
  Patch,
  Req,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageInterceptor } from '../common/interceptors/upload-image.interceptor';
import { ProfileResponse } from './types/profile.response';

@Controller({ version: '1', path: 'profile' })
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async profile(@Req() request: any): Promise<ProfileResponse> {
    const { id } = request.user;
    return this.profileService.profile(id);
  }

  @Patch('password')
  async changePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Req() request: any,
  ): Promise<any> {
    const { id } = request.user;
    return await this.profileService.changePassword(id, updatePasswordDto);
  }

  @Patch('username')
  async changeUsername(
    @Body('username') username: string,
    @Req() request: any,
  ): Promise<any> {
    const { id } = request.user;
    return await this.profileService.changeUsername(id, username);
  }

  @Patch('image')
  @UseInterceptors(FileInterceptor('file'), UploadImageInterceptor)
  async changeProfileImage(
    @Body('image') image: string,
    @Req() request: any,
  ): Promise<any> {
    const { id } = request.user;
    return await this.profileService.changeProfileImage(id, image);
  }
}
