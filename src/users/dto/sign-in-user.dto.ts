import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
export class SignInUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(30)
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
}
