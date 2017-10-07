import { TestBed, inject } from '@angular/core/testing';
import { Validators, FormControl } from '@angular/forms';
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

  it('should work with string message', inject([FormValidatorAdapterService], (service: FormValidatorAdapterService) => {
    const validator = service.messageValidator('Test message', Validators.required);
    const control = new FormControl(null);

    expect(validator(control).message).toBe('Test message');
  }));

  it('should work with string message', inject([FormValidatorAdapterService], (service: FormValidatorAdapterService) => {
    const validator = service.messageValidator(
    	(error) => `Name must be less or equal than ${error.maxlength.requiredLength} characters. You got ${error.maxlength.actualLength}!`, 
        Validators.maxLength(1));
    const control = new FormControl('ab');

    expect(validator(control).message).toBe('Name must be less or equal than 1 characters. You got 2!');
  }));
});
