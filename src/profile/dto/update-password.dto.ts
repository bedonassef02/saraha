import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  currentPassword;
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  newPassword;
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  confirmPassword;
}
