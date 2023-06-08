import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { NotificationsService } from '../notifications/notifications.service';

import { CreateEmailNotificationDto } from './dto/create-email-notifications.dto';

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
    const { userIds, message, subscribedId, channelId } = emailNotificationDto;

    let notification;
    for await (const userId of userIds) {
      notification = {
        message,
        user: userId,
        channel: channelId,
        subscribed: subscribedId,
        sentAt: Date.now(),
      };

      this.notificationsService.create(notification);
    }
  }
}
