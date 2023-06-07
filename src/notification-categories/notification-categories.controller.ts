import { Controller, Get } from '@nestjs/common';

import { NotificationCategoriesService } from './notification-categories.service';

import { NotificationCategory } from './schemas/notification-category.schema';

@Controller('notification-categories')
export class NotificationCategoriesController {
  constructor(
    private readonly notificationCategoriesService: NotificationCategoriesService,
  ) {}

  @Get('findAll')
  findAll(): Promise<NotificationCategory[]> {
    return this.notificationCategoriesService.findAll();
  }
}
