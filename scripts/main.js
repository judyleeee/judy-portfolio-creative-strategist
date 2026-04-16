// ============================================
// Judy Lee Portfolio — Main Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
});

// ─── Render Projects ─────────────────────────

function renderProjects() {
  const container = document.getElementById('projects');
  if (!container || !window.projects) return;

  const visible = projects.filter(p => p.visible);

  if (visible.length === 0) {
    container.innerHTML = '<p style="padding:48px;color:var(--color-text-tertiary)">No projects yet.</p>';
    return;
  }

  visible.forEach(project => {
    const card = createProjectCard(project);
    container.appendChild(card);
  });
}

// ─── Create Project Card ─────────────────────

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';
  card.dataset.id = project.id;

  // 이미지 or 플레이스홀더
  const imageInner = project.image
    ? `<img
        class="project-card__image"
        src="${project.image}"
        alt="${project.title}"
        loading="lazy"
        onerror="this.parentElement.innerHTML='<div class=\\'project-card__placeholder\\'><span>Image coming soon</span></div>'"
       />`
    : `<div class="project-card__placeholder"><span>Image coming soon</span></div>`;

  const caseHref = project.caseStudyUrl ? `projects/${project.caseStudyUrl}` : null;
  const imageHTML = caseHref
    ? `<a class="project-card__image-link" href="${caseHref}" aria-label="View case study: ${project.title}">${imageInner}</a>`
    : imageInner;
  const titleHTML = caseHref
    ? `<a class="project-card__title-link" href="${caseHref}"><h2 class="project-card__title">${project.title}</h2></a>`
    : `<h2 class="project-card__title">${project.title}</h2>`;

  // 아코디언 항목: Role / Context / Timeline
  const accordionItems = [
    {
      id: `role-${project.id}`,
      label: 'Role',
      content: `<span class="accordion-value">${project.role}</span>`
    },
    {
      id: `context-${project.id}`,
      label: 'Context',
      content: `<span class="accordion-value">${project.context || '—'}</span>`
    },
    {
      id: `timeline-${project.id}`,
      label: 'Timeline',
      content: `<span class="accordion-value">${project.timeline || '—'}</span>`
    }
  ];

  // 아코디언 HTML 생성
  const accordionHTML = accordionItems.map(item => `
    <div class="accordion-row" data-target="${item.id}">
      <span class="accordion-label">${item.label}</span>
      <button class="plus-btn" aria-expanded="false" aria-label="Toggle ${item.label}">
        <span class="icon-plus">+</span>
        <span class="icon-minus">−</span>
      </button>
    </div>
    <div class="accordion-content" id="${item.id}">
      <div class="accordion-content-inner">
        ${item.content}
      </div>
    </div>
  `).join('');

  card.innerHTML = `
    <!-- Left: Project Info -->
    <div class="project-card__left">
      <span class="project-card__year">${project.year}</span>
      ${titleHTML}
      <p class="project-card__description">${project.description}</p>

      <div class="project-card__accordion">
        ${accordionHTML}
      </div>
    </div>

    <!-- Right: Image -->
    <div class="project-card__right">
      ${imageHTML}
    </div>
  `;

  // 아코디언 이벤트 — 다른 탭 클릭 시 이전 탭 자동 닫힘
  const rows = card.querySelectorAll('.accordion-row');
  rows.forEach(row => {
    row.addEventListener('click', () => {
      const targetId = row.dataset.target;
      const targetContent = document.getElementById(targetId);
      const targetBtn = row.querySelector('.plus-btn');
      const isCurrentlyOpen = targetContent.classList.contains('is-open');

      // 같은 카드 안의 모든 아코디언 닫기
      rows.forEach(otherRow => {
        const otherId = otherRow.dataset.target;
        const otherContent = document.getElementById(otherId);
        const otherBtn = otherRow.querySelector('.plus-btn');
        otherContent.classList.remove('is-open');
        otherBtn.classList.remove('is-open');
        otherBtn.setAttribute('aria-expanded', 'false');
      });

      // 클릭한 게 이미 열려있었으면 → 닫힌 채로 끝 (토글)
      // 닫혀있었으면 → 열기
      if (!isCurrentlyOpen) {
        targetContent.classList.add('is-open');
        targetBtn.classList.add('is-open');
        targetBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  return card;
}
