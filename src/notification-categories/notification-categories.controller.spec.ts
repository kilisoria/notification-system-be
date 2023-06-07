import { Test, TestingModule } from '@nestjs/testing';
import { NotificationCategoriesController } from './notification-categories.controller';

describe('NotificationCategoriesController', () => {
  let controller: NotificationCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationCategoriesController],
    }).compile();

    controller = module.get<NotificationCategoriesController>(NotificationCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
