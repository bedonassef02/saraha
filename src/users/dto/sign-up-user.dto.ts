import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { GENDER } from '../constants/constants';
export class SignUpUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  username: string;
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(30)
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(GENDER))
  gender: string;
  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  slug: string;
}
