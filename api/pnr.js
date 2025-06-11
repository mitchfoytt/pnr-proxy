export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://www.pnrexpert.com/api/v1/pnr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxYTc4ZTE3LTU1MTQtNGRhZi1hNDVlLTc0MGFhNDU0YTk4ZCIsImlhdCI6MTc0OTYwMDg4OX0.7lI97dtpiBJqN9eHm3BTZCFFDahOOJvOEjqXCflBZiE`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}

export const config = {
  api: {
    bodyParser: true
  }
};
