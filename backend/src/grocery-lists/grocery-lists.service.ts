import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GroceryList, Item, Prisma } from '@prisma/client';

@Injectable()
export class GroceryListsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.GroceryListCreateInput): Promise<GroceryList> {
    return this.prisma.groceryList.create({ data });
  }

  findAll(): Promise<GroceryList[]> {
    return this.prisma.groceryList.findMany({ include: { items: true } });
  }

  findOne(listId: number): Promise<GroceryList> {
    return this.prisma.groceryList.findUnique({
      where: { id: listId },
      include: { items: true },
    });
  }

  delete(listId: number) {
    return this.prisma.groceryList.delete({
      where: {
        id: listId,
      },
    });
  }

  addItem(listId: number, itemName: string) {
    return this.prisma.groceryList.update({
      where: {
        id: listId,
      },
      include: { items: true },
      data: {
        items: {
          create: {
            name: itemName,
            purchased: false,
          },
        },
      },
    });
  }

  updateItem(listId: number, item: Item) {
    return this.prisma.groceryList.update({
      where: {
        id: listId,
      },
      include: { items: true },
      data: {
        items: {
          update: {
            where: {
              id: item.id,
            },
            data: {
              name: item.name,
              purchased: item.purchased,
            },
          },
        },
      },
    });
  }

  deleteItem(listId: number, itemId: number) {
    return this.prisma.groceryList.update({
      where: {
        id: listId,
      },
      include: { items: true },
      data: {
        items: {
          delete: {
            id: itemId,
          },
        },
      },
    });
  }
}
