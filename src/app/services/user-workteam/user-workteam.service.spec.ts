import { TestBed } from '@angular/core/testing';
import { UserWorkteamService } from './user-workteam.service';

describe('UserWorkteamService', () => {
  let service: UserWorkteamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWorkteamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
