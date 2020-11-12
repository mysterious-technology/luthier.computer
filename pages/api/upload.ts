import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Uploads data to a signed S3 URL.
 * (Should really do this client-side and avoid the roundtrip, but I got stumped by S3 CORS settings...)
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('api/upload');
  if (req.method !== 'POST') {
    return res.status(500);
  }
  const params = JSON.parse(req.body);

  const uploadUrl = params.uploadUrl;
  const payload = params.payload;

  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: JSON.stringify(payload, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.status(response.status).json({});
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
