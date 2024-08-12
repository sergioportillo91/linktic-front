import { DomainConstant } from "../domain/domain.constant";

export class ReservaApiConstant {

  /** URI GATEWAY */
  public static readonly URI_GATEWAY = DomainConstant.URI_GATEWAY;

  public static readonly PATH_PRODUCTS = '/reservation'

  
  public static readonly URL_RESERVAS: string =
  ReservaApiConstant.URI_GATEWAY +
  ReservaApiConstant.PATH_PRODUCTS

 
}
