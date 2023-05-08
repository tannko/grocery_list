import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGroceryListsComponent } from './all-grocery-lists.component';

describe('AllGroceryListsComponent', () => {
  let component: AllGroceryListsComponent;
  let fixture: ComponentFixture<AllGroceryListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGroceryListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGroceryListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
