import { Module, forwardRef } from '@nestjs/common';

import { NotificationsModule } from '../notifications/notifications.module';

import { PushNotificationsService } from './push-notifications.service';

@Module({
  imports: [forwardRef(() => NotificationsModule)],
  exports: [PushNotificationsService],
  providers: [PushNotificationsService],
})
export class PushNotificationsModule {}
