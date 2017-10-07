import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

export declare type ConversionRates = {[key: string]: number};

@Injectable()
export class ConversionRatesService {
  private apiUrl = 'api/conversionRates';

  public conversionRates: ConversionRates = {};

  constructor(private http: Http) {}

  fetch(): Observable<ConversionRates> {
    return this.http.get(this.apiUrl)
      .map((value: any) => this.conversionRates = value.json() as ConversionRates);
  }

  convertFrom(currency: string, value: number): number {
    return Number((this.conversionRates[currency] * value).toFixed(2));
  }
} /* istanbul ignore next */
