const API_URL = "https://script.google.com/macros/s/AKfycby3NxWcJZBdiej2WkZSEh2_gLTbaSN6xSM4zoqKFYRklxO5cuiq6JQ-QkNlNBws3sdb/exec";

async function loadLibrary() {
    const grid    = document.getElementById('books-grid');
    const loading = document.getElementById('loading-message');
    try {
        const response = await fetch(API_URL);
        const books    = await response.json();

        if (loading) loading.style.display = 'none';

        // ── Changed: 3 → 4 books per shelf ──────────────────────
        for (let i = 0; i < books.length; i += 4) {
            const groupData = books.slice(i, i + 4);
            // ────────────────────────────────────────────────────

            const groupDiv = document.createElement('div');
            groupDiv.className = 'book-group';

            groupData.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.className = 'book-item';

                const badge = document.createElement('div');
                badge.className = 'btn-reveal';
                badge.innerText = 'Conheça o ebook';

                const img = new Image();
                img.src = book.Capa;
                img.className = 'book-cover';
                img.onload = () => {
                    img.classList.add('img-loaded');
                    bookDiv.classList.add('loaded-state');
                };

                bookDiv.appendChild(badge);
                bookDiv.appendChild(img);
                bookDiv.onclick = () => {
                    const params = new URLSearchParams(book).toString();
                    window.location.href = `details.html?${params}`;
                };
                groupDiv.appendChild(bookDiv);
            });

            grid.appendChild(groupDiv);
        }
    } catch (e) {
        if (loading) loading.innerText = "Erro ao carregar materiais.";
    }
}

loadLibrary();
