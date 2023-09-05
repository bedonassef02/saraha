import { PartialType } from '@nestjs/mapped-types';
import { SignUpUserDto } from './sign-up-user.dto';

export class SignInUserDto extends PartialType(SignUpUserDto) {}
