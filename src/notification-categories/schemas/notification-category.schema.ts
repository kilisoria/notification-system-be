import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type NotificationCategoryDocument =
  HydratedDocument<NotificationCategory>;
@Schema()
export class NotificationCategory {
  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  createdAt: number;
}

export const NotificationCategorySchema =
  SchemaFactory.createForClass(NotificationCategory);
