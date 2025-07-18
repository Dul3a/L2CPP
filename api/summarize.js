// api/summarize.js
export default async function handler(req, res) {
    console.log('=== DEBUG START ===');
    console.log('Hugging Face API Key exists:', !!process.env.MISTRAL_API_KEY);
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metoda nu este permisă' });
    }

    // Aceasta functie este pentru a detecta limba, ca sa stim ce prompt dam AI-ului
    function detectLang(text) {
        if (/[ăâîșțĂÂÎȘȚ]/.test(text)) return 'ro';
        return 'en';
    }

    try {
        const { text } = req.body;
        const lang = detectLang(text);
        let prompt;
        if (lang === 'ro') {
            prompt = `Rezumă următorul text în limba română, într-un stil clar și concis. Doresc doar conținutul rezumatului,
            care să fie unul cât se poate de scurt, dar care să conțină elementele cheie ale textului primit:\n"""\n${text}\n"""`;
        } else {
            prompt = `Summarize the following text in English, in a clear and concise style. I only want the content of the summary,
            which should be as short as possible, but which should contain the key elements of the text received:\n"""\n${text}\n"""`;
        }
        console.log('Text received:', text ? text.substring(0, 50) + '...' : 'NO TEXT');
        
        if (!process.env.MISTRAL_API_KEY) {
            console.error('MISTRAL_API_KEY nu este setată');
            return res.status(500).json({ error: 'API key nu este configurată' });
        }
        
        console.log('Making request to OpenRouter...');
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'google/gemma-3-4b-it:free',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });
        
        console.log('OpenRouter response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('OpenRouter API error:', response.status, errorData);
            return res.status(response.status).json({ error: `API error: ${response.status} - ${errorData}` });
        }
        
        const data = await response.json();
        // Extrage raspunsul generat de model
        const summary = data.choices && data.choices[0]?.message?.content
            ? data.choices[0].message.content.trim()
            : '';

        res.json({ summary });
    } catch (error) {
        console.error('Eroare completă:', error);
        res.status(500).json({ error: `Eroare: ${error.message}` });
    }
}
