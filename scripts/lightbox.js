// ============================================
// Lightbox · 이미지 클릭 시 원본 사이즈 모달로 열기
// ESC · 오버레이 클릭 · 닫기 버튼 · 3가지 방법으로 닫힘
// ============================================

(function () {
  // 라이트박스 적용 대상 셀렉터
  const LIGHTBOX_SELECTORS = [
    '.cs-hero-image',
    '.cs-image-placeholder.has-image .cs-placeholder-img'
  ];

  // CSS 주입
  const style = document.createElement('style');
  style.textContent = `
    .lightbox-trigger {
      cursor: zoom-in;
      transition: opacity var(--transition-fast, 0.2s);
    }
    .lightbox-trigger:hover {
      opacity: 0.92;
    }

    .lightbox-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.92);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5vh 5vw;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
      cursor: zoom-out;
    }
    .lightbox-overlay.is-open {
      opacity: 1;
      pointer-events: auto;
    }

    .lightbox-overlay img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      display: block;
      transform: scale(0.96);
      transition: transform 0.25s ease;
      cursor: default;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    .lightbox-overlay.is-open img {
      transform: scale(1);
    }

    .lightbox-close {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.12);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 18px;
      line-height: 1;
      transition: background 0.2s ease, transform 0.2s ease;
      z-index: 10000;
    }
    .lightbox-close:hover {
      background: rgba(255, 255, 255, 0.22);
      transform: scale(1.06);
    }

    body.lightbox-open {
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .lightbox-overlay { padding: 3vh 3vw; }
      .lightbox-close { top: 12px; right: 12px; }
    }
  `;
  document.head.appendChild(style);

  let overlay, overlayImg, closeBtn;

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image lightbox');

    overlayImg = document.createElement('img');
    overlayImg.alt = '';

    closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.innerHTML = '✕';

    overlay.appendChild(overlayImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
  }

  function open(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    document.body.classList.add('lightbox-open');
    requestAnimationFrame(() => overlay.classList.add('is-open'));
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    // 투명도 전환 후 src 비움 (메모리 정리)
    setTimeout(() => { overlayImg.src = ''; }, 300);
  }

  function init() {
    const imgs = document.querySelectorAll(LIGHTBOX_SELECTORS.join(', '));
    if (!imgs.length) return;

    createOverlay();

    imgs.forEach((img) => {
      img.classList.add('lightbox-trigger');
      img.addEventListener('click', (e) => {
        e.preventDefault();
        const src = img.currentSrc || img.src;
        if (!src) return;
        open(src, img.alt);
      });
    });

    // 오버레이 클릭 시 닫기 (이미지 클릭은 제외)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlayImg) return;
      close();
    });

    // ESC로 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        close();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
