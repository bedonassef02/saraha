import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from '../users/users.service';
import { PlainIntoProfileResponse } from '../common/helpers/plain-into-profile.response';
import { ProfileResponse } from './types/profile.response';

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UsersService) {}

  async profile(id: string): Promise<ProfileResponse> {
    const user = await this.usersService.findOne(id);
    return PlainIntoProfileResponse(user);
  }

  async changePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<any> {
    if (updatePasswordDto.newPassword !== updatePasswordDto.confirmPassword) {
      throw new BadRequestException(
        `new password and confirm password do not match`,
      );
    } else if (
      updatePasswordDto.newPassword === updatePasswordDto.currentPassword
    ) {
      throw new BadRequestException(
        `can't change password to current password`,
      );
    }
    await this.usersService.changePassword(id, updatePasswordDto);
    return this.response('password changed successfully');
  }

  async changeProfileImage(id: string, image: string): Promise<any> {
    if (!image) throw new BadRequestException('image is required');
    await this.usersService.changeProfileImage(id, image);
    return this.response('profile image changed successfully');
  }

  async changeUsername(id: string, username: string): Promise<any> {
    if (!username) throw new BadRequestException('username is required');
    await this.usersService.changeUsername(id, username);
    return this.response('username changed successfully');
  }

  private response(message: string): any {
    return { message };
  }
}
