import { async } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, Request, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { mockBackendFactory, requestMethodEnumConverter, handleConnection } from './mock-backend';

const mockRequests = {
  'GET': {
    'some/url': jasmine.createSpy('getSomeUrl')
  }
};

describe('MockBackend', () => {
  describe('requestMethodEnumConverter', () => {
    it('should be an array with request methods number', () => {
      expect(requestMethodEnumConverter[0]).toBe('GET');
      expect(requestMethodEnumConverter[1]).toBe('POST');
    });
  });

  describe('mockBackendFactory', () => {
    it('should return an instance of Http', () => {
      const mockBE = new MockBackend();
      const options = new BaseRequestOptions();

      expect(mockBackendFactory(mockBE, options) instanceof Http).toBeTruthy();
    });
  });

  describe('handleConnection', () => {
    it('should execute a mock', async(() => {
      const connection = new MockConnection(new Request(new RequestOptions({
        url: 'some/url',
        method: 'GET'
      })));

      const result = handleConnection(mockRequests, connection);

      setTimeout(() => expect(mockRequests.GET['some/url'].calls.count()).toBe(1), 750);
    }));

    it('should throw connection error when there is no mock', async(() => {
      const connection = new MockConnection(new Request(new RequestOptions({
        url: 'not/found',
        method: 'GET'
      })));

      const tempSpy = spyOn(connection, 'mockError');

      const result = handleConnection(mockRequests, connection);

      setTimeout(() => expect(tempSpy).toHaveBeenCalled(), 750);
    }));
  });
});
