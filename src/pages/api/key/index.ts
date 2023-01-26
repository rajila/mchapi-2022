import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
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
      .get((req, res: NextApiResponse<Array<IKey>>) => {
            res.json(DataListInstance.ldata)
      })
      .post((req, res: NextApiResponse<IKey>) => {
            let data: IKey = {
                  id: DataListInstance.getLength() + 1,
                  ubicacion: req.body.ubicacion,
                  tipo_tarjeta: req.body.tipo_tarjeta,
                  idqr: `M${req.body.idqr}`,
                  qr: req.body.qr
            }
            DataListInstance.addData(data)
            res.json(data)
      })

export default handler