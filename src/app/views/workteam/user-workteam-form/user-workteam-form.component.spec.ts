import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkteamFormComponent } from './user-workteam-form.component';

describe('UserWorkteamFormComponent', () => {
  let component: UserWorkteamFormComponent;
  let fixture: ComponentFixture<UserWorkteamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWorkteamFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWorkteamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
