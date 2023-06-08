import { getModelToken } from '@nestjs/mongoose';

import { Test, TestingModule } from '@nestjs/testing';

import { UsersModule } from '../users/users.module';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  function mockModel(dto: any) {
    this.data = dto;
    this.save = () => {
      return this.data;
    };
  }

  let controller: NotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [NotificationsController],
      providers: [
        NotificationsService,
        {
          provide: getModelToken('Notification'),
          useValue: mockModel,
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  xit('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
