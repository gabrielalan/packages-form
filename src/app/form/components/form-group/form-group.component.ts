import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent {
  @Input()
  public field: string;

  @Input()
  public group: FormGroup;

  @Input()
  public extraClasses: {[key: string]: boolean};

  constructor() { }

  cssClasses() {
    return Object.assign({
      'is-invalid': this.isInvalid()
    }, this.extraClasses);
  }

  isInvalid() {
    return this.control.invalid && this.control.touched;
  }

  get control(): AbstractControl {
    return this.group.get(this.field);
  }
}
