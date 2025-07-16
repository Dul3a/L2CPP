// api/summarize.js
export default async function handler(req, res) {
    console.log('=== DEBUG START ===');
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metoda nu este permisă' });
    }

    try {
        const { text } = req.body;
        console.log('Text received:', text ? text.substring(0, 50) + '...' : 'NO TEXT');
        
        console.log('Making request to Hugging Face...');
        
        const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: text
            })
        });
        
        console.log('Hugging Face response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Hugging Face API error:', response.status, errorData);
            return res.status(response.status).json({ error: `API error: ${response.status} - ${errorData}` });
        }
        
        const data = await response.json();
        console.log('Hugging Face response data:', JSON.stringify(data, null, 2));
        
        // Hugging Face returnează un array cu rezumatul
        const summary = Array.isArray(data) ? data[0].summary_text : data.summary_text;
        console.log('Summary generated:', summary);
        
        res.json({ summary });
    } catch (error) {
        console.error('Eroare completă:', error);
        res.status(500).json({ error: `Eroare: ${error.message}` });
    }
}
