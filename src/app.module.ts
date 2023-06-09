import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ChannelsModule } from './channels/channels.module';
import { NotificationCategoriesModule } from './notification-categories/notification-categories.module';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';
import { SmsNotificationsModule } from './sms-notifications/sms-notifications.module';
import { EmailNotificationsModule } from './email-notifications/email-notifications.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    NotificationsModule,
    ChannelsModule,
    NotificationCategoriesModule,
    PushNotificationsModule,
    SmsNotificationsModule,
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    EmailNotificationsModule,
  ],
})
export class AppModule {}
