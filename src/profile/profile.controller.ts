import { Controller, Body, Patch, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller({ version: '1', path: 'profile' })
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('password')
  async changePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Req() request: any,
  ): Promise<void> {
    const { id } = request.user;
    await this.profileService.changePassword(id, updatePasswordDto);
  }
}
