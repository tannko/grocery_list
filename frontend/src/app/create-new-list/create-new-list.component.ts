import { Component } from '@angular/core';

@Component({
  selector: 'app-create-new-list',
  templateUrl: './create-new-list.component.html',
  styleUrls: ['./create-new-list.component.css'],
})
export class CreateNewListComponent {
  listName: string = '';
  // saveNewList() {
  //   console.log('save new list and redirect to list edit');
  // }
}
