import { DomainConstant } from "../domain/domain.constant";

export class AuthApiConstant {

  /** URI GATEWAY */
  public static readonly URI_GATEWAY = DomainConstant.URI_GATEWAY;

  public static readonly PATH_USERS = '/auth'

  /** URL para el servicio de inicio de sesion */
  public static readonly URL_LOGIN: string =
  AuthApiConstant.URI_GATEWAY +
  AuthApiConstant.PATH_USERS +
  '/login';

}
