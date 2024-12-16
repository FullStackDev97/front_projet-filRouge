import { TestBed } from '@angular/core/testing';

import { OffreImmobilierService } from './offre-immobilier.service';

describe('OffreImmobilierService', () => {
  let service: OffreImmobilierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreImmobilierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
