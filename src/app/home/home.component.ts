import { ServicosAplicacaoService } from './../shared/servicos-aplicacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  titulo
  constructor(
    private servico: ServicosAplicacaoService
  ) { }
  urlImg: string = 'https://image.tmdb.org/t/p/w500/'
  listaFilmes
  imgFilme: string;
  ngOnInit(): void {
    this.servico.getSelecaoPrincipal()
      .subscribe(res => { 
        this.imgFilme = res['backdrop_path']
        this.listaFilmes = res['results']; 
        console.log(res['results'])})
   // this.listaServico()
  }

 
  

}
