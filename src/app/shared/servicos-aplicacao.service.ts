import { Usuario } from './../models/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicosAplicacaoService {

  private readonly URL_API = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/tt1375666';

  constructor(
    private http: HttpClient
  ) { }

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
