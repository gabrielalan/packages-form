import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { ControlErrorComponent } from './control-error.component';

const validator = Validators.maxLength(4);

const messageValidator = (control) => {
  const result = validator(control);

  if (result) result.message = 'Error';

  return result;
};

describe('ControlErrorComponent', () => {
  let builder = new FormBuilder();
  let component: ControlErrorComponent;
  let fixture: ComponentFixture<ControlErrorComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlErrorComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    component.field = 'validName';
    component.group = builder.group({ validName: '' });

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.message).toBeFalsy();
  });

  it('should show the component but not the message', () => {
    component.field = 'name';
    component.group = builder.group({
      name: ['12345', validator]
    });

    component.group.get('name').markAsTouched();

    fixture.detectChanges();
    expect(component.isInvalid()).toBeTruthy();
    expect(element.querySelector('small')).toBeNull();
  });

  it('should show the component AND the message', () => {
    component.field = 'name';
    component.group = builder.group({
      name: ['12345', messageValidator]
    });

    component.group.get('name').markAsTouched();

    fixture.detectChanges();
    expect(component.isInvalid()).toBeTruthy();
    expect(element.querySelector('small').textContent).toContain('Error');
  });
});
