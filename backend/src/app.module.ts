import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroceryListsModule } from './grocery-lists/grocery-lists.module';

@Module({
  imports: [GroceryListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
