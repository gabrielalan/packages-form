import { Request, RequestOptions } from '@angular/http';
import { MockConnection } from '@angular/http/testing';
import { requests } from './mock-responses';

describe('MockResponses', () => {
  it("get should call mockRespond", () => {
    const connection = new MockConnection(new Request(new RequestOptions()));

    const tempSpy = spyOn(connection, 'mockRespond');

    requests.GET['api/conversionRates'](connection);

    expect(tempSpy).toHaveBeenCalled();
  });

  it("post should call mockRespond", () => {
    const connection = new MockConnection(new Request(new RequestOptions()));

    const tempSpy = spyOn(connection, 'mockRespond');

    requests.POST['api/shipment'](connection);

    expect(tempSpy).toHaveBeenCalled();
  });
});
