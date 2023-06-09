import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';
import { ChannelsModule } from '../channels/channels.module';
import { PushNotificationsModule } from '../push-notifications/push-notifications.module';
import { SmsNotificationsModule } from '../sms-notifications/sms-notifications.module';
import { EmailNotificationsModule } from '../email-notifications/email-notifications.module';

import { NotificationSchema } from './schemas/notifications.schema';

import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [
    ChannelsModule,
    UsersModule,
    forwardRef(() => PushNotificationsModule),
    forwardRef(() => SmsNotificationsModule),
    forwardRef(() => EmailNotificationsModule),
    MongooseModule.forFeature([
      {
        name: 'Notification',
        schema: NotificationSchema,
        collection: 'notifications',
      },
    ]),
  ],
  exports: [NotificationsService],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
