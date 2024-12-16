import { TestBed } from '@angular/core/testing';

import { EnvoieDedemandeService } from './envoie-dedemande.service';

describe('EnvoieDedemandeService', () => {
  let service: EnvoieDedemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvoieDedemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
