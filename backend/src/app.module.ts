import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroceryListsModule } from './grocery-lists/grocery-lists.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    GroceryListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
