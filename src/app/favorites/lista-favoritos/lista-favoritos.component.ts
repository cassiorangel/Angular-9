import { Component, OnInit } from '@angular/core';
import { ServicosAplicacaoService } from 'src/app/shared/servicos-aplicacao.service';
import { catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-favoritos',
  templateUrl: './lista-favoritos.component.html',
  styleUrls: ['./lista-favoritos.component.scss']
})
export class ListaFavoritosComponent implements OnInit {

  constructor(
    private service: ServicosAplicacaoService
  ) { }

  listaDeFilmes$: Subscription;

  filmesFavoritos: any[];

  urlImg: string = 'https://image.tmdb.org/t/p/w500/';

  ngOnInit(): void {
    this.listaDeFilmes$ = this.service.getFavorites()
      .pipe(
        catchError(error => of(console.log(error)))
      )
      .subscribe(res => {
        this.filmesFavoritos = res['results']
        console.log(this.filmesFavoritos)})
  }
  ngOnDestroy(): void {
    this.listaDeFilmes$.unsubscribe();
  }
}
