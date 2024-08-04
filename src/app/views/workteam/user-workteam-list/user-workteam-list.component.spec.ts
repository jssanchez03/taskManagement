import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkteamListComponent } from './user-workteam-list.component';

describe('UserWorkteamListComponent', () => {
  let component: UserWorkteamListComponent;
  let fixture: ComponentFixture<UserWorkteamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWorkteamListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWorkteamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
