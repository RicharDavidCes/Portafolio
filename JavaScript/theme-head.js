// js/theme-head.js
(function () {
    // Lee la preferencia guardada o usa 'dark' por defecto
    const savedTheme = localStorage.getItem('pref-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();