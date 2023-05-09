import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewListComponent } from '../create-new-list/create-new-list.component';
import { GroceryList } from '../grocery-list/grocery-list';
import { GroceryListService } from '../grocery-list.service';

@Component({
  selector: 'all-grocery-lists',
  templateUrl: './all-grocery-lists.component.html',
  styleUrls: ['./all-grocery-lists.component.css'],
})
export class AllGroceryListsComponent implements OnInit {
  constructor(private service: GroceryListService, public dialog: MatDialog) {}

  groceryLists: Array<GroceryList> = [];
  showAddListInput: boolean = false;

  ngOnInit() {
    this.service.getAllLists().subscribe((allLists: Array<GroceryList>) => {
      this.groceryLists = allLists;
    });
  }

  openAddListDialog() {
    const dialogRef = this.dialog.open(CreateNewListComponent);
    dialogRef.afterClosed().subscribe((listName) => {
      if (listName !== '') {
        this.service
          .addNewList(listName)
          .subscribe((newList) => this.groceryLists.push(newList));
      }
    });
  }

  saveList() {
    this.showAddListInput = false;
  }

  cancelAdd() {
    this.showAddListInput = false;
  }
}
