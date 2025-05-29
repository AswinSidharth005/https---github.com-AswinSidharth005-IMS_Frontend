import { TestBed } from '@angular/core/testing';

import { ListcustomerService } from './listcustomer.service';

describe('ListcustomerService', () => {
  let service: ListcustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListcustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
