import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../Models/character.model';
import { Observable } from 'rxjs';
import { datosDocente, datosFormularioAsistencia, Qr } from '../Models/datos.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceDocenteService {
  private url = environment.url
  constructor(private _httpClient: HttpClient) {}

  public getDatosFormulario(): Observable<datosFormularioAsistencia>{
    return this._httpClient.get<datosFormularioAsistencia>(this.url);
  }

   public postCreateQr(datos: datosDocente){
    return this._httpClient.post<Qr>(`${this.url}`,datos)
  }

  // Este es el nuevo metodo de llamar a apis en angular 19
  // getPersonajes1(){
  //   return httpResource<Character> ({
  //     url: environment.url,
  //     method: 'GET'

  //   },{
  //     defaultValue: []
  //   })
  // }


}


