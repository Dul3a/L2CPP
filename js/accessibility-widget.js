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