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
    // Verifică dacă există deja modalul și îl elimină
    const existingModal = document.getElementById('summary-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Creează overlay-ul
    const overlay = document.createElement('div');
    overlay.id = 'summary-modal-overlay';
    overlay.className = 'summary-modal-overlay';

    // Creează conținutul modalului
    const modal = document.createElement('div');
    modal.className = 'summary-modal-content';

    // Buton de închidere
    const closeButton = document.createElement('button');
    closeButton.className = 'summary-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.title = 'Închide';
    closeButton.onclick = function() {
        overlay.remove();
    };

    // Titlu și rezumat
    const title = document.createElement('h3');
    title.textContent = 'Rezumat generat';
    const summaryText = document.createElement('p');
    summaryText.textContent = summary;

    // Adaugă elementele în modal
    modal.appendChild(closeButton);
    modal.appendChild(title);
    modal.appendChild(summaryText);

    // Adaugă modalul în overlay
    overlay.appendChild(modal);

    // Adaugă overlay-ul în body
    document.body.appendChild(overlay);
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
