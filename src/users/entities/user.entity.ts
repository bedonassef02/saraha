import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Expose } from 'class-transformer';
import slugify from 'slugify';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true, required: true })
  password: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ unique: true, required: true })
  slug: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  // Hash the password before saving if it's modified
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.slug = slugify(this.slug, { lower: true, remove: /[*+~.()'"!:@]/g });
  next();
});
