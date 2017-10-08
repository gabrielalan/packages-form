import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';

import { ConversionRatesService } from './conversion-rates.service';

describe('ConversionRatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ConversionRatesService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([ConversionRatesService], (service: ConversionRatesService) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch and return observable with transformed data',
    inject([ConversionRatesService, XHRBackend], (service: ConversionRatesService, mockBe) => {
      const mockResponse = {
        'EUR': 1,
        'GBP': 1.11652693,
        'USD': 0.85467894,
      };

      mockBe.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.fetch().subscribe(data => {
        expect(data).toEqual(mockResponse);
        expect(service.convertFrom('GBP', 100)).toEqual(111.65);
        expect(service.convertFrom('NOT_FOUND', 100)).toEqual(100);
      });
    })
  );
});
