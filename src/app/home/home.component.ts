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
  
  ngOnInit(): void {
    
    this.listaServico()
  }

  


  listaServico() {
    this.servico.fazerLogin()
    .subscribe(res => {
      this.titulo = res['technical_specs'];

      console.log(this.titulo)
      
    })
  }

}
