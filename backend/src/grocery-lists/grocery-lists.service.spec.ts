import { Test, TestingModule } from '@nestjs/testing';
import { GroceryListsService } from './grocery-lists.service';
import { PrismaService } from '../prisma.service';
import { Item } from '@prisma/client';

const mockLists = [
  {
    id: 1,
    name: 'test1',
    items: [],
  },
  {
    id: 2,
    name: 'test2',
    items: [],
  },
];

const mockItem: Item = {
  id: 1,
  name: 'apple',
  purchased: false,
  groceryListId: 1,
};

describe('GroceryListsService', () => {
  let service: GroceryListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroceryListsService,
        {
          provide: PrismaService,
          useValue: {
            groceryList: {
              create: (data) => {
                return mockLists[0];
              },
              findMany: () => {
                return mockLists;
              },
              findUnique: (listId: number) => {
                return mockLists[0];
              },
              update: () => {
                return mockLists[0];
              },
            },
          },
        },
      ],
    }).compile();

    service = module.get<GroceryListsService>(GroceryListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new list and return it', () => {
    expect(service.create({ name: 'test' })).toEqual(mockLists[0]);
  });

  it('should return all the lists', () => {
    expect(service.findAll()).toEqual(mockLists);
  });

  it('should find one list by id', () => {
    expect(service.findOne(1)).toEqual(mockLists[0]);
  });

  it('should add item to the list', () => {
    expect(service.addItem(1, mockItem.name)).toEqual(mockLists[0]);
  });

  it('should update item in the list', () => {
    expect(service.updateItem(1, mockItem)).toEqual(mockLists[0]);
  });

  it('should delete item from the list', () => {
    expect(service.deleteItem(1, 1)).toEqual(mockLists[0]);
  });
});
