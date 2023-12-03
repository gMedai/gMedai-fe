// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import Cookies from "cookies";
import axios from "axios";

type Data = {
  result1?: string,
  image1?: string,
  infor?: any,
  message?:string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") return res.status(404).json({ message: "Method not supported" });
  const { image, datainfor } = req.body;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: image,
      datainfor: datainfor
    })
  };
  const response = await fetch(process.env.url_SERVER_API + '/benhnao-uploadfile', options);
  const data = await response.json();
  const { result1, image1, infor} = data;
  res.status(200).json({
    result1, image1, infor
  });

}
