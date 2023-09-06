import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UsersService) {}

  async changePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
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
  }
}
