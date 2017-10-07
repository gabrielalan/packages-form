import { Component, OnInit } from '@angular/core';
import { DialogStreamService, Message } from '../../services/dialog-stream.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

	public message: Message;

	public show = false;

  constructor(private stream: DialogStreamService) {}

  ngOnInit() {
  	this.stream.subscribe(message => this.showMessage(message));
  }

  showMessage(message: Message) {
  	this.message = message;
  	this.show = true;
  }

  toggle() {
  	this.show = !this.show;
  }

  get title() {
  	return this.message ? this.message.title : null;
  }

  get body() {
  	return this.message ? this.message.body : null;
  }

  get classes() {
  	return {
  		'show': this.show
  	}
  }
} /* istanbul ignore next */
