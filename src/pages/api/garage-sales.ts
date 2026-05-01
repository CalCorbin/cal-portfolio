import type { NextApiRequest, NextApiResponse } from 'next';

const OKC_URL =
  'https://data.okc.gov/services/portal/api/data/records/Garage%20Sales';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recordID, ...bodyParams } = req.body ?? {};
  const url = new URL(OKC_URL);

  if (recordID !== undefined) url.searchParams.set('recordID', String(recordID));

  try {
    const upstream = await fetch(
      url.toString(),
      Object.keys(bodyParams).length > 0 ? {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyParams),
      } : undefined
    );
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch {
    res.status(502).json({ error: 'Failed to fetch garage sales data' });
  }
}
