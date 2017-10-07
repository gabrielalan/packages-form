import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent {
  @Input()
  public field: string;

  @Input()
  public group: FormGroup;

  isInvalid() {
    return this.control.invalid && this.control.touched;
  }

  get message() {
    // this getter is only alled if the field is invalid
    return this.control.errors.message;
  }

  get control(): AbstractControl {
    return this.group.get(this.field);
  }
}
