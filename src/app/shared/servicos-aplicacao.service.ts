import { environment } from './../../environments/environment';
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

  private readonly config: string = 'https://api.themoviedb.org/3/configuration?api_key='

  private readonly URL_FINALIZA_SESSION = 'https://api.themoviedb.org/3/authentication/session?api_key=';

  private readonly URL_SESSION: string = 'https://api.themoviedb.org/3/authentication/session/new?api_key=';

  private readonly URL_AUTH: string = 'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=';

  private readonly URL_TOKEN: string = 'https://api.themoviedb.org/3/authentication/token/new?api_key=';

  private readonly URL_API = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/tt1375666';

  mostrarMenuEmitter = new EventEmitter<boolean>();

  private usuarioAutenticado = false;

  private token: string;

  idSessao: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  configURL() {
    return this.http.get(this.config + this.key)
  }

  authLogin(usuario: Usuario, token) {

    const body = {
      "username": usuario.email,
      "password": usuario.senha,
      "request_token": token
    }
    return this.http.post(this.URL_AUTH + this.key, body)
      .subscribe(res => {
        console.log('sucesso', res);
        this.usuarioAutenticado = true;
        this.mostrarMenuEmitter.emit(true);
        this.setToket(res['request_token']);
        this.getSession(res['request_token'])
        this.router.navigate(['/home']);

      },
        error => {
          this.usuarioAutenticado = false;
          this.mostrarMenuEmitter.emit(false);
          alert(JSON.stringify(error['error']['status_message']))
          console.log(error, 'erro login')
        })
  }

  getSession(token: string) {
    const api_key = {
      "request_token": token
    }
    
    return this.http.post(this.URL_SESSION + this.key, api_key)
      .subscribe(res => {
        console.log('session', res['session_id'])
        this.idSessao = res['session_id'];
      })
  }

  logout() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
        "session_id": this.idSessao
      })
    };
    console.log(this.idSessao, 'id')
    //Utilizado deste modo devido erro api
    return this.http.delete(this.URL_FINALIZA_SESSION + this.key + '&session_id=' + this.idSessao)
  }

  fazerOlogin(usuario: Usuario) {

    if (this.token) {
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
  removeToken() {
    return localStorage.clear();
  }

  getTokenLocalStorage() {
    return localStorage.getItem('request_token')
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }


  getSelecaoPrincipal() {
    return this.http.get(environment.API_PRINCIPAL + this.key)
  }
  getSearch(linguagem: string, filme: string) {
    return this.http.get(environment.API_SEARCH + this.key + '&language=' + linguagem + '' + '&query=' + filme)
  }
  getVideoDetalhe(idFilme: number) {
    return this.http.get(environment.API_VIDEO + idFilme + '/videos?api_key=' + this.key)
  }

  addFavorites(idMidia: number) {

    const body = {
      "media_type": "movie",
      "media_id": idMidia,
      "favorite": true
    }

    return this.http.post(environment.API_FAVORITES + this.key + '&session_id=' + this.idSessao, body)
  }
}
