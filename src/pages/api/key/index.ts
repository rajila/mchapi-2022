import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import KeyBusiness from '@/pages/business/KeyBusiness'
//import cors from 'cors'

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
      .get(async (req, res: NextApiResponse<Array<IKey>>) => {
            let el: KeyBusiness = new KeyBusiness()
            res.json(await el.get())
      })
      .post(async (req, res: NextApiResponse<IKey>) => {
            let data: IKey = {
                  ubicacion: req.body.ubicacion,
                  tipo_tarjeta: req.body.tipo_tarjeta,
                  idqr: `M${req.body.idqr}`,
                  qr: req.body.qr
            }
            let el: KeyBusiness = new KeyBusiness()
            let dataDB: IKey = await el.insert(data, 1)
            if ( !dataDB ) {
                  res.status(404).end()
                  return
            }
            res.json(dataDB)
      })

export default handler