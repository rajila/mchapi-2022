import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { IKey } from '@/pages/models/IKey'
import DataListInstance from '../../data/data'

const handler = nc(
      {
            onError: (err, req: NextApiRequest, res: NextApiResponse, next) => {
                  console.error(err.stack);
                  res.status(500).end("Something broke!");
            },
            onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
              res.status(404).end("Page is not found");
            }
      })
      //.use(cors())
      .get((req, res: NextApiResponse<IKey>) => {
            let dataDB: IKey = DataListInstance.getData(parseInt(req.query.id as string))
            if ( !dataDB ) {
                  res.status(404).end()
                  return
            }
            res.json(dataDB)
      })
      .patch((req: NextApiRequest, res: NextApiResponse<IKey>) => {
            const dataIndexDB = DataListInstance.getIndexData(parseInt(req.query.id as string))
            if ( dataIndexDB === -1 ) {
                  res.status(404).end()
                  return
            }
            res.json(DataListInstance.updateData({ ...req.body } as IKey, parseInt(req.query.id as string)))
      })
      .delete((req: NextApiRequest, res: NextApiResponse<IKey>) => {
            const dataIndexDB = DataListInstance.getIndexData(parseInt(req.query.id as string))
            if ( dataIndexDB === -1 ) {
                  res.status(404).end()
                  return
            }
            res.json(DataListInstance.deleteData(parseInt(req.query.id as string)))
      })

export default handler