import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import KeyBusiness from '@/api/business/KeyBusiness'
//import cors from 'cors'

import { ILock } from '@/api/models/ILock'

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
      .get(async (req, res: NextApiResponse<Array<ILock>>) => {
            let el: KeyBusiness = new KeyBusiness()
            let dataDB: Array<ILock> = await el.getLockXKey(parseInt(req.query.id as string))
            if ( !dataDB || dataDB.length === 0 ) {
                  res.status(404).end()
                  return
            }
            res.json( dataDB )
      })

export default handler