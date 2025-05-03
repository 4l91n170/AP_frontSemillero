import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../Models/character.model';
import { Observable } from 'rxjs';
import { Datos, Qr } from '../Models/datos.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceDocenteService {
  private url = 'https://rickandmortyapi.com/api/character'
  constructor(private _httpClient: HttpClient) {}

  public getPersonajes(): Observable<Character>{
    return this._httpClient.get<Character>(this.url);
  }

  public getPersonajesById(id: number):Observable<Character>{
    return this._httpClient.get<Character>(`${this.url}/${id}`)
  }
  public postCreateQr(datos: Datos){
    return this._httpClient.post<Qr>(`${this.url}`,datos)
  }

  // Este es el nuevo metodo de llamar a apis en angular 19
  // getPersonajes(){
  //   return httpResource <Character[]> ({
  //     url: 'https://rickandmortyapi.com/api/character',
  //     method: 'GET'

  //   },{
  //     defaultValue: []
  //   })
  // }


}


