import { DomainConstant } from "../domain/domain.constant";

export class ServicioApiConstant {

  /** URI GATEWAY */
  public static readonly URI_GATEWAY = DomainConstant.URI_GATEWAY;

  public static readonly PATH_CATEGORIES = '/service'

  /** URL para los servicios de servicios */
  public static readonly URL_SERVICIO: string =
  ServicioApiConstant.URI_GATEWAY +
  ServicioApiConstant.PATH_CATEGORIES


}
