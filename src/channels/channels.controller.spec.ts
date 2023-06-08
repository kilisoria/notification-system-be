import { getModelToken } from '@nestjs/mongoose';

import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsController } from './channels.controller';

import { ChannelsService } from './channels.service';

describe('ChannelsController', () => {
  let controller: ChannelsController;

  beforeEach(async () => {
    function mockModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelsService,
        {
          provide: getModelToken('Channel'),
          useValue: mockModel,
        },
      ],
      controllers: [ChannelsController],
    }).compile();

    controller = module.get<ChannelsController>(ChannelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
