import './Header.css';

// Removed React import and converted to plain JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const header = document.createElement('header');
    header.className = 'header';

    const h1 = document.createElement('h1');
    h1.textContent = 'Medication Tracker';
    header.appendChild(h1);

    const p = document.createElement('p');
    p.className = 'typing-text';
    p.textContent = 'Never miss a dose!';
    header.appendChild(p);

    document.body.prepend(header);
});
