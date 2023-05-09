import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGroceryListsComponent } from './all-grocery-lists.component';
import { GroceryListService } from '../grocery-list.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';

const mockLists = [
  {
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
  },
  {
    id: 2,
    name: 'another list',
    items: [
      {
        id: 1,
        name: 'Meat',
        purchased: false,
      },
      {
        id: 2,
        name: 'Apples',
        purchased: true,
      },
    ],
  },
];

describe('AllGroceryListsComponent', () => {
  let component: AllGroceryListsComponent;
  let fixture: ComponentFixture<AllGroceryListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllGroceryListsComponent],
      providers: [
        {
          provide: GroceryListService,
          useValue: {
            getAllLists: () => of(mockLists),
            addNewList: (name: string) => {
              return of({
                id: 3,
                name: name,
                items: [],
              });
            },
          },
        },
        {
          provide: MatDialog,
          useValue: {
            open: () => {
              return {
                afterClosed: () => {
                  return of('Totally New List');
                },
              };
            },
          },
        },
      ],
      imports: [MatCardModule, MatListModule, AppRoutingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AllGroceryListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the list of grocery list names', () => {
    const lists = fixture.nativeElement.querySelectorAll(
      'mat-action-list button'
    );
    expect(lists.length).toBe(component.groceryLists.length);
  });

  it('should add new list into list of lists when Save is clicked in dialog', () => {
    let lists = fixture.nativeElement.querySelectorAll(
      'mat-action-list button'
    );
    const listsCount = lists.length;
    const addListButton = fixture.nativeElement.querySelector('button');
    addListButton.click();
    fixture.detectChanges();
    lists = fixture.nativeElement.querySelectorAll('mat-action-list button');
    expect(lists.length).toBe(listsCount + 1);
  });
});
