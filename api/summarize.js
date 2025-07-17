// api/summarize.js
export default async function handler(req, res) {
    console.log('=== DEBUG START ===');
    console.log('Hugging Face API Key exists:', !!process.env.HUGGINGFACE_API_KEY);
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metoda nu este permisă' });
    }

    // O funcție simplă pentru a detecta limba (poți folosi și o librărie mai avansată dacă vrei)
    function detectLang(text) {
        // Dacă textul conține diacritice românești, presupunem că e română
        if (/[ăâîșțĂÂÎȘȚ]/.test(text)) return 'ro';
        // Dacă are multe cuvinte englezești, poți adăuga logică suplimentară
        return 'en';
    }

    try {
        const { text } = req.body;
        const lang = detectLang(text);
        let prompt;
        if (lang === 'ro') {
            prompt = `Rezumă următorul text în limba română, într-un stil clar și concis:\n"""\n${text}\n"""`;
        } else {
            prompt = `Summarize the following text in English, in a clear and concise style:\n"""\n${text}\n"""`;
        }
        console.log('Text received:', text ? text.substring(0, 50) + '...' : 'NO TEXT');
        
        if (!process.env.HUGGINGFACE_API_KEY) {
            console.error('HUGGINGFACE_API_KEY nu este setată');
            return res.status(500).json({ error: 'API key nu este configurată' });
        }
        
        console.log('Making request to Hugging Face...');
        
        const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Magistral-Small-2506', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: 256,
                    temperature: 0.7,
                    top_p: 0.95,
                    do_sample: false
                }
            })
        });
        
        console.log('Hugging Face response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Hugging Face API error:', response.status, errorData);
            return res.status(response.status).json({ error: `API error: ${response.status} - ${errorData}` });
        }
        
        const data = await response.json();
        const summary = Array.isArray(data) && data[0]?.generated_text
            ? data[0].generated_text.replace(prompt, '').trim()
            : (data.generated_text || '').replace(prompt, '').trim();

        res.json({ summary });
    } catch (error) {
        console.error('Eroare completă:', error);
        res.status(500).json({ error: `Eroare: ${error.message}` });
    }
}
