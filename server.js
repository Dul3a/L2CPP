const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Chatbot route
app.post('/api/chatbot', async (req, res) => {
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
                    { role: 'system', content: 'Ești un asistent AI prietenos și util, expert mai ales în limbajul de programare C++. Răspunde pe scurt și clar.' },
                    { role: 'user', content: message }
                ]
            })
        });
        const data = await response.json();
        const reply = data.choices && data.choices[0]?.message?.content
            ? data.choices[0].message.content.trim()
            : '';
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: `Eroare: ${error.message}` });
    }
});

// Sumarizator route
app.post('/api/summarize', async (req, res) => {
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

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: 'API key nu este configurată' });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4.1-nano-2025-04-14',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            return res.status(response.status).json({ error: `API error: ${response.status} - ${errorData}` });
        }

        const data = await response.json();
        const summary = data.choices && data.choices[0]?.message?.content
            ? data.choices[0].message.content.trim()
            : '';

        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: `Eroare: ${error.message}` });
    }
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server pornit pe http://localhost:${PORT}`));
