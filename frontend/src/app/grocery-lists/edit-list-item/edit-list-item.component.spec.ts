import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListItemComponent } from './edit-list-item.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

describe('EditListItemComponent', () => {
  let component: EditListItemComponent;
  let fixture: ComponentFixture<EditListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditListItemComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: 'test',
        },
      ],
      imports: [MatDialogModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain input', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toBe(1);
  });

  it('should contain Cancel button', () => {
    const cancelButton = fixture.nativeElement.querySelector(
      'mat-dialog-actions button'
    );
    expect(cancelButton.textContent).toBe('Cancel');
  });

  it('should contain Save button', () => {
    const saveButton = fixture.nativeElement.querySelector(
      'mat-dialog-actions button ~ button'
    );
    expect(saveButton.textContent).toBe('Save');
  });

  it('item should contain provided item name', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).not.toBe('');
  });
});
