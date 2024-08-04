import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkteamListComponent } from './workteam-list.component';

describe('WorkteamListComponent', () => {
  let component: WorkteamListComponent;
  let fixture: ComponentFixture<WorkteamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkteamListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkteamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
