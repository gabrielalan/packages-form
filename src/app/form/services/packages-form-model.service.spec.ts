import { TestBed, inject } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { PackagesFormModelService } from './packages-form-model.service';
import { FormValidatorAdapterService } from './form-validator-adapter.service';

class AdapterMock {
  messageValidator(message, validator) {
    return (control) => validator(control);
  }
}

describe('PackagesFormModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        PackagesFormModelService,
        { provide: FormValidatorAdapterService, useClass: AdapterMock }
      ]
    });
  });

  it('should be created', inject([PackagesFormModelService], (service: PackagesFormModelService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a dynamic message for name max length', inject([PackagesFormModelService], (service: PackagesFormModelService) => {
    const error = {
      maxlength: {
        requiredLength: 10,
        actualLength: 20
      }
    };
    expect(service.nameMaxLengthMessage(error)).toEqual('Name must be less or equal than 10 characters. You got 20!');
  }));

  it('should have a dynamic message for weight max message', inject([PackagesFormModelService], (service: PackagesFormModelService) => {
    const error = {
      max: {
        max: 10,
        actual: 20
      }
    };
    expect(service.weightMaxMessage(error)).toEqual('The package can have up to 10kg. This one has 20kg!');
  }));
});
