import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkteamFormComponent } from './workteam-form.component';

describe('WorkteamFormComponent', () => {
  let component: WorkteamFormComponent;
  let fixture: ComponentFixture<WorkteamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkteamFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkteamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
