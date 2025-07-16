// Funcția pentru generarea rezumatului
async function generateSummary(text) {
    try {
        const response = await fetch('/api/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Server error:', errorData);
            throw new Error(`Server error: ${response.status} - ${errorData}`);
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        return data.summary;
    } catch (error) {
        console.error('Eroare completă:', error);
        return `Eroare: ${error.message}`;
    }
}

// Funcția pentru extragerea textului din pagină
function extractPageText() {
    // Extrage textul din elementele principale ale paginii
    const contentElements = document.querySelectorAll('h1, h2, h3, p, li');
    let text = '';
    
    contentElements.forEach(element => {
        if (element.textContent.trim()) {
            text += element.textContent.trim() + ' ';
        }
    });
    
    return text.trim();
}

// Funcția pentru afișarea rezumatului
function displaySummary(summary) {
    // Creează un element pentru afișarea rezumatului
    const summaryContainer = document.getElementById('summary-result');
    if (!summaryContainer) {
        // Dacă nu există, creează-l
        const newContainer = document.createElement('div');
        newContainer.id = 'summary-result';
        newContainer.className = 'summary-result';
        newContainer.innerHTML = `
            <h4>Rezumat generat:</h4>
            <p>${summary}</p>
        `;
        
        // Adaugă-l după buton
        const button = document.getElementById('generateSummaryBtn');
        button.parentNode.appendChild(newContainer);
    } else {
        summaryContainer.innerHTML = `
            <h4>Rezumat generat:</h4>
            <p>${summary}</p>
        `;
    }
}

// Adaugă event listener pentru butonul "Rezumat"
document.addEventListener('DOMContentLoaded', function() {
    const summaryBtn = document.getElementById('generateSummaryBtn');
    if (summaryBtn) {
        summaryBtn.addEventListener('click', async function() {
            // Schimbă textul butonului pentru a arăta că se procesează
            this.textContent = 'Se generează...';
            this.disabled = true;
            
            try {
                const pageText = extractPageText();
                const summary = await generateSummary(pageText);
                displaySummary(summary);
            } catch (error) {
                console.error('Eroare:', error);
                displaySummary('Eroare la generarea rezumatului. Te rog să încerci din nou.');
            } finally {
                // Restorează butonul
                this.textContent = 'Rezumat';
                this.disabled = false;
            }
        });
    }
});
