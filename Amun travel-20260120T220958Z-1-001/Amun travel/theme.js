document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.className = `${savedTheme}-theme`;

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            body.className = `${theme}-theme`;
            localStorage.setItem('theme', theme);
            
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });

        if (button.dataset.theme === savedTheme) {
            button.classList.add('active');
        }
    });
}); 