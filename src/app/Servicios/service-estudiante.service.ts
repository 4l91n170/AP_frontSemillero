import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceEstudianteService {
  private url = environment.url
  constructor(private _httpClient: HttpClient) { }

  public postEnviarDatos(datos: any){

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return  this._httpClient.post<any>(`${this.url}/api/asistencia/CreateAsistencia`,datos, {headers})
  }
}
