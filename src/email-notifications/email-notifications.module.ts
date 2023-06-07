import { Module, forwardRef } from '@nestjs/common';

import { NotificationsModule } from '../notifications/notifications.module';

import { EmailNotificationsService } from './email-notifications.service';

@Module({
  imports: [forwardRef(() => NotificationsModule)],
  exports: [EmailNotificationsService],
  providers: [EmailNotificationsService],
})
export class EmailNotificationsModule {}
