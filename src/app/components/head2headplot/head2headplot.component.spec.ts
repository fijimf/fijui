import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Head2headplotComponent } from './head2headplot.component';

describe('Head2headplotComponent', () => {
  let component: Head2headplotComponent;
  let fixture: ComponentFixture<Head2headplotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Head2headplotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Head2headplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
