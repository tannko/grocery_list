import { Test, TestingModule } from '@nestjs/testing';
import { GroceryListsService } from './grocery-lists.service';

describe('GroceryListsService', () => {
  let service: GroceryListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroceryListsService],
    }).compile();

    service = module.get<GroceryListsService>(GroceryListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
