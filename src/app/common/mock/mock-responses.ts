import { Response, ResponseOptions } from '@angular/http';
import { MockConnection } from '@angular/http/testing';

/**
 * For simple purposes this is good enough
 * Otherwise we could create a singleton service
 * Where its possible to add or remove mocks programatically
 */
export const requests = {
  'GET': {
    'api/conversionRates': (connection: MockConnection) => {
      return connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          'EUR': 1,
          'GBP': 1.11652693,
          'USD': 0.85467894
        }
      })));
    }
  } ,

  'POST': {
    'api/shipment': (connection: MockConnection) => {
      return connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: { result: true }
      })));
    }
  }
};