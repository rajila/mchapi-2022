import { IModel } from "../util/IModel";

export interface IDevice extends IModel {
      id?: BigInt,
      codigo: string,
      nombre: string,
      ubicacion?: string,
}