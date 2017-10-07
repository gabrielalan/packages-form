import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogStreamService } from '../../services/dialog-stream.service';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogStream: DialogStreamService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent ],
      providers: [DialogStreamService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogStream = fixture.debugElement.injector.get(DialogStreamService) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show and hide', () => {
    expect(component.show).toBeFalsy();
    component.toggle();
    expect(component.show).toBeTruthy();
  });

  it('should show and update message/title after receive a stream value', () => {
    dialogStream.send({
      title: 'Title',
      body: 'Body'
    });

    fixture.detectChanges();

    expect(component.title).toEqual('Title');
    expect(component.body).toEqual('Body');
  });
});
