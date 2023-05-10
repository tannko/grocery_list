import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GroceryListsService } from './grocery-lists.service';
import type { GroceryList, Item } from '@prisma/client';

@Controller('grocery-lists')
export class GroceryListsController {
  constructor(private readonly groceryListsService: GroceryListsService) {}

  @Post()
  create(@Body() data: { name: string }): Promise<GroceryList> {
    return this.groceryListsService.create(data);
  }

  @Get()
  findAll(): Promise<GroceryList[]> {
    return this.groceryListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GroceryList> {
    return this.groceryListsService.findOne(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.groceryListsService.delete(+id);
  }

  @Post('/add-item')
  addItem(@Body() body: { listId: number; itemName: string }) {
    return this.groceryListsService.addItem(body.listId, body.itemName);
  }

  @Post('/update-item')
  updateItem(@Body() body: { listId: number; item: Item }) {
    return this.groceryListsService.updateItem(body.listId, body.item);
  }

  @Post('/delete-item')
  deleteItem(@Body() body: { listId: number; itemId: number }) {
    return this.groceryListsService.deleteItem(body.listId, body.itemId);
  }
}
