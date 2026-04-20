// ============================================
// Language Toggle · Scroll Position Preservation
// EN ↔ KR 토글 시 "대략 같은 섹션"으로 이동
// 섹션 인덱스 기반 (언어 무관) + 픽셀 기반 fallback
// ============================================

(function () {
  const STORAGE_KEY = 'portfolio-lang-scroll';
  const NAV_OFFSET = 80; // sticky nav 높이만큼 보정

  // 현재 페이지에서 섹션으로 간주할 요소들
  function getSections() {
    // 1순위 · 케이스스터디 · .cs-body 안의 section
    let sections = document.querySelectorAll('.cs-body > section');
    if (sections.length) return sections;

    // 2순위 · index 페이지의 project card
    sections = document.querySelectorAll('#projects .project-card');
    if (sections.length) return sections;

    // 3순위 · about 페이지의 block
    sections = document.querySelectorAll('.about-page > *, .personal-section');
    if (sections.length) return sections;

    return [];
  }

  // 현재 viewport 상단에 보이는 섹션 인덱스 계산
  function getCurrentSectionIndex() {
    const sections = getSections();
    if (!sections.length) return null;

    const triggerLine = window.scrollY + 120; // 뷰포트 상단 120px 아래 기준
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].getBoundingClientRect().top + window.scrollY;
      if (top <= triggerLine) idx = i;
      else break;
    }
    return idx;
  }

  // 섹션 인덱스를 기준으로 해당 위치로 스크롤
  function scrollToSection(idx) {
    const sections = getSections();
    if (!sections.length || idx == null || idx < 0 || idx >= sections.length) return false;

    const target = sections[idx];
    const absoluteTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, absoluteTop - NAV_OFFSET), behavior: 'instant' });
    return true;
  }

  // 페이지 로드 시 · 저장된 위치 복원
  window.addEventListener('DOMContentLoaded', () => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return;
    sessionStorage.removeItem(STORAGE_KEY);

    // 브라우저 자동 스크롤 복원 비활성화 (우리가 직접 처리)
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      return;
    }

    // 레이아웃 안정화 후 스크롤 (두 프레임 기다림 · 이미지/폰트 반영)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (data && data.type === 'section' && typeof data.idx === 'number') {
          const ok = scrollToSection(data.idx);
          // 섹션 기반 실패 시 픽셀 fallback
          if (!ok && typeof data.fallbackY === 'number') {
            window.scrollTo({ top: data.fallbackY, behavior: 'instant' });
          }
        } else if (data && data.type === 'pixel' && typeof data.y === 'number') {
          window.scrollTo({ top: data.y, behavior: 'instant' });
        }
      });
    });
  });

  // 언어 토글 클릭 시 · 현재 위치 저장
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav__lang-btn');
    if (!btn) return;
    if (btn.classList.contains('is-active')) return;

    const sections = getSections();
    let data;
    if (sections.length) {
      data = {
        type: 'section',
        idx: getCurrentSectionIndex(),
        fallbackY: window.scrollY // 섹션 못 찾을 때 대비
      };
    } else {
      data = { type: 'pixel', y: window.scrollY };
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
})();
