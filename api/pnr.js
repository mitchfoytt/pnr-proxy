export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://traveltailor.sandbox-pnrexpert.com/api/v1/pnr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM1OTE5NjViLWI0N2QtNDM1MC1iNGNiLTdjODYyNTRmNDg1YiIsImlhdCI6MTc0NjQ4MjEwMH0.HGIbM8jp_uzA8vCBKvUXSPyTSbL-UTA_4k7rSG8gmzA' // 🔁 Replace with your token (temporarily)
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}
