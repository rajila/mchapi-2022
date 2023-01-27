import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import KeyBusiness from '@/pages/business/KeyBusiness'

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
      .get(async (req, res: NextApiResponse<IKey>) => {
            let el: KeyBusiness = new KeyBusiness()
            let dataDB: IKey = await el.getById(parseInt(req.query.id as string))
            if ( !dataDB ) {
                  res.status(404).end()
                  return
            }
            res.json(dataDB)
      })
      .patch(async (req: NextApiRequest, res: NextApiResponse<IKey>) => {
            let data: IKey = {
                  ubicacion: req.body.ubicacion,
                  tipo_tarjeta: req.body.tipo_tarjeta,
                  idqr: `M${req.body.idqr}`,
                  qr: req.body.qr,
                  imagenqr: req.body.imagenqr,
                  estado: req.body.estado,
                  observacion: req.body.observacion
            }
            let el: KeyBusiness = new KeyBusiness()
            let dataDB: IKey = await el.update(parseInt(req.query.id as string), data, 2)
            if ( !dataDB ) {
                  res.status(404).end()
                  return
            }
            res.json(dataDB)
      })
      .delete(async (req: NextApiRequest, res: NextApiResponse<IKey>) => {
            let el: KeyBusiness = new KeyBusiness()
            let dataDB: IKey = await el.delete(parseInt(req.query.id as string), 1)
            if ( !dataDB ) {
                  res.status(404).end()
                  return
            }
            res.json(dataDB)
      })

export default handler