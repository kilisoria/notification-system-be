import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { NotificationsService } from '../notifications/notifications.service';

import { CreatePushNotificationDto } from './dto/create-push-notifications.dto';

import { Notification } from '../notifications/schemas/notifications.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class PushNotificationsService {
  constructor(
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(pushNotificationDto: CreatePushNotificationDto) {
    /*
      // TODO: Pending to implement the logic to send the push Notification. We could consider:
      https://onesignal.com/
      https://www.twilio.com/
      
      // According this test we're registing this notification as a log.
      */
    const { userId, message, subscribedId, channelId } = pushNotificationDto;

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
