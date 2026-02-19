export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, system } = req.body;

  try {
    const upstream = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          max_tokens: 2000,
          messages: [
            { role: 'system', content: system },
            ...messages
          ]
        })
      }
    );

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: JSON.stringify(data) });
    }

    const text = data.choices?.[0]?.message?.content || '{}';
    res.status(200).json({ content: [{ text }] });

  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ error: err.message });
  }
}


