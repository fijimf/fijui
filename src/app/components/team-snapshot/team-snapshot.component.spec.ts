import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSnapshotComponent } from './team-snapshot.component';

describe('TeamSnapshotComponent', () => {
  let component: TeamSnapshotComponent;
  let fixture: ComponentFixture<TeamSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamSnapshotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
