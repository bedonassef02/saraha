import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(1028)
  message: string;
  @IsOptional()
  @IsBoolean()
  showUser = false;
  @IsNotEmpty()
  @IsMongoId()
  toUser: string;
  @IsOptional()
  @IsMongoId()
  fromUser: string;
  @IsOptional()
  @IsString()
  image: string;
}
