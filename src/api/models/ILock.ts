import { IModel } from "../util/IModel";
import { IDevice } from "./IDevice";

export interface ILock extends IDevice, IModel {
      mac: string
}