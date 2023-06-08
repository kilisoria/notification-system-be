import { getModelToken } from '@nestjs/mongoose';

import { Test, TestingModule } from '@nestjs/testing';
import { NotificationCategoriesService } from './notification-categories.service';

describe('NotificationCategoriesService', () => {
  let service: NotificationCategoriesService;

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
    }).compile();

    service = module.get<NotificationCategoriesService>(
      NotificationCategoriesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
