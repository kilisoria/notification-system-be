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

import { UsersService } from '../users/users.service';
import { ChannelsService } from '../channels/channels.service';
import { PushNotificationsService } from '../push-notifications/push-notifications.service';
import { SmsNotificationsService } from '../sms-notifications/sms-notifications.service';

import CONSTANTS from './notifications.constants';
import { EmailNotificationsService } from 'src/email-notifications/email-notifications.service';
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

    //NOTE: I've created a module for each channel as Email, Sms, and PN considering these will have their particular implementation and logic. Also, Implementing separations of concern.
    switch (channelName) {
      case CHANNELS.EMAIL:
        const emailNotificationDto: CreateEmailNotificationDto = {
          userIds,
          message,
          channelId: channelObjectId,
          subscribedId: subscribedObjectId,
        };
        this.emailNotificationsService.create(emailNotificationDto);
        break;

      case CHANNELS.SMS:
        const smsNotificationsDto: CreateSmsNotificationDto = {
          userIds,
          message,
          channelId: channelObjectId,
          subscribedId: subscribedObjectId,
        };
        this.smsNotificationsService.create(smsNotificationsDto);
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

  findAll(): Promise<Notification[]> {
    return this.notificationModel
      .find()
      .populate('user', '-_id name email phoneNumber')
      .populate('channel', '-_id name')
      .populate('subscribed', '-_id name')
      .sort({ sentAt: -1 })
      .exec();
  }
}
