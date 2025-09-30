/** Client-side Load More for subject sections */
const SUBJECT_LIMIT = 8;
const subjectCache = new Map(); // key: `${subject}:${offset}` -> Array items

function createBookCard(b) {
  const cover = b.cover_id
    ? `https://covers.openlibrary.org/b/id/${b.cover_id}-M.jpg`
    : '/images/book-1.png';
  const href = `/book/${encodeURIComponent(b.title)}`;
  return `
    <div class="col-md-3 mb-4">
      <div class="card position-relative">
        <a class="link-underline-opacity-0" href="${href}">
          <img src="${cover}" class="card-img-top" alt="${b.title} cover">
        </a>
        <div class="card-body">
          <a class="link-underline-opacity-0" href="${href}">
            <h5 class="card-title white">${b.title}</h5>
          </a>
          <p class="card-text white">Author: ${b.authors_name || ''}</p>
        </div>
      </div>
    </div>`;
}

async function loadMoreForSection(sectionId, subject) {
  const container = document.querySelector(`#${sectionId} .row`);
  const btn = document.querySelector(`#${sectionId} .load-more-btn`);
  const loaded = parseInt(btn.getAttribute('data-loaded') || '0', 10);

  const key = `${subject}:${loaded}`;
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...';

  let items = subjectCache.get(key);
  let total = null;
  if (!items) {
    const res = await fetch(
      `/api/subject/${encodeURIComponent(subject)}?offset=${loaded}&limit=${SUBJECT_LIMIT}`
    );
    if (!res.ok) {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
      return;
    }
    const data = await res.json();
    items = data.items || [];
    total = data.total || 0;
    subjectCache.set(key, items);
    if (total) btn.setAttribute('data-total', String(total));
  }

  const html = items.map(createBookCard).join('');
  container.insertAdjacentHTML('beforeend', html);

  const nextLoaded = loaded + items.length;
  btn.setAttribute('data-loaded', nextLoaded.toString());
  const totalCount = parseInt(btn.getAttribute('data-total') || '0', 10);
  if (totalCount && nextLoaded >= totalCount) {
    btn.style.display = 'none';
  }

  btn.disabled = false;
  btn.innerHTML = originalHtml;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-load-more]').forEach((btn) => {
    const sectionId = btn.getAttribute('data-section');
    const subject = btn.getAttribute('data-subject');
    btn.addEventListener('click', () => loadMoreForSection(sectionId, subject));
  });
});
