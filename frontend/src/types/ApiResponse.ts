/**
 * Interfaz genérica para la respuesta de la API.
 * * @template T - Tipo de datos que se espera en la respuesta.
 *  
 */

export interface ApiResponse<T> {
  error: boolean;
  message: string;
  data: T;
}