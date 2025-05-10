import { HttpClient, HttpHeaders, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceDocenteService {
  private url = environment.url
  constructor(private _httpClient: HttpClient) {}

  public getDatosAsignatura(idPrograma: number): Observable<any>{
   return this._httpClient.get<any>(`${this.url}/Asignatura/ConsultarAsignaturasXPrograma?IdPrograma=${idPrograma}`);
    }
  public getDatosPrograma(): Observable<any>{
    return this._httpClient.get<any>(`${this.url}/Programa/GetPrograma`);
  }
  
   public postCreateQr(datos: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
    return this._httpClient.post<any>(`${this.url}/Parametrizacion/CreateQR`,datos,{headers})  
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


