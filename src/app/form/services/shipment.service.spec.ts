import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { ShipmentService } from './shipment.service';

describe('ShipmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ShipmentService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([ShipmentService], (service: ShipmentService) => {
    expect(service).toBeTruthy();
  }));

  it('should send data to the back end',
    inject([ShipmentService, XHRBackend], (service: ShipmentService, mockBe) => {
      const mockResponse = { result: true };

      mockBe.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.send({}).subscribe((data: any) => {
        expect(data._body).toEqual(JSON.stringify(mockResponse));
      });
    })
  );
});
