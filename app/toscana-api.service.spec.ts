import { TestBed } from '@angular/core/testing';

import { ToscanaApiService } from './toscana-api.service';

describe('ToscanaApiService', () => {
  let service: ToscanaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToscanaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
