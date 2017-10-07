import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FormGroupComponent } from './form-group.component';

describe('FormGroupComponent', () => {
  const builder = new FormBuilder();
  let component: FormGroupComponent;
  let fixture: ComponentFixture<FormGroupComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    component.field = 'name';
    component.group = builder.group({ name: '' });
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isInvalid()).toBeFalsy();
    expect(component.control instanceof AbstractControl).toBeTruthy();
  });

  it('should have isInvalid method with correct return', () => {
    component.field = 'name';
    component.group = builder.group({ name: [null, Validators.required] });

    component.control.markAsTouched();
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isInvalid()).toBeTruthy();
  });

  it('should let you add extra classes to form-group element', () => {
    component.field = 'name';
    component.extraClasses = {'extra': true};
    component.group = builder.group({ name: null });
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(element.querySelector('.extra')).toBeTruthy();
  });
});
