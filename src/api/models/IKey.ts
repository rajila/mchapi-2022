import { IModel } from "../util/IModel"

export interface IKey extends IModel {
      id?: BigInt,
      ubicacion: string,
      tipo_tarjeta: string,
      idqr: string,
      qr: string,
      imagenqr?: string,
      estado?: number,
      observacion?: string,
      fecha_creacion?: string,
      fecha_ultimo_cambio?: string
      idusuario?: BigInt
}