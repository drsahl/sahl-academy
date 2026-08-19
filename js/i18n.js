/**
 * SAHL.ie Internationalization Engine
 * Supports: English (en), Arabic (ar), Ukrainian (uk), Russian (ru), Somali (so), French (fr)
 * RTL support for Arabic. No cookies — uses sessionStorage.
 */

(function() {
  'use strict';

  const SahlI18n = {
    currentLang: 'en',
    translations: {},
    rtlLangs: ['ar'],
    availableLangs: [
      { code: 'en', name: 'English', dir: 'ltr' },
      { code: 'ar', name: 'العربية', dir: 'rtl' },
      { code: 'uk', name: 'Українська', dir: 'ltr' },
      { code: 'ru', name: 'Русский', dir: 'ltr' },
      { code: 'so', name: 'Soomaali', dir: 'ltr' },
      { code: 'fr', name: 'Français', dir: 'ltr' }
    ],

    async init() {
      // Restore saved language
      const saved = sessionStorage.getItem('sahl-lang');
      if (saved) this.currentLang = saved;

      // Load translations
      try {
        const res = await fetch(`js/translations/${this.currentLang}.json`);
        this.translations = await res.json();
        this.apply();
        this.updateDirection(this.currentLang);
        this.buildSelector();
      } catch (e) {
        console.error('i18n load failed:', e);
      }
    },

    async setLang(code) {
      if (code === this.currentLang) return;
      this.currentLang = code;
      sessionStorage.setItem('sahl-lang', code);
      try {
        const res = await fetch(`js/translations/${code}.json`);
        this.translations = await res.json();
        this.apply();
        this.updateDirection(code);
      } catch (e) {
        console.error('i18n switch failed:', e);
      }
    },

    apply() {
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = this.getNestedValue(this.translations, key);
        if (text !== undefined) {
          // Handle arrays (like lists)
          if (Array.isArray(text)) {
            const tag = el.tagName.toLowerCase();
            if (tag === 'ul' || tag === 'ol') {
              el.innerHTML = text.map(item => `<li>${item}</li>`).join('');
            } else {
              el.innerHTML = text.join('<br>');
            }
          } else {
            el.innerHTML = text;
          }
        }
      });

      // Update page title if available
      if (this.translations._meta && this.translations._meta.title) {
        document.title = this.translations._meta.title;
      }
    },

    getNestedValue(obj, path) {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    },

    updateDirection(code) {
      const isRtl = this.rtlLangs.includes(code);
      document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
      document.body.style.direction = isRtl ? 'rtl' : 'ltr';
      
      // Adjust CSS for RTL
      if (isRtl) {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    },

    buildSelector() {
      const existing = document.querySelector('.lang-selector');
      if (existing) existing.remove();

      const header = document.querySelector('.header-inner');
      if (!header) return;

      const select = document.createElement('select');
      select.className = 'lang-selector';
      select.setAttribute('aria-label', 'Select language');
      select.onchange = (e) => this.setLang(e.target.value);

      this.availableLangs.forEach(lang => {
        const opt = document.createElement('option');
        opt.value = lang.code;
        opt.textContent = lang.name;
        if (lang.code === this.currentLang) opt.selected = true;
        select.appendChild(opt);
      });

      // Insert after nav
      const nav = header.querySelector('nav');
      if (nav) {
        nav.appendChild(select);
      } else {
        header.appendChild(select);
      }
    }
  };

  window.SahlI18n = SahlI18n;
  document.addEventListener('DOMContentLoaded', () => SahlI18n.init());
})();
