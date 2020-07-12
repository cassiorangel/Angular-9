import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { ServicosAplicacaoService } from 'src/app/shared/servicos-aplicacao.service';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss']
})
export class PlaysComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ServicosAplicacaoService
  ) { }

  dadosFilmes: Subscription;

  imagePath = 'https://image.tmdb.org/t/p/w500/';

  listaFilmes: any[];

  linguagem = [
    { 
      id: 'pt-BR',
      name: 'Português'
    },
    { 
      id: 'en-US',
      name: 'Inglês'
    }
  ];

  formBusca = this.fb.group({
    idioma: ['', Validators.required],
    filme: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  pesquisa() {
    const filme = this.formBusca.value['filme'];
    const idioma = this.formBusca.value['idioma']
   
    this.dadosFilmes = this.service.getSearch(idioma, filme)
      .pipe(
        catchError(error => of(console.log(error)))
      )
      .subscribe(res => {
        this.listaFilmes = res['results']
        console.log(this.listaFilmes)})
  }
  detalheFilme(id: number) {
    console.log(id)
  }
  ngOnDestroy(): void {
    this.dadosFilmes.unsubscribe();
  }

}
