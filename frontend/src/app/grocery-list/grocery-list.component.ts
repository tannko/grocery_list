import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GroceryListService } from './grocery-list.service';
import { MatDialog } from '@angular/material/dialog';
import { EditListItemComponent } from '../edit-list-item/edit-list-item.component';
import { Item } from './list-item';
import { GroceryList } from './grocery-list';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css'],
})
export class GroceryListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GroceryListService,
    public dialog: MatDialog
  ) {}
  groceryList!: GroceryList;
  newItemName: string = '';

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.service.getGroceryList(params.get('id')!)
        )
      )
      .subscribe((list: GroceryList) => {
        this.groceryList = list;
      });
  }

  showAddItem: boolean = false;

  switchPurchasedStatus(item: Item) {
    this.service
      .updateListItem(this.groceryList.id, {
        id: item.id,
        name: item.name,
        purchased: !item.purchased,
      })
      .subscribe((list: GroceryList) => {
        this.groceryList = list;
      });
  }

  addItem() {
    // show input to edit item
    this.showAddItem = true;
  }

  deleteItem(itemId: number) {
    this.service
      .deleteListItem(this.groceryList.id, itemId)
      .subscribe((list: GroceryList) => {
        this.groceryList = list;
      });
  }

  saveNewItem(name: string) {
    this.service
      .addListItem(this.groceryList.id, name)
      .subscribe((list: GroceryList) => {
        console.log(list);
        this.groceryList = list;
      });
    this.newItemName = '';
  }

  close() {
    this.showAddItem = false;
  }

  goToAllLists() {
    this.router.navigate(['/my-lists']);
  }

  editItem(item: Item) {
    const dialogRef = this.dialog.open(EditListItemComponent, {
      data: item.name,
    });
    dialogRef.afterClosed().subscribe((updatedName) => {
      if (updatedName) {
        this.service
          .updateListItem(this.groceryList.id, {
            id: item.id,
            name: updatedName,
            purchased: item.purchased,
          })
          .subscribe((list: GroceryList) => (this.groceryList = list));
      }
    });
  }
}
