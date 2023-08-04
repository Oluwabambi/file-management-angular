import { TestBed } from '@angular/core/testing';

import { NgxToastService } from './ngx-toast.service';

describe('NgxToastService', () => {
  let service: NgxToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
