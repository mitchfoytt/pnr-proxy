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
    const response = await fetch('https://traveltailor.sandbox-pnrexpert.com/api/v1/pnr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PNR_API_KEY}` // ← stored in Vercel env
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
