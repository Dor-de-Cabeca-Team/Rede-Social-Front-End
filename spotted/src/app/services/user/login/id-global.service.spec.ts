import { TestBed } from '@angular/core/testing';

import { IdGlobalService } from './id-global.service';

describe('IdGlobalService', () => {
  let service: IdGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
