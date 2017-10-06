import { Injectable } from '@angular/core';

@Injectable()
export class ConversionRatesService {
  base = 'EUR';

  conversionRates = {
    'EUR': 1,
    'GBP': 1.11652693,
    'USD': 0.85467894,
  };

  fetch() {
  }

  convertFrom(currency: string, value: number): number {
    return Number((this.conversionRates[currency] * value).toFixed(2));
  }
}
