import { TestBed } from '@angular/core/testing';

import { NouveauteBanqueService } from './nouveaute-banque.service';

describe('NouveauteBanqueService', () => {
  let service: NouveauteBanqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NouveauteBanqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
