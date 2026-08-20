export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing farm ID parameter." });
  }

  const apiKey = process.env.SFL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "SFL_API_KEY environment variable is not configured in Vercel." });
  }

  try {
    const response = await fetch(`https://api.sunflower-land.com/community/farms/${id}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        error: `Sunflower Land API Error (${response.status}): ${errorText || response.statusText}` 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to fetch farm data." });
  }
}
