import { DomainConstant } from "../domain/domain.constant";

export class ClientApiConstant {

  /** URI GATEWAY */
  public static readonly URI_GATEWAY = DomainConstant.URI_GATEWAY;

  public static readonly PATH_CLIENTS = '/customer'


  public static readonly URL_CLIENTS: string =
  ClientApiConstant.URI_GATEWAY +
  ClientApiConstant.PATH_CLIENTS


  


}
