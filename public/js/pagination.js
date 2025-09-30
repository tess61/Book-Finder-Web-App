/** Client-side Load More for subject sections */
const SUBJECT_LIMIT = 8;

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

  const res = await fetch(
    `/api/subject/${encodeURIComponent(subject)}?offset=${loaded}&limit=${SUBJECT_LIMIT}`
  );
  if (!res.ok) return;
  const data = await res.json();
  const html = (data.items || []).map(createBookCard).join('');
  container.insertAdjacentHTML('beforeend', html);

  const nextLoaded = loaded + (data.items || []).length;
  btn.setAttribute('data-loaded', nextLoaded.toString());
  if (nextLoaded >= (data.total || 0)) {
    btn.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-load-more]').forEach((btn) => {
    const sectionId = btn.getAttribute('data-section');
    const subject = btn.getAttribute('data-subject');
    btn.addEventListener('click', () => loadMoreForSection(sectionId, subject));
  });
});
