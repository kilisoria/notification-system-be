import { Module } from '@nestjs/common';
import { NotificationCategoriesService } from './notification-categories.service';

import { MongooseModule } from '@nestjs/mongoose';

import { NotificationCategorySchema } from './schemas/notification-category.schema';
import { NotificationCategoriesController } from './notification-categories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'NotificationCategory',
        schema: NotificationCategorySchema,
        collection: 'notification-categories',
      },
    ]),
  ],
  providers: [NotificationCategoriesService],
  controllers: [NotificationCategoriesController],
})
export class NotificationCategoriesModule {}
