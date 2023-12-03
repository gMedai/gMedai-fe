// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import Cookies from "cookies";
import axios from "axios";

type Data = {
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") return res.status(404).json({ message: "Method not supported" });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bodyData: req.body,
    }),
  };
  const response = await fetch(process.env.URL_SERVER_API + "/benhkhopgoi-loadmodel", options);
  const data = await response.json();
  const { message } = data;
  res.status(200).json({ message });
}
