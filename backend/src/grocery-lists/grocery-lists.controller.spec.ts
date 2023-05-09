import { Test, TestingModule } from '@nestjs/testing';
import { GroceryListsController } from './grocery-lists.controller';
import { GroceryListsService } from './grocery-lists.service';
import { PrismaService } from '../prisma.service';

describe('GroceryListsController', () => {
  let controller: GroceryListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryListsController],
      providers: [GroceryListsService, PrismaService],
    }).compile();

    controller = module.get<GroceryListsController>(GroceryListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
