import { TestBed, inject } from '@angular/core/testing';

import { DialogStreamService } from './dialog-stream.service';

describe('DialogStreamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogStreamService]
    });
  });

  it('should be created', inject([DialogStreamService], (service: DialogStreamService) => {
    expect(service).toBeTruthy();
  }));

  it('should call the subscription with given message', inject([DialogStreamService], (service: DialogStreamService) => {
    const spy = jasmine.createSpy('subSpy');

    const message = {
      title: 'Title',
      body: 'Message'
    };

    service.subscribe(spy);

    service.send(message);

    expect(spy).toHaveBeenCalledWith(message);
  }));
});
