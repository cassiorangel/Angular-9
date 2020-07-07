import { Usuario } from './../models/Usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicosAplicacaoService {

  private readonly key: string = 'aa7a7d31eb16c5f13021ce3c2df7e19a';

  private readonly URL_SESSION: string = 'https://api.themoviedb.org/3/authentication/session/new?api_key=';

  private readonly URL_AUTH: string = 'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=';

  private readonly URL_TOKEN: string = 'https://api.themoviedb.org/3/authentication/token/new?api_key=';

  private readonly URL_API = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/tt1375666';

  mostrarMenuEmitter = new EventEmitter<boolean>();

  private usuarioAutenticado = false;

  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  authLogin(usuario: Usuario, token) {
    
    const body = {
      "username": usuario.email,
      "password": usuario.senha,
      "request_token": token
    }
    return this.http.post(this.URL_AUTH + this.key, body)
      .subscribe(res => {
       // console.log('sucesso', res);
        this.usuarioAutenticado = true;
        this.mostrarMenuEmitter.emit(true);
        this.setToket(res['request_token']);
        this.router.navigate(['/home']);
     
      },
      error => {
        this.usuarioAutenticado = false;
        this.mostrarMenuEmitter.emit(false);
        console.log(error, 'erro login')
      })
  }

  getSession() {
    const api_key = {
      "request_token": this.key
    }
    
    return this.http.post(this.URL_SESSION, api_key)
  }

  getSessionToken(usuario: Usuario, token: string) {

    const body = {
      "username": usuario.email,
      "password": usuario.senha,
      "request_token": token
    }
    
    const api_key = {
      "request_token": this.key
    }
    
    let responseToken = this.http.post(this.URL_AUTH + this.key, body);
    let responseSession = this.http.post(this.URL_SESSION, api_key);
    
    return forkJoin([responseToken, responseSession])
  }


  fazerOlogin(usuario: Usuario) {
  
    if(this.token){
      return this.authLogin(usuario, this.token)
    }

    return alert('nao tem token')
 
  }

  getToken() {
    return this.http.get(this.URL_TOKEN + this.key)
    .subscribe(res => this.token = res['request_token'],
    error => console.log('eror', error))
  }

  setToket(token: string) {
    return localStorage.setItem('request_token', token)
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
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
