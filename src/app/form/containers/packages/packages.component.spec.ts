import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PackagesComponent } from './packages.component';
import { PackagesFormModelService } from '../../services/packages-form-model.service';
import { FormValidatorAdapterService } from '../../services/form-validator-adapter.service';
import { ShipmentService } from '../../services/shipment.service';
import { ConversionRatesService } from '../../../common/services/conversion-rates.service';
import { CurrencyValueComponent } from '../../components/currency-value/currency-value.component';
import { CurrencyValueType } from '../../components/currency-value/currency-value-type';


class RatesMock {
  static rates = {
    'EUR': 1,
    'GBP': 1.11652693,
    'USD': 0.85467894,
  };

  fetch() {
    return Observable.of(true);
  }

  convertFrom(currency, value) {
    return Number((RatesMock.rates[currency] * value).toFixed(2));
  }
}

class ShipmentMock {
  static error;

  static sendError = jasmine.createSpy('sendError').and.callFake(data => Observable.throw(ShipmentMock.error));
  static sendSuccs = jasmine.createSpy('sendSuccs').and.callFake(data => Observable.of(true));

  send = jasmine.createSpy('send').and.callFake(
    (data) => ShipmentMock.error ? ShipmentMock.sendError() : ShipmentMock.sendSuccs()
  );
}

describe('PackagesComponent', () => {
  let component: PackagesComponent;
  let fixture: ComponentFixture<PackagesComponent>;
  let element, shipmentInstance;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormValidatorAdapterService,
        PackagesFormModelService,
        { provide: ConversionRatesService, useClass: RatesMock },
        { provide: ShipmentService, useClass: ShipmentMock }
      ],
      declarations: [ CurrencyValueComponent, PackagesComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    shipmentInstance = fixture.debugElement.injector.get(ShipmentService) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.kilos).toEqual('0.000');
    expect(component.total).toEqual(0);
  });

  it('should total and kilos shouldnt be affected by NaN values', () => {
    component.addPackage();
    component.packages.at(0).get('weight').setValue(NaN);
    component.packages.at(0).get('value').setValue(new CurrencyValueType(null, NaN));
    component.packages.at(1).get('weight').setValue(10);
    component.packages.at(1).get('value').setValue(new CurrencyValueType('EUR', 10));

    expect(component.kilos).toEqual('10.000');
    expect(component.total).toEqual(10);
  });

  it('should successfully send date to api', () => {
    component.addPackage();
    component.send();

    expect(component).toBeTruthy();
    expect(shipmentInstance.send.calls.count()).toBe(1);
    expect(ShipmentMock.sendSuccs.calls.count()).toBe(1);
    expect(shipmentInstance.send).toHaveBeenCalledWith({
      packages: [
        { name: null, weight: 0, value: 0 },
        { name: null, weight: 0, value: 0 }
      ]
    });

    component.removePackage(1);
    component.send();

    expect(shipmentInstance.send.calls.count()).toBe(2);
    expect(ShipmentMock.sendSuccs.calls.count()).toBe(2);
    expect(shipmentInstance.send).toHaveBeenCalledWith({
      packages: [
        { name: null, weight: 0, value: 0 }
      ]
    });
  });

  it('should should handle error from api', () => {
    ShipmentMock.error = new Error('Fake test error');
    component.send();

    expect(component).toBeTruthy();
    expect(shipmentInstance.send.calls.count()).toBe(1);
    expect(ShipmentMock.sendError.calls.count()).toBe(1);
  });
});
