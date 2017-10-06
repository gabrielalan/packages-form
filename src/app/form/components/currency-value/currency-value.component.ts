import { Component, Input, forwardRef, ViewChild, OnInit, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CurrencyValueType } from './currency-value-type';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-currency-value',
  templateUrl: './currency-value.component.html',
  styleUrls: ['./currency-value.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyValueComponent),
      multi: true
    }
  ]
})
export class CurrencyValueComponent implements ControlValueAccessor, OnInit {
  @Input() id: string;

  @Input() currencies: Array<string>;

  @ViewChild('numberInput') numberInput;
  @ViewChild('btnGroup') btnGroup;

  protected value: CurrencyValueType;

  protected show = false;

  protected propagateChange = (_: CurrencyValueType) => {};
  protected propagateTouched = () => {};

  get valueNumber(): number {
    return this.value ? this.value.value : null;
  }

  get valueCurrency(): string {
    return this.value ? this.value.currency : null;
  }

  ngOnInit() {
    Observable
      .fromEvent(this.numberInput.nativeElement, 'keyup')
      .map((i: any) => i.currentTarget.value)
      .debounceTime(300)
      .subscribe(value => this.changeNumber(value));
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.btnGroup.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }

  toggleDropdown() {
    this.show = !this.show;
  }

  changeCurrency(newCurrency: string): void {
    this.value.currency = newCurrency;
    this.propagateChange(this.value);
    this.propagateTouched();
    this.show = false;
  }

  changeNumber(newNumber) {
    this.value.value = newNumber;
    this.propagateChange(this.value);
    this.propagateTouched();
  }

  writeValue(value: CurrencyValueType): void {
    this.value = value;
  }

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn): void {
    this.propagateTouched = fn;
  }
}
