import { Controller, Get } from '@nestjs/common';

import { ChannelsService } from './channels.service';

import { Channel } from './schemas/channel.schema';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get('findAll')
  findAll(): Promise<Channel[]> {
    return this.channelsService.findAll();
  }
}
