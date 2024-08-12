import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaApiConstant } from 'src/app/constants/apis/reserva-api.constant';

@Injectable({
  providedIn: 'root'
})
export class ReservaApiService {

  constructor(private http: HttpClient){}

  public save(producto: any): Observable<any>  {
    return this.http.post<any>(`${ReservaApiConstant.URL_RESERVAS}`, producto)
  }

  public delete(id: number): Observable<any>  {
    return this.http.delete<any>(`${ReservaApiConstant.URL_RESERVAS}/${id}`)
  }

  public update(reserva: any,id: number): Observable<any>  {
    return this.http.put<any>(`${ReservaApiConstant.URL_RESERVAS}/${id}`, reserva)
  }

  public cancel(id: number): Observable<any>  {
    return this.http.put<any>(`${ReservaApiConstant.URL_RESERVAS}/cancel/${id}`,{})
  }

  public getReservasByFilter(filter: any): Observable<any>  {
    return this.http.get<any>(`${ReservaApiConstant.URL_RESERVAS}`, {params:filter})
  }


}
