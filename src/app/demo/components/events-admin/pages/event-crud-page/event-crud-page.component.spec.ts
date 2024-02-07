import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCrudPageComponent } from './event-crud-page.component';

describe('EventCrudPageComponent', () => {
  let component: EventCrudPageComponent;
  let fixture: ComponentFixture<EventCrudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCrudPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventCrudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
