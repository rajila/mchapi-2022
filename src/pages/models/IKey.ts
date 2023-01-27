export interface IKey {
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