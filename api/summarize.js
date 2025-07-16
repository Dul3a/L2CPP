// api/summarize.js
export default async function handler(req, res) {
    // Permite doar cereri POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metoda nu este permisă' });
    }

    try {
        const { text } = req.body;
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that summarizes text concisely in Romanian.' },
                    { role: 'user', content: `Te rog să rezumi următorul text:\n\n${text}` }
                ],
                max_tokens: 200
            })
        });
        
        const data = await response.json();
        res.json({ summary: data.choices[0].message.content });
    } catch (error) {
        console.error('Eroare:', error);
        res.status(500).json({ error: 'Eroare la generarea rezumatului' });
    }
}
