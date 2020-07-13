import { Component, OnInit, TemplateRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ServicosAplicacaoService } from 'src/app/shared/servicos-aplicacao.service';
import { of, Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss']
})
export class PlaysComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ServicosAplicacaoService,
    private modalService: BsModalService,
    public sanitizer: DomSanitizer
  ) { 
    
  }
  
  modalRef: BsModalRef;

  dadosFilmes$: Subscription;

  keyVideo: SafeResourceUrl;

  urlVideo: string = 'https://www.youtube.com/embed/';

  imagePath: string = 'https://image.tmdb.org/t/p/w500/';

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
   
    this.dadosFilmes$ = this.service.getSearch(idioma, filme)
      .pipe(
        catchError(error => of(console.log(error)))
      )
      .subscribe(res => {
        this.listaFilmes = res['results']
        console.log(this.listaFilmes)})
  }
  detalheFilme(id: number, template: TemplateRef<any>) {
    console.log(id);
    this.service.getVideoDetalhe(id)
    .pipe(
      catchError(error => of(console.log(error)))
    )
    .subscribe(res => {
      if(res['results'].length) {
        const key = res['results'][0]['key'];
        const url = 'https://www.youtube.com/embed/'
        this.keyVideo = this.sanitizer.bypassSecurityTrustResourceUrl(url + key);
        return this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' }); 
      }
      return alert('Video nao disponível');
    })
    
  }
    
  ngOnDestroy(): void {
    
    if(this.dadosFilmes$){
      this.dadosFilmes$.unsubscribe();
    }
    
  }

}
