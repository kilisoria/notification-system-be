import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { Notification } from '../notifications/schemas/notifications.schema';

import { NotificationsService } from '../notifications/notifications.service';

import { CreateEmailNotificationDto } from './dto/create-email-notifications.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class EmailNotificationsService {
  constructor(
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(emailNotificationDto: CreateEmailNotificationDto) {
    /*
      // TODO: Pending to implement the logic to send an email. We could consider:
      https://aws.amazon.com/ses/
      https://mailchimp.com/
      
      // According this test we're registing this notification as a simple log.
      */
    const { userId, message, subscribedId, channelId } = emailNotificationDto;

    const notification: Notification = {
      message,
      user: new ObjectId(userId),
      channel: new ObjectId(channelId),
      subscribed: new ObjectId(subscribedId),
      sentAt: Date.now(),
    };

    this.notificationsService.create(notification);
  }
}
