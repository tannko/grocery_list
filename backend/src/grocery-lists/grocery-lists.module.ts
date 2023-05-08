import { Module } from '@nestjs/common';
import { GroceryListsService } from './grocery-lists.service';
import { GroceryListsController } from './grocery-lists.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GroceryListsController],
  providers: [GroceryListsService, PrismaService],
})
export class GroceryListsModule {}
