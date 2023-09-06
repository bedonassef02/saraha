import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class IsEmailExistPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}
  async transform(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new ConflictException(`this email is already in use`);
    }
    return email;
  }
}
