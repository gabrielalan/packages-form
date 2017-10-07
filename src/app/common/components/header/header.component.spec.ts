import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
    const component: HeaderComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render a image and a title', async(() => {
    const fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
    const component: HeaderComponent = fixture.componentInstance;
    const el = fixture.debugElement.nativeElement;
    const testTitle = 'My Title';

    component.title = testTitle;
    fixture.detectChanges();

    expect(el.querySelector('h1').textContent).toContain(testTitle);
    expect(el.querySelector('img').src).toContain('logo-original.svg');
  }));
});
