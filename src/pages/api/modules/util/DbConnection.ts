import { Client, QueryConfig, types } from 'pg';
import UtilInstance from './Util';
import { IModel } from './IModel';

class DbConnection {
      // private _connectionString = 'postgres://postgres:hjWf32SZi2ihTPi@mchapp-2022-db.fly.dev:5432/mchdb'
      private _connectionString = 'postgres://atic:atic@localhost:5432/mchdb'
      private _connection: Client
      
      constructor() {
            // Cambiar el formato de tipo de bigint to int
            types.setTypeParser(types.builtins.INT8, UtilInstance.parseInteger)
            // No cambiar el formato de fecha guardado previamente
            types.setTypeParser(types.builtins.TIMESTAMP, UtilInstance.noParse)
            // Create conexion
            this._connection = new Client({
                  connectionString: this._connectionString
            })
      }

      async exeQuery(query: QueryConfig): Promise<Array<IModel>> {
            let data: Array<IModel> = []
            await (
                  this._connection
                  .connect()
                  .then(async () => {
                        await (     this._connection.query(query)
                                          .then(result => {
                                                // console.log(result)
                                                data = [ ...result.rows ]
                                          })
                                          .catch(err => console.log(err.stack))
                                          .then(() => {
                                                this._connection.end()
                                          })
                              )
                  })
                  .catch(err => console.log('Connection error!!'))
            )

            return data
      }
}

export default DbConnection