import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';
import mongoose, { HydratedDocument } from 'mongoose';
import { NextFunction } from 'express';
import { MessageSchema } from '../../messages/entities/message.entity';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification {
  @Prop()
  message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
  @Prop({ default: null })
  readAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

MessageSchema.post('findOne', async function (result, next: NextFunction) {
  if (result && !result.readAt) {
    result.readAt = new Date();
    await result.save();
  }
  next();
});

NotificationSchema.post('find', async function (result, next: NextFunction) {
  if (result && Array.isArray(result)) {
    // If the result is an array of notifications, filter and update
    const notificationsToUpdate = result.filter(
      (notification) => notification && !notification.readAt,
    );
    await Promise.all(
      notificationsToUpdate.map(async (notification) => {
        notification.readAt = new Date();
        await notification.save();
      }),
    );
  }
  next();
});
