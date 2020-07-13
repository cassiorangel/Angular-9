import { ServicosAplicacaoService } from './../shared/servicos-aplicacao.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  titulo;

  listaPopulares$: Subscription;
  constructor(
    private servico: ServicosAplicacaoService
  ) { }
  urlImg: string = 'https://image.tmdb.org/t/p/w500/';
  listaFilmes
  imgFilme: string;
  ngOnInit(): void {
    this.listaPopulares$ = this.servico.getSelecaoPrincipal()
      .pipe(
        catchError(error => of(console.log(error)))
      )
      .subscribe(res => {
        this.imgFilme = res['backdrop_path']
        this.listaFilmes = res['results'];
        console.log(res['results'])
      });
  }

  adicionarFavoritos(id: number) {
    console.log(id);
    this.servico.addFavorites(id)
      .pipe(
        catchError(error => of(console.log(error)))
      )
      .subscribe(
        res => alert('Filme adicionado aos meus favoritos')
      )
  }

  ngOnDestroy() {
      this.listaPopulares$.unsubscribe();
  }


}
