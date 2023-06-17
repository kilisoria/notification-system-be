import { Get, Injectable } from '@nestjs/common';

import { UserChannel } from './types/user-channels.type';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  @Get('getUsersByChannelAndSubscribed')
  async getUsersBySubscribed(subscribedId: object): Promise<UserChannel[]> {
    return await this.userModel
      .find({
        subscribed: { $all: [new ObjectId(subscribedId)] },
      })
      .select('_id channels')
      .exec();
  }
}
