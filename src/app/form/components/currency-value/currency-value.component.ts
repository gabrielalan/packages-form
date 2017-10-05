import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CurrencyValueType } from './currency-value-type';

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
export class CurrencyValueComponent implements ControlValueAccessor {
  @Input() id: string;

  @Input() currencies: Array<string>;

  protected value: CurrencyValueType;

  protected show: boolean = false;

  protected propagateChange = (_: CurrencyValueType) => {};

  constructor() {}

  get valueNumber(): number {
    return this.value ? this.value.value : null;
  }

  get valueCurrency(): string {
    return this.value ? this.value.currency : null;
  }

  toggleDropdown() {
    this.show = !this.show;
  }

  changeCurrency(newCurrency: string): void {
    this.value.currency = newCurrency;
    this.propagateChange(this.value);
    this.show = false;
  }

  writeValue(value: CurrencyValueType): void {
    this.value = value;
  }

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}
}
