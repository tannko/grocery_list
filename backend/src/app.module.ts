import { Module } from '@nestjs/common';
import { GroceryListsModule } from './grocery-lists/grocery-lists.module';
//import { ServeStaticModule } from '@nestjs/serve-static';
//import { join } from 'path';

@Module({
  imports: [
    /*ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),*/
    GroceryListsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
