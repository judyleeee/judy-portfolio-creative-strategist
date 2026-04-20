// ============================================
// Language Toggle · Scroll Position Preservation
// EN ↔ KR 토글 시 스크롤 위치를 그대로 유지
// ============================================

(function () {
  const STORAGE_KEY = 'portfolio-lang-scroll';

  // 페이지 로드 시 · 이전에 저장된 스크롤 위치가 있으면 복원
  window.addEventListener('DOMContentLoaded', () => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved === null) return;

    const y = parseInt(saved, 10);
    sessionStorage.removeItem(STORAGE_KEY);

    if (!Number.isFinite(y) || y <= 0) return;

    // 브라우저 기본 anchor/히스토리 스크롤 복원 비활성화
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 즉시 스크롤 (다음 프레임에도 한 번 더 · layout shift 방지)
    window.scrollTo({ top: y, behavior: 'instant' });
    requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }));
  });

  // 언어 토글 클릭 시 · 현재 스크롤 위치를 저장
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav__lang-btn');
    if (!btn) return;
    // 활성 상태 토글(= 같은 언어 클릭)은 저장하지 않음
    if (btn.classList.contains('is-active')) return;
    sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
  });
})();
