// api/summarize.js
export default async function handler(req, res) {
    // Debug: verifică variabila de mediu
    console.log('=== DEBUG START ===');
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
    console.log('API Key starts with:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 10) + '...' : 'NOT FOUND');
    
    // Permite doar cereri POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metoda nu este permisă' });
    }

    try {
        const { text } = req.body;
        console.log('Text received:', text ? text.substring(0, 50) + '...' : 'NO TEXT');
        
        if (!process.env.OPENAI_API_KEY) {
            console.error('OPENAI_API_KEY nu este setată');
            return res.status(500).json({ error: 'API key nu este configurată' });
        }
        
        console.log('Making request to OpenAI...');
        
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
        
        console.log('OpenAI response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('OpenAI API error:', response.status, errorData);
            return res.status(response.status).json({ error: `OpenAI API error: ${response.status} - ${errorData}` });
        }
        
        const data = await response.json();
        console.log('OpenAI response data:', data);
        
        res.json({ summary: data.choices[0].message.content });
    } catch (error) {
        console.error('Eroare completă:', error);
        res.status(500).json({ error: `Eroare: ${error.message}` });
    }
}
