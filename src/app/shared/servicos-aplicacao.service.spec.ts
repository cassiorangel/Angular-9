import { TestBed } from '@angular/core/testing';

import { ServicosAplicacaoService } from './servicos-aplicacao.service';

describe('ServicosAplicacaoService', () => {
  let service: ServicosAplicacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicosAplicacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
