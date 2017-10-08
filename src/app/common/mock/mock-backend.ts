import { Http, BaseRequestOptions, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { requests } from './mock-responses';

/**
 * connection.request.method is the value of a Enum (RequestMethod.GET... N)
 * So we use index to transform it to the proper name of the method
 */
export const requestMethodEnumConverter = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'];

/**
 * If there is a mock for given URL then executes it.
 * Otherwise, return an Error.
 * It's also possible to use the real HTTP service to
 * pass these not mocked requests to the back end.
 */
export function handleConnection(requests, connection: MockConnection) {
  // keep async
  setTimeout(() => {
    const method = requestMethodEnumConverter[connection.request.method];

    if (method in requests && connection.request.url in requests[method]) {
      return requests[method][connection.request.url](connection);
    }

    connection.mockError(new Error(`No mock handler for this path: ${connection.request.url}`));
  }, 700);
}

/**
 * In case the need of pass throught some request to real back end:
 * realBackend: XHRBackend as a dependency
 */
export function mockBackendFactory(backend: MockBackend, options: BaseRequestOptions): Http {
    backend.connections.subscribe(handleConnection.bind(null, requests));

    return new Http(backend, options);
}

export const mockBackendProvider = {
  provide: Http,
  useFactory: mockBackendFactory,
  deps: [MockBackend, RequestOptions, XHRBackend]
};
