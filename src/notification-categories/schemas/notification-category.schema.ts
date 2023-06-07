import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NotificationCategory extends Document {
  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  createdAt: number;
}

export const NotificationCategorySchema =
  SchemaFactory.createForClass(NotificationCategory);
