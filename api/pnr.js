export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Block all but POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // DEBUG: log incoming request body
  console.log('Received PNR body:', req.body);

  try {
    const response = await fetch('https://www.pnrexpert.com/api/v1/pnr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM1OTE5NjViLWI0N2QtNDM1MC1iNGNiLTdjODYyNTRmNDg1YiIsImlhdCI6MTc0NjQ4MjEwMH0.HGIbM8jp_uzA8vCBKvUXSPyTSbL-UTA_4k7rSG8gmzA` // ← stored in Vercel env
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // DEBUG: log API response
    console.log('API Response:', data);

    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}
