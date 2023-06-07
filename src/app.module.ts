import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsModule } from './notifications/notifications.module';
import { ChannelsModule } from './channels/channels.module';
import { NotificationCategoriesModule } from './notification-categories/notification-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    NotificationsModule,
    ChannelsModule,
    NotificationCategoriesModule,
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
  ],
  controllers: [AppController, NotificationsController],
  providers: [AppService],
})
export class AppModule {}
