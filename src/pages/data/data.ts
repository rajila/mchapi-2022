import { IKey } from "../models/IKey"

class DataList {
      constructor(private _ldata: Array<IKey>) {}

      addData(data: IKey): void {
            this._ldata.push(data)
      }

      getLength(): number {
            return this._ldata.length
      }

      getData(id: number): IKey {
            return this._ldata.filter(el => el.id === id)[0]
      }

      getIndexData(id: number): number {
            return this._ldata.findIndex(el => el.id === id)
      }

      updateData(data: IKey, id: number) : IKey {
            const dataIndexDB = this.getIndexData(id)
            this._ldata[dataIndexDB] = { ...this._ldata[dataIndexDB], ...data }
            return this._ldata[dataIndexDB]
      }

      deleteData(id: number): IKey {
            const dataIndexDB = this.getIndexData(id)
            const dataTmp = this.getData(id)
            this._ldata.splice(dataIndexDB, 1)
            return dataTmp
      }

      get ldata(): Array<IKey> {
            return this._ldata
      }
}

const DataListInstance = new DataList([])
Object.freeze(DataListInstance);

export default DataListInstance