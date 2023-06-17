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
import { CreateSmsNotificationDto } from '../sms-notifications/dto/create-sms-notifications.dto';
import { CreateEmailNotificationDto } from '../email-notifications/dto/create-email-notifications.dto';

import { UserChannel } from 'src/users/types/user-channels.type';

import { UsersService } from '../users/users.service';
import { ChannelsService } from '../channels/channels.service';
import { PushNotificationsService } from '../push-notifications/push-notifications.service';
import { SmsNotificationsService } from '../sms-notifications/sms-notifications.service';
import { EmailNotificationsService } from '../email-notifications/email-notifications.service';

import CONSTANTS from './notifications.constants';
import { UserNotification } from 'src/users/types/user-notification.type';
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
    @Inject(forwardRef(() => SmsNotificationsService))
    private readonly smsNotificationsService: SmsNotificationsService,
    @Inject(forwardRef(() => EmailNotificationsService))
    private readonly emailNotificationsService: EmailNotificationsService,
  ) {}

  async createNotificationByCategory(notificationDto: CreateNotificationDto) {
    const { message, subscribed } = notificationDto;

    const subscribedObjectId = new ObjectId(subscribed);
    const users: UserChannel[] = await this.usersService.getUsersBySubscribed(
      subscribedObjectId,
    );

    if (!users || users.length <= 0) {
      throw new NotFoundException(
        'There is any user subscribed to the category selected.',
      );
    }

    for await (const user of users) {
      const { channels } = user;

      for await (const channel of channels) {
        this.sendNotification({
          userId: user,
          channel,
          subscribedId: subscribedObjectId,
          message,
        });
      }
    }
  }

  create(notification: Notification) {
    this.notificationModel.create(notification);
  }

  findAll(): Promise<Notification[]> {
    return this.notificationModel
      .find()
      .populate('user', '-_id name email phoneNumber')
      .populate('channel', '-_id name')
      .populate('subscribed', '-_id name')
      .sort({ sentAt: -1 })
      .exec();
  }

  // This is like an Abstract Factory around creating a notification.
  private async sendNotification(
    userNotification: UserNotification,
  ): Promise<void> {
    const { userId, channel, subscribedId, message } = userNotification;

    const channelFound = await this.channelsService.getById(channel.toString());

    const { name: channelName } = channelFound;

    const channelObjectId = new ObjectId(channel);

    switch (channelName) {
      case CHANNELS.EMAIL: // This is a Factory Method for Email.
        const emailNotificationDto: CreateEmailNotificationDto = {
          userId,
          message,
          channelId: channelObjectId,
          subscribedId,
        };
        this.emailNotificationsService.create(emailNotificationDto);
        break;

      case CHANNELS.SMS: // This is a Factory Method for SMS.
        const smsNotificationsDto: CreateSmsNotificationDto = {
          userId,
          message,
          channelId: channelObjectId,
          subscribedId,
        };
        this.smsNotificationsService.create(smsNotificationsDto);
        break;

      case CHANNELS.PN: // This is a Factory Method for Push Notification.
        const pushNotificationsDto: CreatePushNotificationDto = {
          userId,
          message,
          channelId: channelObjectId,
          subscribedId,
        };
        this.pushNotificationsService.create(pushNotificationsDto);
        break;

      default:
        break;
    }
  }
}
