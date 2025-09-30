/** Favorites (Wishlist) using localStorage */
const FAVORITES_KEY = 'favorites:v1';

function readFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  } catch (_) {
    return [];
  }
}

function writeFavorites(favs) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  updateFavoritesCount();
}

function bookIdFromData({ title, author }) {
  return `${title}::${author}`;
}

function toggleFavorite(book) {
  const favs = readFavorites();
  const id = bookIdFromData(book);
  const exists = favs.find((b) => b.id === id);
  let next;
  if (exists) {
    next = favs.filter((b) => b.id !== id);
  } else {
    next = favs.concat({ ...book, id });
  }
  writeFavorites(next);
  return !exists;
}

function isFavorite(book) {
  const favs = readFavorites();
  const id = bookIdFromData(book);
  return favs.some((b) => b.id === id);
}

function renderFavoritesList(containerId = 'favoritesContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;
  const favs = readFavorites();
  if (favs.length === 0) {
    container.innerHTML = '<p class="white">No favorites yet. Add some from the home page!</p>';
    return;
  }
  container.innerHTML = favs
    .map((b) => {
      const cover = b.coverId
        ? `https://covers.openlibrary.org/b/id/${b.coverId}-M.jpg`
        : '/images/book-1.png';
      const href = `/book/${encodeURIComponent(b.title)}`;
      return `
      <div class="col-md-3 mb-4">
        <div class="card">
          <a class="link-underline-opacity-0" href="${href}">
            <img src="${cover}" class="card-img-top" alt="${b.title} cover">
          </a>
          <div class="card-body">
            <a class="link-underline-opacity-0" href="${href}">
              <h5 class="card-title white">${b.title}</h5>
            </a>
            <p class="card-text white">Author: ${b.author}</p>
          </div>
        </div>
      </div>`;
    })
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  // Bind favorite toggle buttons on cards
  document.querySelectorAll('.favorite-btn').forEach((btn) => {
    const title = btn.getAttribute('data-title');
    const author = btn.getAttribute('data-author') || 'Unknown Author';
    const coverId = btn.getAttribute('data-cover-id') || '';
    const book = { title, author, coverId };

    // Initialize icon state
    if (isFavorite(book)) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nowFav = toggleFavorite(book);
      btn.classList.toggle('active', nowFav);
    });
  });

  // If on favorites page, render
  renderFavoritesList();

  // Update header count on load
  updateFavoritesCount();
});

function updateFavoritesCount() {
  const countEl = document.getElementById('favoritesCount');
  if (!countEl) return;
  const favs = readFavorites();
  countEl.textContent = favs.length;
}
