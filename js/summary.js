// Functia pentru generarea rezumatului
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

// Functie pentru a detecta limba paginii
function getPageLang() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('eng.html') || path.includes('class9.html') || path.includes('class10.html')) {
        return 'en';
    }
    return 'ro';
}

// Functia pentru extragerea textului din pagina
function extractPageText() {
    const contentElements = document.querySelectorAll('h1, h2, h3, p, li');
    let text = '';
    
    contentElements.forEach(element => {
        if (element.textContent.trim()) {
            text += element.textContent.trim() + ' ';
        }
    });
    
    return text.trim();
}

// Functia pentru afisarea rezumatului
function displaySummary(summary) {
    const existingModal = document.getElementById('summary-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    const lang = getPageLang();
    const titleText = lang === 'en' ? 'Generated summary' : 'Rezumat generat';

    // Creeaza overlay-ul
    const overlay = document.createElement('div');
    overlay.id = 'summary-modal-overlay';
    overlay.className = 'summary-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'summary-modal-content';

    // Buton de inchidere
    const closeButton = document.createElement('button');
    closeButton.className = 'summary-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.title = lang === 'en' ? 'Close' : 'Închide';
    closeButton.onclick = function() {
        overlay.remove();
    };

    // Titlu si rezumat
    const title = document.createElement('h3');
    title.textContent = titleText;
    const summaryText = document.createElement('p');
    summaryText.textContent = summary;

    modal.appendChild(closeButton);
    modal.appendChild(title);
    modal.appendChild(summaryText);

    overlay.appendChild(modal);

    document.body.appendChild(overlay);
}

document.addEventListener('DOMContentLoaded', function() {
    const summaryBtn = document.getElementById('generateSummaryBtn');
    if (summaryBtn) {
        summaryBtn.addEventListener('click', async function() {
            const lang = getPageLang();
            // Aici schimb textul butonului pentru a arata ca se genereaza
            this.textContent = lang === 'en' ? 'Generating...' : 'Se generează...';
            this.disabled = true;
            
            try {
                const pageText = extractPageText().slice(0, 2000);
                if (!pageText.trim()) {
                    displaySummary(lang === 'en' ? 'No content found to summarize.' : 'Nu a fost găsit conținut de rezumat.');
                    return;
                }
                const summary = await generateSummary(pageText);
                displaySummary(summary);
            } catch (error) {
                console.error('Eroare:', error);
                displaySummary(lang === 'en' ? 'Error generating summary. Please try again.' : 'Eroare la generarea rezumatului. Te rog să încerci din nou.');
            } finally {
                this.textContent = lang === 'en' ? 'Summary' : 'Rezumat';
                this.disabled = false;
            }
        });
    }
});
