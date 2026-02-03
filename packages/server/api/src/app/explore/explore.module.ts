import { Module } from '@nestjs/common';
import { ExploreController, AppsController, UtilityController } from './explore.controller';

@Module({
  controllers: [ExploreController, AppsController, UtilityController],
})
export class ExploreModule {}
