import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';

import { NotificationsService } from './notifications.service';

import { CreateNotificationDto } from './dto/create-notification.dto';

import { Notification } from './schemas/notifications.schema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      await this.notificationsService.createNotificationByCategory(
        createNotificationDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get('findAll')
  findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }
}
