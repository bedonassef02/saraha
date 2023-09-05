import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ unique: true, required: true })
  password: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ unique: true, required: true })
  slug: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
