import { Injectable } from '@nestjs/common';

import { NotificationsService } from '../notifications/notifications.service';

import { CreatePushNotificationDto } from './dto/create-push-notifications.dto';

@Injectable()
export class PushNotificationsService {
  constructor(private readonly notificationsService: NotificationsService) {}

  async create(pushNotificationDto: CreatePushNotificationDto) {
    /*
      // TODO: Pending to implement the logic to send the push Notification. We could user here some these alternatives:
      https://onesignal.com/
      https://www.twilio.com/
      
      // According this test we're registing this notification as a log.
      */
    const { userIds, message, subscribedId, channelId } = pushNotificationDto;

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
