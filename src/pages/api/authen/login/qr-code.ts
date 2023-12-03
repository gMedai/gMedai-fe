// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

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

  return new Promise(() => {
    const cookies = new Cookies(req, res);
    const connectionId = cookies.get('connectionId');
    req.headers.cookie = '';

    proxy.web(req, res, {
      target: process.env.URL_SERVER_API,
      changeOrigin: true,
      selfHandleResponse: true,
    });

    proxy.once('proxyReq', function (proxyReq, req, res, options) {
      let bodyData = JSON.stringify({
        connectionId: connectionId,
      });

      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // Stream the content
      proxyReq.write(bodyData);
    });

    const handlerLoginWithQRCodeResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';

      proxyRes.on('data', (chunk) => {
        body += chunk;
      });

      proxyRes.on('end', () => {
        if (body) {
          const { accessToken, message } = JSON.parse(body);
          cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60000 * 60 * 24 * 365,
          });
          (res as NextApiResponse).status(200).json({ message });
        } else {
          (res as NextApiResponse).status(201).end();
        }
      });
    };

    proxy.once('proxyRes', handlerLoginWithQRCodeResponse);
  });
}
