import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import KeyBusiness from '@/pages/api/modules/business/KeyBusiness'
//import cors from 'cors'

import { ILock } from '@/pages/api/modules/models/ILock'

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
            res.json( await el.getLockXKey(parseInt(req.query.id as string)) )
      })

export default handler