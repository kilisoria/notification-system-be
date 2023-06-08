import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { NotificationCategory } from './schemas/notification-category.schema';
@Injectable()
export class NotificationCategoriesService {
  constructor(
    @InjectModel(NotificationCategory.name)
    private readonly notificationCategoryModel: Model<NotificationCategory>,
  ) {}

  findAll(): Promise<NotificationCategory[]> {
    return this.notificationCategoryModel.find().exec();
  }
}
