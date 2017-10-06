import { TestBed, inject } from '@angular/core/testing';

import { PackagesFormModelService } from './packages-form-model.service';

describe('PackagesFormModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackagesFormModelService]
    });
  });

  it('should be created', inject([PackagesFormModelService], (service: PackagesFormModelService) => {
    expect(service).toBeTruthy();
  }));
});
