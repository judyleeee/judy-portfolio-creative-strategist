// ============================================
// Scroll Reveal · 섹션별 Fade-in + Slide (subtle)
// ============================================

(function () {
  // 모션 축소 선호 사용자는 애니메이션 스킵
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 등장 애니메이션 대상 셀렉터
  const SELECTORS = [
    // 케이스 스터디 구조
    '.cs-header',
    '.cs-impact',
    '.cs-meta',
    '.cs-hero-image',
    '.cs-body > section',
    '.cs-pagination',
    // 인덱스 · 랜딩
    '.hero',
    '.impact-strip',
    '.project-card',
    // 어바웃
    '.about__left',
    '.about__right',
    '.personal-section'
  ];

  // CSS 주입 (모든 페이지 공통 · 한 번만)
  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.7s cubic-bezier(0.2, 0.6, 0.2, 1),
                  transform 0.7s cubic-bezier(0.2, 0.6, 0.2, 1);
      will-change: opacity, transform;
    }
    .reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
      will-change: auto;
    }
  `;
  document.head.appendChild(style);

  // IntersectionObserver로 viewport 진입 감지
  function init() {
    // IntersectionObserver 미지원 환경은 즉시 표시 (fallback)
    if (!('IntersectionObserver' in window)) return;

    const elements = document.querySelectorAll(SELECTORS.join(', '));
    if (!elements.length) return;

    elements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        // 동시 진입 요소 · 살짝 stagger
        let staggerIndex = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = staggerIndex * 70; // 70ms 간격
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
          staggerIndex += 1;
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
