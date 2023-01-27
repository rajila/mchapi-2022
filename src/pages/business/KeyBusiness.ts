import { IDataAccess } from "../util/IDataAccess"
import { IKey } from "../models/IKey"
import KeyDataAccess from "../data/KeyDataAccess"

class KeyBusiness implements IDataAccess<IKey> {
      public dataAcces: KeyDataAccess
      
      constructor() {
            this.dataAcces = new KeyDataAccess()
      }

      get(): Promise<Array<IKey>> {
            // Validaciones
            return this.dataAcces.get()
      }

      getById(id: number): Promise<IKey> {
            // Validaciones
            return this.dataAcces.getById(id)
      }

      insert(data: IKey, idUser: number): Promise<IKey> {
            // Validaciones de usuario y de campos
            return this.dataAcces.insert(data, idUser)
      }

      update(id: number, data: IKey, idUser: number): Promise<IKey> {
            // Validaciones de usuario y de campos
            return this.dataAcces.update(id, data, idUser)
      }

      delete(id: number, idUser: number): Promise<IKey> {
            return this.dataAcces.delete(id, idUser)
      }
}

export default KeyBusiness