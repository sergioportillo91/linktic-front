import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

type ObjectInterceptor = {
    'Content-Type': string;
    Authorization?:  string;
  }

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  /**
   * @param spinnerState, se utiliza para visualizar, ocultar el spinner
   */

  /**
   * Metodo que permite capturar cada request del sistema,
   * para asi agregar la seguridad correspondiente a cada peticion
   * con su respectivo spinner
   *
   * @param req, es la solicitud que envia el cliente
   * @param next, es el siguiente interceptor a ejecutar, si aplica
   * @returns Observador con el request modificado
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // se configura el spinner para esta peticion
   
    let contentHeader = this.getOnlyTypeJson();
    return next.handle(req.clone({ setHeaders: contentHeader})).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
           
          }
        },
        (err: any) => {
          
        }
      )
    );
  }

  /**
   * Metodo que permite crear un Header con solo el tipo de json content
   */
  private getOnlyTypeJson(): any {  
    let object: ObjectInterceptor = {
      'Content-Type': 'application/json;charset=UTF-8'
    };
    let token = sessionStorage.getItem('token');
    if (token)  {
      object = {
        ...object, 
        'Authorization': `Bearer ${ token }`
      } 
    }     
    return object;
  }
}