import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { HydratedDocument } from 'mongoose';
import { NextFunction } from 'express';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  message: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  toUser: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  fromUser: User;
  @Prop()
  image: string;
  @Prop({ required: false })
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.post('findOne', async function (result, next) {
  if (result && !result.readAt) {
    result.readAt = new Date();
    await result.save();
  }
  next();
});
