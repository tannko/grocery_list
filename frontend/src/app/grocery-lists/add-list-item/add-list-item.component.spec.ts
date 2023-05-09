import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListItemComponent } from './add-list-item.component';
import { FormsModule } from '@angular/forms';

describe('AddListItemComponent', () => {
  let component: AddListItemComponent;
  let fixture: ComponentFixture<AddListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddListItemComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddListItemComponent);
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

  it('should contain Save button', () => {
    const saveButton = fixture.nativeElement.querySelector('button');
    expect(saveButton.textContent).toBe('Save');
  });

  it('should contain Close button', () => {
    const closeButton = fixture.nativeElement.querySelector('button ~ button');
    expect(closeButton.textContent).toBe('Close');
  });

  it('should clear input after save is clicked', () => {
    let input = fixture.nativeElement.querySelector('input');
    input.value = 'something';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector('button');
    saveButton.click();
    fixture.detectChanges();

    expect(component.itemName).toBe('');
  });
});
