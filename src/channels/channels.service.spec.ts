import { getModelToken } from '@nestjs/mongoose';

import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsService } from './channels.service';

describe('ChannelsService', () => {
  function mockModel(dto: any) {
    this.data = dto;
    this.save = () => {
      return this.data;
    };
  }

  let service: ChannelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelsService,
        {
          provide: getModelToken('Channel'),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
