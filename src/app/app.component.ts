import { Component } from '@angular/core';
import { ServicosAplicacaoService } from './shared/servicos-aplicacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular9';

  mostrarMenu: boolean = false;

  constructor(
    private servico: ServicosAplicacaoService
  ) {}

  ngOnInit() {

    this.servico.mostrarMenuEmitter.subscribe(res => this.mostrarMenu = res)
    
    
  }
}
