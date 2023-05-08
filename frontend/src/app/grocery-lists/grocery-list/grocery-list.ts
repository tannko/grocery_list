import { Item } from './list-item';

export type GroceryList = {
  id: number;
  name: string;
  items: Array<Item>;
};
