document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('readable-font') === 'enabled') {
        document.body.style.fontFamily = 'Comic Sans MS, Comic Sans, cursive';
        document.body.style.letterSpacing = '0.12em';
        document.body.style.wordSpacing = '0.16em';
        document.body.style.lineHeight = '1.5';
    }

    const accessibilityBtn = document.getElementById('accessibilityBtn');
    const accessibilityMenu = document.getElementById('accessibilityMenu');
    const readingGuideLine = document.getElementById('reading-guide-line');
    
    let activeButtons = {
        contrast: document.getElementById('defaultContrastBtn'),
        textSize: document.getElementById('defaultTextBtn'),
        spacing: document.getElementById('defaultSpacingBtn')
    };
    
    function toggleMenu() {
        accessibilityMenu.classList.toggle('active');
        
        if (accessibilityMenu.classList.contains('active')) {
            if (document.body.classList.contains('high-contrast')) {
                document.getElementById('defaultContrastBtn').classList.remove('active');
                document.getElementById('highContrastBtn').classList.add('active');
                activeButtons.contrast = document.getElementById('highContrastBtn');
            } else if (document.body.classList.contains('yellow-black')) {
                document.getElementById('defaultContrastBtn').classList.remove('active');
                document.getElementById('yellowBlackBtn').classList.add('active');
                activeButtons.contrast = document.getElementById('yellowBlackBtn');
            } else if (document.body.classList.contains('black-yellow')) {
                document.getElementById('defaultContrastBtn').classList.remove('active');
                document.getElementById('blackYellowBtn').classList.add('active');
                activeButtons.contrast = document.getElementById('blackYellowBtn');
            } else {
                document.getElementById('defaultContrastBtn').classList.add('active');
                activeButtons.contrast = document.getElementById('defaultContrastBtn');
            }
            
            // text size button
            if (document.body.classList.contains('large-text')) {
                document.getElementById('defaultTextBtn').classList.remove('active');
                document.getElementById('largeTextBtn').classList.add('active');
                activeButtons.textSize = document.getElementById('largeTextBtn');
            } else if (document.body.classList.contains('larger-text')) {
                document.getElementById('defaultTextBtn').classList.remove('active');
                document.getElementById('largerTextBtn').classList.add('active');
                activeButtons.textSize = document.getElementById('largerTextBtn');
            } else if (document.body.classList.contains('largest-text')) {
                document.getElementById('defaultTextBtn').classList.remove('active');
                document.getElementById('largestTextBtn').classList.add('active');
                activeButtons.textSize = document.getElementById('largestTextBtn');
            } else {
                document.getElementById('defaultTextBtn').classList.add('active');
                activeButtons.textSize = document.getElementById('defaultTextBtn');
            }
            
            // spacing button
            if (document.body.classList.contains('increased-spacing')) {
                document.getElementById('defaultSpacingBtn').classList.remove('active');
                document.getElementById('increasedSpacingBtn').classList.add('active');
                activeButtons.spacing = document.getElementById('increasedSpacingBtn');
            } else if (document.body.classList.contains('wider-spacing')) {
                document.getElementById('defaultSpacingBtn').classList.remove('active');
                document.getElementById('widerSpacingBtn').classList.add('active');
                activeButtons.spacing = document.getElementById('widerSpacingBtn');
            } else {
                document.getElementById('defaultSpacingBtn').classList.add('active');
                activeButtons.spacing = document.getElementById('defaultSpacingBtn');
            }
            
            // toggle buttons
            if (document.body.classList.contains('highlight-links')) {
                document.getElementById('highlightLinksBtn').classList.add('active');
            }
            if (document.body.classList.contains('highlight-titles')) {
                document.getElementById('highlightTitlesBtn').classList.add('active');
            }
            if (localStorage.getItem('readable-font') === 'enabled') {
                document.getElementById('readableFontBtn').classList.add('active');
            }
            if (document.body.classList.contains('reading-guide')) {
                document.getElementById('readingGuideBtn').classList.add('active');
            }
        }
    }
    
    function toggleActiveButton(category, newActiveButton) {
        if (activeButtons[category]) {
            activeButtons[category].classList.remove('active');
        }
        newActiveButton.classList.add('active');
        activeButtons[category] = newActiveButton;
    }
    
    function toggleClass(element, className) {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
            document.body.classList.remove(className);
            // Save to localStorage
            localStorage.removeItem(className);
        } else {
            element.classList.add('active');
            document.body.classList.add(className);
            // Save to localStorage
            localStorage.setItem(className, 'enabled');
        }
    }
    
    // accessibility menu
    accessibilityBtn.addEventListener('click', toggleMenu);
    
    // color contrast buttons
    document.getElementById('defaultContrastBtn').addEventListener('click', function() {
        document.body.classList.remove('high-contrast', 'yellow-black', 'black-yellow');
        toggleActiveButton('contrast', this);
        localStorage.removeItem('contrast');
    });
    
    document.getElementById('highContrastBtn').addEventListener('click', function() {
        document.body.classList.remove('yellow-black', 'black-yellow');
        document.body.classList.add('high-contrast');
        toggleActiveButton('contrast', this);
        localStorage.setItem('contrast', 'high-contrast');
    });
    
    document.getElementById('yellowBlackBtn').addEventListener('click', function() {
        document.body.classList.remove('high-contrast', 'black-yellow');
        document.body.classList.add('yellow-black');
        toggleActiveButton('contrast', this);
        localStorage.setItem('contrast', 'yellow-black');
    });
    
    document.getElementById('blackYellowBtn').addEventListener('click', function() {
        document.body.classList.remove('high-contrast', 'yellow-black');
        document.body.classList.add('black-yellow');
        toggleActiveButton('contrast', this);
        localStorage.setItem('contrast', 'black-yellow');
    });
    
    // text size buttons
    document.getElementById('defaultTextBtn').addEventListener('click', function() {
        document.body.classList.remove('large-text', 'larger-text', 'largest-text');
        toggleActiveButton('textSize', this);
        localStorage.removeItem('textSize');
    });
    
    document.getElementById('largeTextBtn').addEventListener('click', function() {
        document.body.classList.remove('larger-text', 'largest-text');
        document.body.classList.add('large-text');
        toggleActiveButton('textSize', this);
        localStorage.setItem('textSize', 'large-text');
    });
    
    document.getElementById('largerTextBtn').addEventListener('click', function() {
        document.body.classList.remove('large-text', 'largest-text');
        document.body.classList.add('larger-text');
        toggleActiveButton('textSize', this);
        localStorage.setItem('textSize', 'larger-text');
    });
    
    document.getElementById('largestTextBtn').addEventListener('click', function() {
        document.body.classList.remove('large-text', 'larger-text');
        document.body.classList.add('largest-text');
        toggleActiveButton('textSize', this);
        localStorage.setItem('textSize', 'largest-text');
    });
    
    // text spacing buttons
    document.getElementById('defaultSpacingBtn').addEventListener('click', function() {
        document.body.classList.remove('increased-spacing', 'wider-spacing');
        toggleActiveButton('spacing', this);
        localStorage.removeItem('spacing');
    });
    
    document.getElementById('increasedSpacingBtn').addEventListener('click', function() {
        document.body.classList.remove('wider-spacing');
        document.body.classList.add('increased-spacing');
        toggleActiveButton('spacing', this);
        localStorage.setItem('spacing', 'increased-spacing');
    });
    
    document.getElementById('widerSpacingBtn').addEventListener('click', function() {
        document.body.classList.remove('increased-spacing');
        document.body.classList.add('wider-spacing');
        toggleActiveButton('spacing', this);
        localStorage.setItem('spacing', 'wider-spacing');
    });
    
    // reading aids buttons (toggle buttons)
    document.getElementById('highlightLinksBtn').addEventListener('click', function() {
        toggleClass(this, 'highlight-links');
    });
    
    document.getElementById('highlightTitlesBtn').addEventListener('click', function() {
        toggleClass(this, 'highlight-titles');
    });
    
    // font prietenos pentru cei cu dislexie
    document.getElementById('readableFontBtn').addEventListener('click', function() {
        toggleClass(this, 'readable-font');
        if (document.body.classList.contains('readable-font')) {
            document.body.style.fontFamily = 'Comic Sans MS, Comic Sans, cursive';
            document.body.style.letterSpacing = '0.12em';
            document.body.style.wordSpacing = '0.16em';
            document.body.style.lineHeight = '1.5';
            localStorage.setItem('readable-font', 'enabled');
        } else {
            document.body.style.fontFamily = '';
            document.body.style.letterSpacing = '';
            document.body.style.wordSpacing = '';
            document.body.style.lineHeight = '';
            localStorage.removeItem('readable-font');
        }
    });
    
    let readingGuideActive = false;
    document.getElementById('readingGuideBtn').addEventListener('click', function() {
        this.classList.toggle('active');
        readingGuideActive = !readingGuideActive;
        
        if (readingGuideActive) {
            readingGuideLine.style.display = 'block';
            document.addEventListener('mousemove', moveReadingGuide);
            localStorage.setItem('readingGuide', 'enabled');
        } else {
            readingGuideLine.style.display = 'none';
            document.removeEventListener('mousemove', moveReadingGuide);
            localStorage.removeItem('readingGuide');
        }
    });
    
    // Reading guide movement
    function moveReadingGuide(e) {
        readingGuideLine.style.top = (e.clientY - 15) + 'px';
    }
    
    // butonul de resetare a tuturor setarilor
    document.getElementById('resetBtn').addEventListener('click', function() {
        document.body.className = '';
        
        const allButtons = document.querySelectorAll('.option-btn');
        allButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        document.getElementById('defaultContrastBtn').classList.add('active');
        document.getElementById('defaultTextBtn').classList.add('active');
        document.getElementById('defaultSpacingBtn').classList.add('active');
        
        // reset reading guide
        readingGuideLine.style.display = 'none';
        document.removeEventListener('mousemove', moveReadingGuide);
        readingGuideActive = false;
        
        // reset activeButtons object
        activeButtons = {
            contrast: document.getElementById('defaultContrastBtn'),
            textSize: document.getElementById('defaultTextBtn'),
            spacing: document.getElementById('defaultSpacingBtn')
        };
        
        // reset la font styles
        document.body.style.fontFamily = '';
        document.body.style.letterSpacing = '';
        document.body.style.wordSpacing = '';
        document.body.style.lineHeight = '';
        
        // clear localStorage
        localStorage.removeItem('contrast');
        localStorage.removeItem('textSize');
        localStorage.removeItem('spacing');
        localStorage.removeItem('highlight-links');
        localStorage.removeItem('readable-font');
        localStorage.removeItem('highlight-titles');
        localStorage.removeItem('readingGuide');
    });
    
    // sa se inchida meniul atunci cand apas in afara
    document.addEventListener('click', function(event) {
        if (!accessibilityMenu.contains(event.target) && 
            event.target !== accessibilityBtn &&
            !accessibilityBtn.contains(event.target)) {
            accessibilityMenu.classList.remove('active');
        }
    });
    
    // sa se incarce setarile salvate
    function loadSavedSettings() {
        const savedContrast = localStorage.getItem('contrast');
        if (savedContrast) {
            document.body.classList.add(savedContrast);
            document.getElementById('defaultContrastBtn').classList.remove('active');
            const contrastBtn = document.getElementById(savedContrast + 'Btn') || 
                               document.getElementById(savedContrast.replace('-', '') + 'Btn');
            if (contrastBtn) {
                contrastBtn.classList.add('active');
                activeButtons.contrast = contrastBtn;
            }
        }
        
        const savedTextSize = localStorage.getItem('textSize');
        if (savedTextSize) {
            document.body.classList.add(savedTextSize);
            document.getElementById('defaultTextBtn').classList.remove('active');
            const textSizeBtn = document.getElementById(savedTextSize.replace('-', '') + 'Btn');
            if (textSizeBtn) {
                textSizeBtn.classList.add('active');
                activeButtons.textSize = textSizeBtn;
            }
        }
        
        const savedSpacing = localStorage.getItem('spacing');
        if (savedSpacing) {
            document.body.classList.add(savedSpacing);
            document.getElementById('defaultSpacingBtn').classList.remove('active');
            const spacingBtn = document.getElementById(savedSpacing.replace('-', '') + 'Btn');
            if (spacingBtn) {
                spacingBtn.classList.add('active');
                activeButtons.spacing = spacingBtn;
            }
        }
        
        const toggleSettings = ['highlight-links', 'highlight-titles', 'readable-font'];
        toggleSettings.forEach(setting => {
            if (localStorage.getItem(setting) === 'enabled') {
                document.body.classList.add(setting);
                const btn = document.getElementById(setting.replace('-', '') + 'Btn');
                if (btn) {
                    btn.classList.add('active');
                    if (setting === 'readable-font') {
                        document.body.style.fontFamily = 'Comic Sans MS, Comic Sans, cursive';
                        document.body.style.letterSpacing = '0.12em';
                        document.body.style.wordSpacing = '0.16em';
                        document.body.style.lineHeight = '1.5';
                    }
                }
            }
        });
        
        if (localStorage.getItem('readingGuide') === 'enabled') {
            readingGuideActive = true;
            readingGuideLine.style.display = 'block';
            document.addEventListener('mousemove', moveReadingGuide);
            document.getElementById('readingGuideBtn').classList.add('active');
        }
    }
    
    loadSavedSettings();
}); 

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(tabName) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        document.getElementById('tab-' + tabName).classList.add('active');
        document.getElementById('content-' + tabName).classList.add('active');
    }

    // default tab
    showTab('options');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.id.replace('tab-', '');
            showTab(tab);
        });
    });
}); 

// === CHATBOT ===
function createChatbotModal(prefillText) {
    const overlay = document.getElementById('chatbot-modal-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        const input = overlay.querySelector('#chatbot-input');
        if (input) {
            if (prefillText) input.value = prefillText;
            setTimeout(()=>input.focus(), 100);
        }
        return;
    }
    
    const newOverlay = document.createElement('div');
    newOverlay.id = 'chatbot-modal-overlay';
    newOverlay.style.position = 'fixed';
    newOverlay.style.top = '0';
    newOverlay.style.left = '0';
    newOverlay.style.width = '100vw';
    newOverlay.style.height = '100vh';
    newOverlay.style.background = 'rgba(32, 80, 179, 0.75)'; // albastru semitransparent
    newOverlay.style.display = 'flex';
    newOverlay.style.alignItems = 'center';
    newOverlay.style.justifyContent = 'center';
    newOverlay.style.zIndex = '3000';

    const modal = document.createElement('div');
    modal.id = 'chatbot-modal';
    modal.style.background = '#fff';
    modal.style.borderRadius = '18px';
    modal.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)';
    modal.style.maxWidth = '700px';
    modal.style.width = '90vw';
    modal.style.maxHeight = '80vh';
    modal.style.height = '80vh';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.position = 'relative';
    modal.style.overflow = 'hidden';

    // buton inchidere
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '16px';
    closeBtn.style.right = '24px';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '2em';
    closeBtn.style.color = '#2050b3';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.transition = 'color 0.2s';
    closeBtn.addEventListener('mouseenter',()=>closeBtn.style.color='#f44336');
    closeBtn.addEventListener('mouseleave',()=>closeBtn.style.color='#2050b3');
    closeBtn.onclick = function() {
        newOverlay.style.display = 'none';
    };
    modal.appendChild(closeBtn);

    // header
    const header = document.createElement('div');
    header.style.padding = '24px 0 12px 0';
    header.style.textAlign = 'center';
    header.style.fontWeight = 'bold';
    header.style.fontSize = '1.5em';
    header.style.color = '#2050b3';
    header.innerText = 'Chatbot';
    modal.appendChild(header);

    // zona mesaje
    const messages = document.createElement('div');
    messages.id = 'chatbot-messages';
    messages.style.flex = '1';
    messages.style.overflowY = 'auto';
    messages.style.padding = '0 24px 12px 24px';
    messages.style.background = '#f8f9fa';
    messages.style.borderRadius = '8px';
    messages.style.marginBottom = '12px';
    modal.appendChild(messages);

    // zona input
    const inputArea = document.createElement('div');
    inputArea.style.display = 'flex';
    inputArea.style.padding = '16px 24px 24px 24px';
    inputArea.style.background = '#fff';
    inputArea.style.borderTop = '1px solid #e0e0e0';

    let isRomanian = /[ăâîșțĂÂÎȘȚ]/.test(document.body.innerText);
    let btnText = isRomanian ? 'Trimite' : 'Send';
    let placeholderText = isRomanian ? 'Scrie un mesaj...' : 'Type a message...';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'chatbot-input';
    input.placeholder = placeholderText;
    input.style.flex = '1';
    input.style.padding = '10px 14px';
    input.style.fontSize = '1em';
    input.style.border = '1px solid #2050b3';
    input.style.borderRadius = '6px';
    input.style.marginRight = '12px';
    input.style.outline = 'none';
    if (prefillText) {
        input.value = prefillText;
    }

    const sendBtn = document.createElement('button');
    sendBtn.innerText = btnText;
    sendBtn.style.background = '#2050b3';
    sendBtn.style.color = '#fff';
    sendBtn.style.border = 'none';
    sendBtn.style.borderRadius = '6px';
    sendBtn.style.padding = '10px 18px';
    sendBtn.style.fontWeight = 'bold';
    sendBtn.style.fontSize = '1em';
    sendBtn.style.cursor = 'pointer';
    sendBtn.style.transition = 'background 0.2s';
    sendBtn.addEventListener('mouseenter',()=>sendBtn.style.background='#357ae8');
    sendBtn.addEventListener('mouseleave',()=>sendBtn.style.background='#2050b3');

    inputArea.appendChild(input);
    inputArea.appendChild(sendBtn);
    modal.appendChild(inputArea);

    newOverlay.appendChild(modal);
    document.body.appendChild(newOverlay);

    setTimeout(()=>input.focus(), 100);

    newOverlay.addEventListener('click', function(e) {
        if (e.target === newOverlay) newOverlay.style.display = 'none';
    });

    // trimitere mesaj cu enter/click
    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        addMessage('user', text);
        input.value = '';
        const loadingId = 'chatbot-loading-' + Date.now();
        addLoadingMessage(loadingId);
        // trimitere la backend
        fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        })
        .then(async r => {
            if (!r.ok) {
                const err = await r.json().catch(() => ({}));
                throw new Error(err.error || 'Eroare la server');
            }
            return r.json();
        })
        .then(data => {
            replaceLoadingMessage(loadingId, data.reply || '(Fără răspuns)');
        })
        .catch(err => {
            replaceLoadingMessage(loadingId, 'Eroare: ' + err.message);
        });
    }

    function addLoadingMessage(id) {
        const msg = document.createElement('div');
        msg.className = 'chatbot-msg chatbot-msg-bot chatbot-loading';
        msg.id = id;
        msg.innerHTML = '<span class="chatbot-dots"><span>.</span><span>.</span><span>.</span></span>';
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }
    // inlocuim "..." cu raspunsul real
    function replaceLoadingMessage(id, text) {
        const msg = document.getElementById(id);
        if (msg) {
            msg.classList.remove('chatbot-loading');
            msg.innerText = text;
        }
    }

    // pentru a adauga mesaje in chat
    function addMessage(role, text) {
        const msg = document.createElement('div');
        msg.className = 'chatbot-msg chatbot-msg-' + role;
        msg.innerText = text;
        msg.style.margin = '10px 0';
        msg.style.padding = '10px 16px';
        msg.style.borderRadius = '8px';
        msg.style.maxWidth = '80%';
        msg.style.wordBreak = 'break-word';
        if (role === 'user') {
            msg.style.background = '#2050b3';
            msg.style.color = '#fff';
            msg.style.alignSelf = 'flex-end';
            msg.style.marginLeft = '20%';
        } else {
            msg.style.background = '#e9f0ff';
            msg.style.color = '#222';
            msg.style.alignSelf = 'flex-start';
            msg.style.marginRight = '20%';
        }
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    sendBtn.onclick = sendMessage;
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
}

const chatbotBtn = document.getElementById('startChatBtn');
if (chatbotBtn) {
    chatbotBtn.addEventListener('click', function() { createChatbotModal(); });
} 

// === BUTON CONTEXTUAL PENTRU SELECTIE ===
(function() {
    let selectionBtn = null;
    let selectionTimeout = null;
    let lastSelectedText = '';

    function removeSelectionBtn() {
        if (selectionBtn) {
            selectionBtn.remove();
            selectionBtn = null;
        }
    }

    function showSelectionBtn(rect) {
        removeSelectionBtn();
        selectionBtn = document.createElement('button');
        selectionBtn.className = 'selection-chatbot-btn';
        let isRomanian = /[ăâîșțĂÂÎȘȚ]/.test(document.body.innerText);
        selectionBtn.title = (typeof isRomanian !== 'undefined' && !isRomanian)
            ? 'Ask the chatbot about the selected text'
            : 'Întreabă chatbotul despre textul selectat';
        selectionBtn.innerHTML = '<span class="selection-chatbot-icon"></span>';
        selectionBtn.style.position = 'absolute';
        selectionBtn.style.zIndex = '4000';
        selectionBtn.style.top = (window.scrollY + rect.bottom + 5) + 'px';
        selectionBtn.style.left = (window.scrollX + rect.right + 5) + 'px';
        selectionBtn.style.padding = '6px';
        selectionBtn.style.borderRadius = '50%';
        selectionBtn.style.background = '#90caf9'; 
        selectionBtn.style.border = 'none';
        selectionBtn.style.boxShadow = '0 2px 8px rgba(32,80,179,0.15)';
        selectionBtn.style.cursor = 'pointer';
        selectionBtn.style.display = 'flex';
        selectionBtn.style.alignItems = 'center';
        selectionBtn.style.justifyContent = 'center';
        selectionBtn.style.width = '36px';
        selectionBtn.style.height = '36px';
        selectionBtn.style.color = '#fff';
        selectionBtn.style.fontSize = '1.2em';
        selectionBtn.style.transition = 'background 0.2s';
        selectionBtn.onmouseenter = function() { selectionBtn.style.background = '#b6e0fe'; };
        selectionBtn.onmouseleave = function() { selectionBtn.style.background = '#90caf9'; };

        document.body.appendChild(selectionBtn);

        selectionBtn.onclick = function(e) {
            e.stopPropagation();
            if (typeof createChatbotModal === 'function') {
                createChatbotModal(lastSelectedText);
            }
            removeSelectionBtn();
        };
    }

    document.addEventListener('selectionchange', function() {
        clearTimeout(selectionTimeout);
        removeSelectionBtn();
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !sel.toString().trim()) {
            lastSelectedText = '';
            return;
        }
        lastSelectedText = sel.toString().trim();
        // sa dureze un pic inainte sa apara butonul
        selectionTimeout = setTimeout(function() {
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) return;
            showSelectionBtn(rect);
        }, 1200);
    });

    // ascunde butonul daca dai click in alta parte
    document.addEventListener('mousedown', function(e) {
        if (selectionBtn && !selectionBtn.contains(e.target)) {
            removeSelectionBtn();
        }
    });
    // ascunde la scroll/resize
    window.addEventListener('scroll', removeSelectionBtn);
    window.addEventListener('resize', removeSelectionBtn);
})(); 