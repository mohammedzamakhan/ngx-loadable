import { TestBed } from '@angular/core/testing';

import { LoadableService } from './loadable.service';

describe('LoadableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadableService = TestBed.get(LoadableService);
    expect(service).toBeTruthy();
  });
});
