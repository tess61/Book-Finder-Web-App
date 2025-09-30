/** Simple debounced suggestions for the search input */
const SUGGEST_MIN = 2;
const DEBOUNCE_MS = 200;
let suggestTimer;

function createSuggestDropdown() {
  let el = document.getElementById('suggestDropdown');
  if (!el) {
    el = document.createElement('div');
    el.id = 'suggestDropdown';
    el.className = 'suggest-dropdown';
    document.body.appendChild(el);
  }
  return el;
}

function positionDropdown(input, dropdown) {
  const rect = input.getBoundingClientRect();
  dropdown.style.position = 'absolute';
  dropdown.style.left = `${rect.left + window.scrollX}px`;
  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.width = `${rect.width}px`;
}

async function fetchSuggestions(q) {
  const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.suggestions || [];
}

function renderSuggestions(list, input, dropdown) {
  if (!list.length) {
    dropdown.innerHTML = '';
    dropdown.style.display = 'none';
    return;
  }
  dropdown.innerHTML = list
    .map(
      (s) => `
      <div class="suggest-item" data-title="${s.title}">
        <div class="suggest-title">${s.title}</div>
        <div class="suggest-sub">${s.author || ''}</div>
      </div>`
    )
    .join('');
  positionDropdown(input, dropdown);
  dropdown.style.display = 'block';

  dropdown.querySelectorAll('.suggest-item').forEach((item) => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title');
      input.value = title;
      dropdown.style.display = 'none';
      input.form?.submit();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('form[role="search"] input[name="q"]');
  if (!input) return;
  const dropdown = createSuggestDropdown();

  input.addEventListener('input', () => {
    const value = input.value.trim();
    clearTimeout(suggestTimer);
    if (value.length < SUGGEST_MIN) {
      dropdown.style.display = 'none';
      return;
    }
    suggestTimer = setTimeout(async () => {
      const list = await fetchSuggestions(value);
      renderSuggestions(list, input, dropdown);
    }, DEBOUNCE_MS);
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== input) {
      dropdown.style.display = 'none';
    }
  });
});
