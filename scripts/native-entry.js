/**
 * Capacitor-only helpers. Bundled into www/js/native.js and injected
 * only in the Android shell — the GitHub Pages site does not load this.
 */
import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { Browser } from '@capacitor/browser';

if (!Capacitor.isNativePlatform()) {
  // no-op in a browser preview of www/
} else {
  // Light glyphs on the dark store UI.
  SystemBars.setStyle({ style: SystemBarsStyle.Dark }).catch(() => {});

  App.addListener('backButton', ({ canGoBack }) => {
    const sheet = document.getElementById('sheet');
    if (sheet && !sheet.hidden) {
      sheet.hidden = true;
      sheet.innerHTML = '';
      return;
    }
    const h = (location.hash || '').replace(/^#\/?/, '');
    if (h) {
      if (canGoBack || window.history.length > 1) window.history.back();
      else location.hash = '#/';
      return;
    }
    App.exitApp();
  });

  document.addEventListener('click', (e) => {
    const a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
    try {
      const u = new URL(href, location.href);
      if (u.origin !== location.origin && /^https?:$/.test(u.protocol)) {
        e.preventDefault();
        Browser.open({ url: u.href });
      }
    } catch (_) { /* ignore invalid hrefs */ }
  });

  const hideSplash = () => { SplashScreen.hide().catch(() => {}); };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideSplash);
  } else {
    hideSplash();
  }
}
