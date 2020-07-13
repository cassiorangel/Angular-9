import { Component } from '@angular/core';
import { ServicosAplicacaoService } from './shared/servicos-aplicacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular9';

  mostrarMenu: boolean = false;

  constructor(
    private servico: ServicosAplicacaoService,
    private router: Router
  ) {}

  ngOnInit() {

    this.servico.mostrarMenuEmitter.subscribe(res => this.mostrarMenu = res)
    
  }
  logout(){
      this.servico.logout()
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/login']);
          this.mostrarMenu = false;
          this.servico.removeToken();
        })
  }
}
