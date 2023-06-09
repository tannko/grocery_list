import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GroceryListService } from '../grocery-list.service';
import { MatDialog } from '@angular/material/dialog';
import { Item } from './list-item';
import { GroceryList } from './grocery-list';
import { EditListItemComponent } from '../edit-list-item/edit-list-item.component';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css'],
})
export class GroceryListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: GroceryListService,
    public dialog: MatDialog
  ) {}
  groceryList!: GroceryList;

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
        this.groceryList = list;
      });
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
