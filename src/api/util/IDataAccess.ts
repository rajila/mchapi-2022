export interface IDataAccess<T> {       
      get(): Promise<Array<T>>
      getById(id: number): Promise<T>
      insert(data: T, idUser: number): Promise<T>
      update(id: number, data: T, idUser: number): Promise<T>
      delete(id: number, idUser: number): Promise<T>
}