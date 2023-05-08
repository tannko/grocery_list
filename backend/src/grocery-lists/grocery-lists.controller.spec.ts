import { Test, TestingModule } from '@nestjs/testing';
import { GroceryListsController } from './grocery-lists.controller';
import { GroceryListsService } from './grocery-lists.service';

describe('GroceryListsController', () => {
  let controller: GroceryListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryListsController],
      providers: [GroceryListsService],
    }).compile();

    controller = module.get<GroceryListsController>(GroceryListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
