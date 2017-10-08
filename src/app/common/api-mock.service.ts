import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ApiMock implements InMemoryDbService {
  createDb(reqInfo) {
    console.log(reqInfo);
    return {
      shipment: [{ id: 0 }],
      conversionRates: {
        'EUR': 1,
        'GBP': 1.11652693,
        'USD': 0.85467894,
      }
    };
  }
}
