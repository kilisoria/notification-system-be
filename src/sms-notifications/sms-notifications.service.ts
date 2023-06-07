import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { NotificationsService } from 'src/notifications/notifications.service';

import { CreateSmsNotificationDto } from './dto/create-sms-notifications.dto';

@Injectable()
export class SmsNotificationsService {
  constructor(
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(smsNotificationDto: CreateSmsNotificationDto) {
    /*
      // TODO: Pending to implement the logic to send a SMS. We could consider:
      AWS - SMS https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-phone-number-as-subscriber.html
      
      // According this test we're registing this notification as a simple log.
      */
    const { userIds, message, subscribedId, channelId } = smsNotificationDto;

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
