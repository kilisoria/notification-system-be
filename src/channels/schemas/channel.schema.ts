import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChannelDocument = HydratedDocument<Channel>;
@Schema()
export class Channel {
  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  createdAt: number;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
