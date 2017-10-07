import { FormControl } from '@angular/forms';
import { pattern, required } from './currency-value-validators';
import { CurrencyValueType } from './currency-value-type';

describe('CurrencyValueValidators', () => {
  let control: FormControl;

  beforeEach(() => control = new FormControl(new CurrencyValueType('EUR', null)));

  describe('required', () => {
    it('should validate empty', () => {
      expect(required(control).required.currency).toBe('EUR');
    });

    it('should validate success', () => {
      control.setValue(new CurrencyValueType('EUR', 10));
      expect(required(control)).toBeNull();
    });
  });

  describe('pattern', () => {
    it('should validate success', () => {
      control.setValue(new CurrencyValueType('EUR', 1));
      const validator = pattern(/^[0-9]$/);
      expect(validator(control)).toBeNull();
    });

    it('should validate false', () => {
      control.setValue(new CurrencyValueType('EUR', 10));
      const validator = pattern(/^[0-9]$/);
      const result = validator(control);
      expect(result.pattern.requiredPattern).toBe('/^[0-9]$/');
      expect(result.pattern.actualValue).toBe(10);
    });
  });
});