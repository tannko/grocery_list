import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../grocery-list/list-item';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.css'],
})
export class EditListItemComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
