import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShipmentService {
  private apiUrl = 'api/shipment';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  send(data) {
    return this.http
      .post(this.apiUrl, JSON.stringify(data), { headers: this.headers });
  }
} /* istanbul ignore next */
