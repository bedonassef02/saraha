import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class IsSlugExistPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}
  async transform(slug: string) {
    const user = await this.usersService.findUserBySlug(slug);
    if (user) {
      throw new ConflictException(`this slug is already in use`);
    }
    return slug;
  }
}
