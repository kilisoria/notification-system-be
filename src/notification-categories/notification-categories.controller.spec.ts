import { getModelToken } from '@nestjs/mongoose';

import { Test, TestingModule } from '@nestjs/testing';
import { NotificationCategoriesService } from './notification-categories.service';
import { NotificationCategoriesController } from './notification-categories.controller';

describe('NotificationCategoriesController', () => {
  let controller: NotificationCategoriesController;

  beforeEach(async () => {
    function mockModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationCategoriesService,
        {
          provide: getModelToken('NotificationCategory'),
          useValue: mockModel,
        },
      ],
      controllers: [NotificationCategoriesController],
    }).compile();

    controller = module.get<NotificationCategoriesController>(
      NotificationCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
