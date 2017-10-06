import { TestBed, inject } from '@angular/core/testing';

import { FormValidatorAdapterService } from './form-validator-adapter.service';

describe('FormValidatorAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValidatorAdapterService]
    });
  });

  it('should be created', inject([FormValidatorAdapterService], (service: FormValidatorAdapterService) => {
    expect(service).toBeTruthy();
  }));
});
