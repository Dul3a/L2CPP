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
    function detectLang(text, pagePath) {
        if (pagePath && /eng\.html$/i.test(pagePath)) return 'en';
        if (/[ăâîșțĂÂÎȘȚ]/.test(text)) return 'ro';
        return 'en';
    }

    try {
        const { text, pagePath } = req.body;
        const lang = detectLang(text, pagePath);
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

// Quiz generator route
app.post('/api/quiz', async (req, res) => {
    function detectLang(text) {
        if (/[ăâîșțĂÂÎȘȚ]/.test(text)) return 'ro';
        return 'en';
    }
    try {
        const { message, lang: langFromClient } = req.body;
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Subiect invalid' });
        }
        let lang;
        if (langFromClient) {
            lang = langFromClient;
        } else {
            lang = detectLang(message);
        }
        let prompt;
        if (lang === 'ro') {
            prompt = `Generează un test de maximum 10 întrebări despre următorul subiect, doar dacă acesta are legătură cu limbajul de programare C++. Dacă nu are legătură, genereaza un mesaj în care spui că nu poți genera altceva în afara de ceva legat de C++. Subiectul este: ${message}. Dacă inputul primit este valid, pentru fiecare întrebare, oferă doar 3 variante de răspuns (A, B, C) și marchează răspunsul corect. Returnează structurat ca JSON, de forma: [ { "question": "...", "options": ["A ...", "B ...", "C ..."], "correct": "A" }, ... ]. Nu adăuga explicații suplimentare, doar JSON-ul.`;
        } else {
            prompt = `Generate a quiz with up to 10 questions about the following topic, only if it is related to the C++ programming language. If it is not related, reply with a message saying you can only generate quizzes about C++. The topic is: ${message}. If the input is valid, for each question, provide only 3 answer options (A, B, C) and mark the correct answer. Return the result as JSON, in the format: [ { "question": "...", "options": ["A ...", "B ...", "C ..."], "correct": "A" }, ... ]. Do not add any explanations, only the JSON.`;
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
        const reply = data.choices && data.choices[0]?.message?.content
            ? data.choices[0].message.content.trim()
            : '';
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: `Eroare: ${error.message}` });
    }
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server pornit pe http://localhost:${PORT}`));
