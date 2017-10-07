import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

export declare type Message = {
  title: string,
  body: string
};

@Injectable()
export class DialogStreamService {

  protected subject: Subject<Message> = new Subject();

  send(message: Message): void {
    this.subject.next(message);
  }

  subscribe(
    next: (message: Message) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): void {
    this.subject.subscribe(next, error, complete);
  }
}
