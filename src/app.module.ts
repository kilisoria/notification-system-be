import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ChannelsModule } from './channels/channels.module';
import { NotificationCategoriesModule } from './notification-categories/notification-categories.module';
import { PushNotificationsService } from './push-notifications/push-notifications.service';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    NotificationsModule,
    ChannelsModule,
    NotificationCategoriesModule,
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    PushNotificationsModule,
  ],
  providers: [PushNotificationsService],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
