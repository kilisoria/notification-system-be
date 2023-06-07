import { Module } from '@nestjs/common';
import { NotificationCategoriesService } from './notification-categories.service';

import { MongooseModule } from '@nestjs/mongoose';

import { NotificationCategorySchema } from './schemas/notification-category.schema';

@Module({
  imports: [
    // HttpModule,
    MongooseModule.forFeature([
      {
        name: 'NotificationCategory',
        schema: NotificationCategorySchema,
        collection: 'notification-categories',
      },
    ]),
  ],
  providers: [NotificationCategoriesService],
})
export class NotificationCategoriesModule {}
