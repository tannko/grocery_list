import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { GroceryList } from './grocery-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './list-item';

@Injectable({
  providedIn: 'root',
})
export class GroceryListService {
  constructor(private http: HttpClient) {}
  groceryListsUrl: string = 'http://localhost:3000/grocery-lists';

  getListItems(id: number | string) {
    return []; //of(listItems);
  }

  getGroceryList(id: number | string) {
    // const groceryList = allGroceryLists.find(
    //   (groceryList: GroceryList) => groceryList.id == id
    // );
    // return of(groceryList);
    return this.http.get<GroceryList>(this.groceryListsUrl + '/' + id);
  }

  getAllLists() {
    return this.http.get<GroceryList[]>(this.groceryListsUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'json',
    });
  }

  addNewList(listName: string): Observable<GroceryList> {
    const body = {
      name: listName,
    };
    return this.http.post<GroceryList>(this.groceryListsUrl, body);
  }

  addListItem(listId: number, itemName: string): Observable<GroceryList> {
    const body = {
      listId: listId,
      itemName: itemName,
    };
    return this.http.post<GroceryList>(
      this.groceryListsUrl + '/add-item',
      body
    );
  }

  updateListItem(listId: number, item: Item) {
    const body = {
      listId: listId,
      item: item,
    };

    return this.http.post<GroceryList>(
      this.groceryListsUrl + '/update-item',
      body
    );
  }

  deleteListItem(listId: number, itemId: number) {
    const body = {
      listId: listId,
      itemId: itemId,
    };

    return this.http.post<GroceryList>(
      this.groceryListsUrl + '/delete-item',
      body
    );
  }
}
