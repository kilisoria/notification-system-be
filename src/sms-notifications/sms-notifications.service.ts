import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { NotificationsService } from '../notifications/notifications.service';

import { CreateSmsNotificationDto } from './dto/create-sms-notifications.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
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
    const { userId, message, subscribedId, channelId } = smsNotificationDto;

    const notification = {
      message,
      user: new ObjectId(userId),
      channel: new ObjectId(channelId),
      subscribed: new ObjectId(subscribedId),
      sentAt: Date.now(),
    };

    this.notificationsService.create(notification);
  }
}
