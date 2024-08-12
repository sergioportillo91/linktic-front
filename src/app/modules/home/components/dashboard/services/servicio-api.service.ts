import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioApiConstant } from 'src/app/constants/apis/servicio-api.constant';


@Injectable({
  providedIn: 'root'
})
export class ServicioApiService {

  constructor(private http: HttpClient){}

  public save(servicio: any): Observable<any>  {
    return this.http.post<any>(`${ServicioApiConstant.URL_SERVICIO}`, servicio)
  }

  public getServiciosByFilter(filter: any): Observable<any>  {
    return this.http.get<any>(`${ServicioApiConstant.URL_SERVICIO}`, {params: filter})
  }


}
