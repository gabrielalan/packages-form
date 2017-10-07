import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyValueComponent } from './currency-value.component';
import { CurrencyValueType } from './currency-value-type';

const keyEventInit = {
  "key" : 'a',
  "code" : 'KeyA',
  "location" : 0,
  "ctrlKey" : false,
  "shiftKey" : false,
  "altKey" : false,
  "metaKey" : false,
  "repeat" : false,
  "isComposing" : false,
  "charCode" : 0,
  "keyCode" : 65,
  "which" : 65
};

describe('CurrencyValueComponent', () => {
  let component: CurrencyValueComponent;
  let fixture: ComponentFixture<CurrencyValueComponent>;
  let element;
  let changeSpy;
  let touchSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyValueComponent);
    component = fixture.componentInstance;
    component.id = 'custom-id';

    changeSpy = jasmine.createSpy('changeSpy');
    touchSpy = jasmine.createSpy('touchSpy');

    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    component.value = new CurrencyValueType('USD', null);
    component.changeCurrency('EUR');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('getters should return null if there is no value', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.valueCurrency).toBeNull();
    expect(component.valueNumber).toBeNull();
  });

  it('should have a toggleDropdown method', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.show).toBeFalsy();
    component.toggleDropdown()
    expect(component.show).toBeTruthy();
  });

  it('should propagate change when type something on the input', async(() => {
    component.value = new CurrencyValueType('USD', null);
    component.registerOnChange(changeSpy);
    fixture.detectChanges();
    element.querySelector('input').dispatchEvent(new KeyboardEvent('keyup', keyEventInit));
    
    // The event is debounced for 10 miliseconds in the component
    setTimeout(() => {
      expect(changeSpy).toHaveBeenCalled();
    }, 20);
  }));

  it('should listen to document click to close dropdown but dont change if the click is inside', () => {
    component.show = true;
    fixture.detectChanges();
    component.clickout({
      target: element.querySelector('button')
    });
    expect(component).toBeTruthy();
    expect(component.show).toBeTruthy();
  });

  it('should listen to document click to close dropdown IF the click is outside', () => {
    component.show = true;
    fixture.detectChanges();
    component.clickout({
      target: document.body
    });
    expect(component).toBeTruthy();
    expect(component.show).toBeFalsy();
  });

  it('should propagate changes and touch', () => {
    component.value = new CurrencyValueType('USD', null);
    component.registerOnChange(changeSpy);
    component.registerOnTouched(touchSpy);
    fixture.detectChanges();
    component.changeNumber(10);
    expect(changeSpy).toHaveBeenCalledWith(new CurrencyValueType('USD', 10));
    expect(touchSpy).toHaveBeenCalled();
  });
});
