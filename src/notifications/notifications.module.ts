import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationSchema } from './schemas/notifications.schema';

import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    // HttpModule,
    MongooseModule.forFeature([
      {
        name: 'Notification',
        schema: NotificationSchema,
        collection: 'notifications',
      },
    ]),
  ],
  providers: [NotificationsService],
})
export class NotificationsModule {}
