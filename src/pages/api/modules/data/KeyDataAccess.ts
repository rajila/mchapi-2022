import DbConnection from "../util/DbConnection"
import { IDataAccess } from "../util/IDataAccess"
import { IKey } from "../models/IKey"
import UtilInstance from "../util/Util"
import { ILock } from "../models/ILock"

class KeyDataAccess implements IDataAccess<IKey> {
      public client: DbConnection

      constructor() {
            this.client = new DbConnection()
      }

      async get(): Promise<Array<IKey>> {
            const queryData  = {
                  name: 'get-keys',
                  text: `SELECT * 
                         FROM tbl_llave
                         WHERE estado IN ($1, $2)
                         ORDER BY id ASC`,
                  values: [1, 0]
            }
              
            let lData: Array<IKey> = (await this.client.exeQuery(queryData)) as Array<IKey>
          
            return lData
      }

      async getById(id: number): Promise<IKey> {
            const queryData = {
                  name: 'get-keys-x-id',
                  text: `SELECT * 
                         FROM tbl_llave k
                         WHERE id = $1 AND (estado IN ($2, $3)) 
                         ORDER BY id ASC`,
                  values: [id, 1, 0]
            }

            let lData: Array<IKey> = (await this.client.exeQuery(queryData)) as Array<IKey>

            return lData[0]
      }

      async insert(data: IKey, idUser: number): Promise<IKey> {
            const timeStampCurrent = UtilInstance.getDateCurrentForSQL()
            const queryData = {
                  name: 'insert-key',
                  text: `INSERT INTO tbl_llave(
                        ubicacion, 
                        tipo_tarjeta, 
                        idqr, 
                        qr, 
                        fecha_creacion, 
                        fecha_ultimo_cambio, 
                        idusuario)
                        VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
                  values: [   data.ubicacion, 
                              data.tipo_tarjeta, 
                              data.idqr, 
                              data.qr, 
                              timeStampCurrent, 
                              timeStampCurrent, 
                              idUser
                        ]
            }

            let lData: Array<IKey> = (await this.client.exeQuery(queryData)) as Array<IKey>

            return lData[0]
      }

      async update(id: number, data: IKey, idUser: number): Promise<IKey> {
            const timeStampCurrent = UtilInstance.getDateCurrentForSQL()
            const queryData = {
                  name: 'update-key',
                  text: `UPDATE tbl_llave SET
                        ubicacion = $1, 
                        tipo_tarjeta = $2, 
                        idqr = $3, 
                        qr = $4,
                        imagenqr = $5,
                        estado = $6,
                        observacion = $7,  
                        fecha_ultimo_cambio = $8, 
                        idusuario = $9
                        WHERE id = $10 RETURNING *`,
                  values: [   data.ubicacion, 
                              data.tipo_tarjeta, 
                              data.idqr, 
                              data.qr,
                              data.imagenqr, 
                              data.estado,
                              data.observacion, 
                              timeStampCurrent, 
                              idUser,
                              id
                        ]
            }

            let lData: Array<IKey> = (await this.client.exeQuery(queryData)) as Array<IKey>

            return lData[0]
      }

      async delete(id: number, idUser: number): Promise<IKey> {
            const timeStampCurrent = UtilInstance.getDateCurrentForSQL()
            const queryData = {
                  name: 'update-key',
                  text: `UPDATE tbl_llave SET
                        estado = $1,
                        fecha_ultimo_cambio = $2, 
                        idusuario = $3
                        WHERE id = $4 RETURNING *`,
                  values: [   -1, 
                              timeStampCurrent, 
                              idUser,
                              id
                        ]
            }

            let lData: Array<IKey> = (await this.client.exeQuery(queryData)) as Array<IKey>

            return lData[0]
      }

      async getLockXKey(id: number, status: number): Promise<Array<ILock>> {
            const queryData  = {
                  name: 'get-lock-x-key',
                  text: `SELECT d.id, d.codigo, d.nombre, m.mac, d.ubicacion 
                         FROM tbl_llave_x_manija llm
                         JOIN tbl_manija m ON (m.iddispositivo = llm.idmanija)
                         JOIN tbl_dispositivo d ON (d.id = m.iddispositivo)
                         WHERE llm.idllave = $1 AND d.estado >= $2 AND d.estado IS NOT NULL 
                         ORDER BY d.id ASC`,
                  values: [id, status]
            }
              
            let lData: Array<ILock> = (await this.client.exeQuery(queryData)) as Array<ILock>
          
            return lData
      }
}

export default KeyDataAccess