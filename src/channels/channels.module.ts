// import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChannelSchema } from './schemas/channel.schema';

import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';

@Module({
  providers: [ChannelsService],
  imports: [
    // HttpModule,
    MongooseModule.forFeature([
      {
        name: 'Channel',
        schema: ChannelSchema,
        collection: 'channels',
      },
    ]),
  ],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
