import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryListComponent } from './grocery-list.component';
import { GroceryListService } from '../grocery-list.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AddListItemComponent } from '../add-list-item/add-list-item.component';
import { FormsModule } from '@angular/forms';
import { EditListItemComponent } from '../edit-list-item/edit-list-item.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

const mockList = {
  id: 1,
  name: 'test',
  items: [
    {
      id: 1,
      name: 'Milk',
      purchased: false,
    },
    {
      id: 2,
      name: 'Bread',
      purchased: true,
    },
  ],
};

describe('GroceryListComponent', () => {
  let component: GroceryListComponent;
  let fixture: ComponentFixture<GroceryListComponent>;
  let mockGroceryListService: Partial<GroceryListService> = {
    getGroceryList(id) {
      return of(mockList);
    },
    addListItem(listId, itemName) {
      mockList.items.push({
        id: 3,
        name: itemName,
        purchased: false,
      });
      return of(mockList);
    },
    updateListItem(listId, item) {
      mockList.items[0].name = 'Milky';
      mockList.items[0].purchased = !mockList.items[0].purchased;
      return of(mockList);
    },
    deleteListItem(listId, itemId) {
      mockList.items.shift();
      return of(mockList);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GroceryListComponent,
        AddListItemComponent,
        EditListItemComponent,
      ],
      providers: [
        {
          provide: GroceryListService,
          useValue: mockGroceryListService,
        },
        {
          provide: MatDialog,
          useValue: {
            open: () => {
              return {
                afterClosed: () => {
                  return of('Milky');
                },
              };
            },
          },
        },
        // {
        //   provide: MAT_DIALOG_DATA,
        //   useValue: {
        //     data: 'Milk',
        //   },
        // },
        // {
        //   provide: Router,
        //   useValue: {
        //     navigate: (params: Array<any>) => {
        //       return params;
        //     }
        //   },
        // },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ id: 1, get: (param: string) => 1 }),
          },
        },
      ],
      imports: [
        MatCardModule,
        MatIconModule,
        MatListModule,
        FormsModule,
        MatDialogModule,
        AppRoutingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroceryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain grocery list name in a list header', () => {
    const html = fixture.nativeElement;
    const titleSpan = html.querySelector('mat-card-header span');
    expect(titleSpan.textContent).toBe('test');
  });

  it('should contain grocery list items if any', () => {
    const html = fixture.nativeElement;
    const nodeList = html.querySelectorAll('mat-list-item');
    expect(nodeList.length).toBe(component.groceryList.items.length);
  });

  it('should show edit button for every item', () => {
    const html = fixture.nativeElement;
    let countEditButtons = 0;
    const nodeList = html.querySelectorAll('.list-item-row button mat-icon');
    nodeList.forEach((node: any) => {
      if (node.textContent == 'edit') {
        countEditButtons++;
      }
    });
    expect(countEditButtons).toBe(component.groceryList.items.length);
  });

  it('should show delete button for every item', () => {
    const html = fixture.nativeElement;
    let countEditButtons = 0;
    const nodeList = html.querySelectorAll('.list-item-row button mat-icon');
    nodeList.forEach((node: any) => {
      if (node.textContent == 'delete') {
        countEditButtons++;
      }
    });
    expect(countEditButtons).toBe(component.groceryList.items.length);
  });

  it('should show add item input when + button clicked', () => {
    const html = fixture.nativeElement;
    const addItemButton = html.querySelector('.header-button-last button');
    addItemButton.click();
    fixture.detectChanges();
    expect(component.showAddItem).toBe(true);
    const addItemComponent =
      fixture.nativeElement.querySelectorAll('add-list-item');
    expect(addItemComponent.length).toBe(1);
  });

  it('should contain new item if input has non empty value and save is clicked', () => {
    const html = fixture.nativeElement;
    let items = html.querySelectorAll('mat-list-item');
    let itemsCount = items.length;
    const addItemButton = html.querySelector('.header-button-last button');
    addItemButton.click();
    fixture.detectChanges();
    const addItem = fixture.nativeElement.querySelector('input');
    addItem.value = 'new item';
    addItem.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector(
      'add-list-item button'
    );
    saveButton.click();
    fixture.detectChanges();
    items = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(items.length).toBe(itemsCount + 1);
  });

  it('should stay the same if new item name is empty and save is clicked', () => {
    const html = fixture.nativeElement;
    let items = html.querySelectorAll('mat-list-item');
    let itemsCount = items.length;
    const addItemButton = html.querySelector('.header-button-last button');
    addItemButton.click();
    fixture.detectChanges();
    const addItem = fixture.nativeElement.querySelector('input');
    addItem.value = '';
    addItem.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector(
      'add-list-item button'
    );
    saveButton.click();
    fixture.detectChanges();
    items = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(items.length).toBe(itemsCount);
  });

  it('should hide add item input if close is clicked', () => {
    const html = fixture.nativeElement;
    const addItemButton = html.querySelector('.header-button-last button');
    addItemButton.click();
    fixture.detectChanges();
    const closeButton = fixture.nativeElement.querySelector(
      'add-list-item button ~ button'
    );
    closeButton.click();
    fixture.detectChanges();
    expect(component.showAddItem).toBe(false);
    const addListComponent =
      fixture.nativeElement.querySelector('add-list-item');
    expect(addListComponent).toBe(null);
  });

  it('should not add item if close is clicked', () => {
    const html = fixture.nativeElement;
    let items = html.querySelectorAll('mat-list-item');
    let itemsCount = items.length;
    const addItemButton = html.querySelector('.header-button-last button');
    addItemButton.click();
    fixture.detectChanges();
    const addItem = fixture.nativeElement.querySelector('input');
    addItem.value = 'new item';
    addItem.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const closeButton = fixture.nativeElement.querySelector(
      'add-list-item button ~ button'
    );
    closeButton.click();
    fixture.detectChanges();
    items = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(items.length).toBe(itemsCount);
  });

  it('should update item name if it was edited', () => {
    const html = fixture.nativeElement;
    const firstItemEditButton = html.querySelector('.list-item-row button');
    firstItemEditButton.click();
    fixture.detectChanges();
    const firstItem = html.querySelector('mat-list-item');
    expect(firstItem.textContent.trim()).toBe('Milky');
  });

  it('should delete item from list if delete button is clicked', () => {
    const html = fixture.nativeElement;
    let items = html.querySelectorAll('.list-item-row');
    const itemsCount = items.length;
    const firstItemEditButton = html.querySelector(
      '.list-item-row button ~ button'
    );
    firstItemEditButton.click();
    fixture.detectChanges();
    items = html.querySelectorAll('.list-item-row');
    expect(items.length).toBe(itemsCount - 1);
  });

  it('should change item purchased status (strikethrough) by click on it', () => {
    const html = fixture.nativeElement;
    let firstItem = html.querySelector('mat-list-item');
    let firstItemStatus = firstItem.classList.contains('strikethrough');
    firstItem.click();
    fixture.detectChanges();
    firstItem = html.querySelector('mat-list-item');
    expect(firstItem.classList.contains('strikethrough')).toBe(
      !firstItemStatus
    );
  });

  it('should navigate back to list of lists when back arrow is clicked', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    const html = fixture.nativeElement;
    const goBackButton = html.querySelector('.header-button-first button');
    goBackButton.click();

    expect(routerSpy).toHaveBeenCalledWith(['/my-lists']);
  });
});
