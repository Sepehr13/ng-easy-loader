import { TestBed } from '@angular/core/testing';

import { EasyLoaderService } from './easy-loader.service';

describe('EasyLoaderService', () => {
  let service: EasyLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EasyLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
