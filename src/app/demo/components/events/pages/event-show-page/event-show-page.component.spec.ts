import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShowPageComponent } from './event-show-page.component';

describe('EventShowPageComponent', () => {
  let component: EventShowPageComponent;
  let fixture: ComponentFixture<EventShowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventShowPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
