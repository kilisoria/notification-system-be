import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Channel } from 'src/channels/schemas/channel.schema';

import { NotificationCategory } from 'src/notification-categories/schemas/notification-category.schema';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  status: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Channel' })
  channels: [Channel];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'NotificationCategory' })
  subscribed: [NotificationCategory];

  @Prop()
  createdAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
