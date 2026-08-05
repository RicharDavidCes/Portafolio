// js/theme.js
document.addEventListener('DOMContentLoaded', () => {
    // SINCRONIZACIÓN Y EVENTO DEL TEMA (MODO CLARO / OSCURO)
    const themeCheckbox = document.getElementById('checkbox');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

    if (themeCheckbox) {
        // Sincroniza el checkbox con el tema actual
        themeCheckbox.checked = (currentTheme === 'light');

        // Escucha el cambio del checkbox
        themeCheckbox.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('pref-theme', newTheme);
        });
    }
});