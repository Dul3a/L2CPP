export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metoda nu este permisă' });
    }

    const { message } = req.body;
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Mesaj invalid' });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY nu este configurată' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4.1-nano-2025-04-14',
                messages: [
                    { role: 'system', content: 'Ești un asistent AI prietenos și util, expert mai ales în limbajul de programare C++. Răspunde pe scurt și clar,numai la întrebări legate de C++.' },
                    { role: 'user', content: message }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            return res.status(response.status).json({ error: `API error: ${response.status} - ${errorData}` });
        }

        const data = await response.json();
        const reply = data.choices && data.choices[0]?.message?.content
            ? data.choices[0].message.content.trim()
            : '';

        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: `Eroare: ${error.message}` });
    }
} 