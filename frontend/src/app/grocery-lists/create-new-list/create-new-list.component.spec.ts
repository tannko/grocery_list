import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewListComponent } from './create-new-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

describe('CreateNewListComponent', () => {
  let component: CreateNewListComponent;
  let fixture: ComponentFixture<CreateNewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewListComponent],
      imports: [MatDialogModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewListComponent);
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
});
