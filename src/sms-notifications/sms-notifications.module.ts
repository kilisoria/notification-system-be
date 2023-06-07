import { Module, forwardRef } from '@nestjs/common';

import { SmsNotificationsService } from './sms-notifications.service';

import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [forwardRef(() => NotificationsModule)],
  exports: [SmsNotificationsService],
  providers: [SmsNotificationsService],
})
export class SmsNotificationsModule {}
