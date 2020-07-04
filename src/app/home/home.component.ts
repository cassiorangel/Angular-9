import { ServicosAplicacaoService } from './../shared/servicos-aplicacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private servico: ServicosAplicacaoService
  ) { }

  ngOnInit(): void {
    this.servico.fazerLogin()
      .subscribe(res => console.log(res))
  }

}
