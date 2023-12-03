// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';
import { resolve } from 'path';

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(404).json({ message: 'Method not supported' });

  return new Promise((resolve) => {
    const cookies = new Cookies(req, res);

    const accessToken = cookies.get('accessToken');
    req.headers.authorization = `Bearer ${accessToken}`;
    req.headers.cookie = '';

    cookies.set('accessToken');

    proxy.web(req, res, {
      target: process.env.URL_SERVER_API,
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.once('proxyRes', () => {
      resolve(true);
    });
  });
}
