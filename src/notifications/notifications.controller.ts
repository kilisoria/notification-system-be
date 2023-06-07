import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';

import { NotificationsService } from './notifications.service';

import { CreateNotificationDto } from './dto/create-notification.dto';

import { Notification } from './schemas/notifications.schema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @HttpCode(204)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    this.notificationsService.createNotificationByChannel(
      createNotificationDto,
    );
  }
}
