import { TestBed } from '@angular/core/testing';

import { TolderApiService } from './tolder-api.service';

describe('TolderApiService', () => {
  let service: TolderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TolderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
