const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  });
});

const searchInput = document.getElementById('articleSearch');
const chapters = [...document.querySelectorAll('.chapter')];
const noResults = document.getElementById('noResults');

function normalizeText(value) {
  return value
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

searchInput?.addEventListener('input', () => {
  const query = normalizeText(searchInput.value.trim());
  let visibleCount = 0;

  chapters.forEach((chapter) => {
    const searchable = normalizeText(chapter.innerText + ' ' +
      [...chapter.querySelectorAll('[data-search]')]
        .map((article) => article.dataset.search || '')
        .join(' '));
    const matches = !query || searchable.includes(query);
    chapter.hidden = !matches;
    if (matches) {
      visibleCount += 1;
      if (query) chapter.open = true;
    }
  });

  noResults.hidden = visibleCount !== 0;
});

const expandAll = document.getElementById('expandAll');
expandAll?.addEventListener('click', () => {
  const visibleChapters = chapters.filter((chapter) => !chapter.hidden);
  const shouldOpen = visibleChapters.some((chapter) => !chapter.open);
  visibleChapters.forEach((chapter) => { chapter.open = shouldOpen; });
  expandAll.textContent = shouldOpen ? 'Recolher todos' : 'Expandir todos';
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
