import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'add-list-item',
  templateUrl: './add-list-item.component.html',
  styleUrls: ['./add-list-item.component.css'],
})
export class AddListItemComponent {
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter<string>();

  itemName: string = '';

  saveNewItem() {
    if (this.itemName && this.itemName.trim().length > 0) {
      this.save.emit(this.itemName);
      this.itemName = '';
    }
  }

  closeDialog() {
    this.close.emit();
  }
}
