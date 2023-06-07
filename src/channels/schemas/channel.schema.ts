import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Channel extends Document {
  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  createdAt: number;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
