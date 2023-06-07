import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './schemas/user.schema';

import { UsersService } from './users.service';

@Module({
  imports: [
    // HttpModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users',
      },
    ]),
  ],
  providers: [UsersService],
})
export class UsersModule {}
