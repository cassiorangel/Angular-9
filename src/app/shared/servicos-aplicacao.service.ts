import { Usuario } from './../models/Usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicosAplicacaoService {

  private readonly URL_API = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/tt1375666';

  mostrarMenuEmitter = new EventEmitter<boolean>();

  private usuarioAutenticado = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  fazerOlogin(usuario: Usuario) {
    if(usuario.email === 'user@user.com' && usuario.senha === '1234'){
      alert('usuario logado');
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true)
      return this.router.navigate(['/home']);
    }
    this.usuarioAutenticado = false;
    return alert('erro ao logar')
  }

  fazerLogin(){

    //const httpOptions = {
      const headers = new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
        "x-rapidapi-key": "713acf67b0mshd1b575a09a1bf60p1db9f7jsnf798c0a2969b"
        
      })
    //};
    const options = { headers }

    console.log('options', options)
    

    return this.http.get(this.URL_API, options)
  }
}
