import type { NextApiRequest, NextApiResponse } from 'next'
import {predict} from "./AIModel";

type Data = {
  name: string
}

type ReqData = {
  img: any // image type
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // predict value from model
  const pred : string = predict(req.body.img)
  setTimeout(() => {
    res.status(200).json({ name: pred })

  }, 10000)
}