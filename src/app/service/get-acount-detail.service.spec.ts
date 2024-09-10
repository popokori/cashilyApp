import { TestBed } from '@angular/core/testing';

import { AccountDetailsService } from './get-acount-detail.service';

describe('GetAcountDetailService', () => {
  let service: AccountDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
