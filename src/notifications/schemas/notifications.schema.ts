import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { User } from '../../users/schemas/user.schema';
import { Channel } from '../../channels/schemas/channel.schema';
import { NotificationCategory } from '../../notification-categories/schemas/notification-category.schema';
@Schema()
export class Notification extends Document {
  @Prop()
  message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' })
  channel: Channel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'NotificationCategory' })
  subscribed: NotificationCategory;

  @Prop()
  sentAt: number;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
