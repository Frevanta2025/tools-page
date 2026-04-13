/**
 * Mireflecta Tools - main application logic
 * Pure Vanilla JavaScript implementation
 */

const toolsData = [
    {
        id: 'markdown-merger',
        name: 'Markdown Merger',
        url: 'https://md.mireflecta.com',
        supportedLangs: ['EN'],
        descKey: 'desc-markdown-merger'
    },
    {
        id: 'file-structurer',
        name: 'File Structurer',
        url: 'https://fs.mireflecta.com',
        supportedLangs: ['EN'],
        descKey: 'desc-file-structurer'
    },
    {
        id: 'folder-maker',
        name: 'Folder Maker',
        url: 'https://folders.mireflecta.com',
        supportedLangs: ['EN', 'FR', 'RU', 'DE'],
        descKey: 'desc-folder-maker'
    }
];

const translations = {
    en: {
        'page-title': 'Mireflecta Tools',
        'page-subtitle': 'Simple tools to structure your files, notes, and workflows.',
        'label-language': 'Language',
        'label-theme': 'Theme',
        'opt-system': 'System',
        'opt-light': 'Light',
        'opt-dark': 'Dark',
        'btn-open': 'Open tool',
        'label-languages': 'Supported languages',
        'status-available': 'Available now',
        'footer-note': 'Local-first tools for structured digital work.',
        'desc-markdown-merger': 'Merge multiple markdown files into one structured document.',
        'desc-file-structurer': 'Turn messy files into clean, structured batches.',
        'desc-folder-maker': 'Create ready-to-use folder structures in seconds.'
    },
    fr: {
        'page-title': 'Outils Mireflecta',
        'page-subtitle': 'Des outils simples pour structurer vos fichiers, notes et flux de travail.',
        'label-language': 'Langue',
        'label-theme': 'Thème',
        'opt-system': 'Système',
        'opt-light': 'Clair',
        'opt-dark': 'Sombre',
        'btn-open': 'Ouvrir l\'outil',
        'label-languages': 'Langues supportées',
        'status-available': 'Disponible dès maintenant',
        'footer-note': 'Outils locaux pour un travail numérique structuré.',
        'desc-markdown-merger': 'Fusionnez plusieurs fichiers markdown en un seul document structuré.',
        'desc-file-structurer': 'Transformez des fichiers en désordre en lots propres et structurés.',
        'desc-folder-maker': 'Créez des structures de dossiers prêtes à l\'emploi en quelques secondes.'
    },
    ru: {
        'page-title': 'Инструменты Mireflecta',
        'page-subtitle': 'Простые инструменты для структурирования ваших файлов, заметок и рабочих процессов.',
        'label-language': 'Язык',
        'label-theme': 'Тема',
        'opt-system': 'Системная',
        'opt-light': 'Светлая',
        'opt-dark': 'Темная',
        'btn-open': 'Открыть инструмент',
        'label-languages': 'Поддерживаемые языки',
        'status-available': 'Доступно сейчас',
        'footer-note': 'Локальные инструменты для структурированной цифровой работы.',
        'desc-markdown-merger': 'Объединяйте несколько markdown-файлов в один структурированный документ.',
        'desc-file-structurer': 'Превращайте беспорядочные файлы в чистые, структурированные пакеты.',
        'desc-folder-maker': 'Создавайте готовые к использованию структуры папок за считанные секунды.'
    },
    de: {
        'page-title': 'Mireflecta Tools',
        'page-subtitle': 'Einfache Werkzeuge zur Strukturierung Ihrer Dateien, Notizen und Arbeitsabläufe.',
        'label-language': 'Sprache',
        'label-theme': 'Design',
        'opt-system': 'System',
        'opt-light': 'Hell',
        'opt-dark': 'Dunkel',
        'btn-open': 'Tool öffnen',
        'label-languages': 'Unterstützte Sprachen',
        'status-available': 'Jetzt verfügbar',
        'footer-note': 'Lokale Werkzeuge für strukturierte digitale Arbeit.',
        'desc-markdown-merger': 'Mehrere Markdown-Dateien in einem strukturierten Dokument zusammenführen.',
        'desc-file-structurer': 'Unordentliche Dateien in saubere, strukturierte Stapel verwandeln.',
        'desc-folder-maker': 'Gebrauchsfertige Ordnerstrukturen in Sekundenschnelle erstellen.'
    }
};

// State management
let currentLang = localStorage.getItem('mireflecta-lang') || 'en';
let currentTheme = localStorage.getItem('mireflecta-theme') || 'system';

// DOM Elements
const langSelect = document.getElementById('lang-select');
const themeSelect = document.getElementById('theme-select');
const toolsContainer = document.getElementById('tools-grid');

/**
 * Initialize the application
 */
function init() {
    // Set initial values in selects
    langSelect.value = currentLang;
    themeSelect.value = currentTheme;

    // Apply theme and language
    applyTheme(currentTheme);
    updateUIContent();
    renderTools();

    // Event listeners
    langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('mireflecta-lang', currentLang);
        updateUIContent();
        renderTools();
    });

    themeSelect.addEventListener('change', (e) => {
        currentTheme = e.target.value;
        localStorage.setItem('mireflecta-theme', currentTheme);
        applyTheme(currentTheme);
    });

    // Listen for system theme changes if set to system
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (currentTheme === 'system') {
            applyTheme('system');
        }
    });
}

/**
 * Apply the selected theme to the body
 * @param {string} theme - 'light', 'dark', or 'system'
 */
function applyTheme(theme) {
    if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
        document.body.setAttribute('data-theme', theme);
    }
}

/**
 * Update all translatable elements on the page
 */
function updateUIContent() {
    const lang = translations[currentLang];
    
    // Update static elements
    document.getElementById('page-title').textContent = lang['page-title'];
    document.getElementById('page-subtitle').textContent = lang['page-subtitle'];
    document.getElementById('footer-note').textContent = lang['footer-note'];
    
    // Update dropdown labels (SR-only)
    document.getElementById('label-language').textContent = lang['label-language'];
    document.getElementById('label-theme').textContent = lang['label-theme'];
    
    // Update dropdown options
    document.getElementById('opt-system').textContent = lang['opt-system'];
    document.getElementById('opt-light').textContent = lang['opt-light'];
    document.getElementById('opt-dark').textContent = lang['opt-dark'];

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

/**
 * Render tool cards dynamically
 */
function renderTools() {
    const lang = translations[currentLang];
    toolsContainer.innerHTML = '';

    toolsData.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        
        const description = lang[tool.descKey];
        const langBadges = tool.supportedLangs.map(l => `<span class="badge">${l}</span>`).join('');

        card.innerHTML = `
            <h2 class="tool-name">${tool.name}</h2>
            <p class="tool-desc">${description}</p>
            
            <div class="tool-meta">
                <span class="meta-label">${lang['label-languages']}</span>
                <div class="lang-badges">${langBadges}</div>
            </div>
            
            <div class="status-line">
                ${lang['status-available']}
            </div>
            
            <a href="${tool.url}" class="btn-open" target="_blank" rel="noopener noreferrer">
                ${lang['btn-open']}
            </a>
        `;
        
        toolsContainer.appendChild(card);
    });
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
