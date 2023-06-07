import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Notification } from './schemas/notifications.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CreatePushNotificationDto } from '../push-notifications/dto/create-push-notifications.dto';

import { UsersService } from '../users/users.service';
import { ChannelsService } from '../channels/channels.service';
import { PushNotificationsService } from '../push-notifications/push-notifications.service';

import CONSTANTS from './notifications.constants';
const { CHANNELS } = CONSTANTS;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
    private readonly usersService: UsersService,
    private readonly channelsService: ChannelsService,
    @Inject(forwardRef(() => PushNotificationsService))
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  async createNotificationByChannel(notificationDto: CreateNotificationDto) {
    const { message, channel, subscribed } = notificationDto;

    const channelFound = await this.channelsService.getById(channel);

    if (!channelFound) {
      throw new NotFoundException('Invalid Channel.');
    }

    const { name: channelName } = channelFound;

    const channelObjectId = new ObjectId(channel);
    const subscribedObjectId = new ObjectId(subscribed);

    const userIds = await this.usersService.getUsersByChannelAndSubscribed(
      channelObjectId,
      subscribedObjectId,
    );

    if (!userIds || userIds.length <= 0) {
      throw new NotFoundException(
        'There is any user subscribed to the category selected.',
      );
    }

    console.log('eyyy', userIds);

    switch (channelName) {
      case CHANNELS.EMAIL:
        break;

      case CHANNELS.SMS:
        break;

      case CHANNELS.PN:
        const pushNotificationsDto: CreatePushNotificationDto = {
          userIds,
          message,
          channelId: channelObjectId,
          subscribedId: subscribedObjectId,
        };
        this.pushNotificationsService.create(pushNotificationsDto);
        break;

      default:
        break;
    }
  }

  create(notification: Notification) {
    this.notificationModel.create(notification);
  }
}
