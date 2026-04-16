# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> 이 파일은 AI가 이 레포에서 작업할 때 매번 읽는 컨텍스트.
> 코드 작업 · 케이스스터디 수정 · PM 리뷰 모두 이 파일 기준으로 판단한다.

---

## 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 목적 | 이지현(Judy Lee)의 포트폴리오 웹사이트 — Creative Strategist 포지셔닝 |
| 타겟 독자 | 테크 스타트업 채용담당자 · 외주 클라이언트 · 대기업 인하우스 디자이너 |
| 기술 스택 | Vanilla HTML / CSS / JavaScript (빌드 툴 없음) |
| 스타일 방향 | Minimal Editorial Light — 군더더기 없는 고급스러운 타이포그래피 중심 |
| 폰트 | Plus Jakarta Sans (Google Fonts) |

---

## 파일 구조

```
META Portfolio_judy lee/
├── index.html                        # 메인 페이지 — 프로젝트 리스트 렌더링
├── about.html                        # About 페이지
├── CLAUDE.md                         # 이 파일
├── styles/
│   └── tokens.css                    # 디자인 토큰 전역 정의 (단일 소스)
├── scripts/
│   └── main.js                       # 프로젝트 카드 렌더링 + 아코디언 인터랙션
├── projects/
│   ├── data.js                       # 프로젝트 데이터 (단일 소스)
│   ├── reels-content-strategy.html   # 케이스스터디 01
│   ├── big-black-bag.html            # 케이스스터디 02
│   ├── samsung-engagement.html       # 케이스스터디 03
│   └── ptkorea.html                  # 케이스스터디 04
└── assets/
    └── images/                       # 프로젝트 썸네일 이미지
```

**규칙:**
- 스타일은 반드시 `tokens.css`의 CSS 변수 사용 — 값 하드코딩 금지
- 새 변수가 필요하면 `tokens.css`에 추가하고 사용
- 프로젝트 정보는 `data.js`만 수정 — HTML에 직접 쓰지 않음

---

## 아키텍처: 데이터 흐름

```
projects/data.js          → window.projects 배열 노출
scripts/main.js           → DOMContentLoaded 시 renderProjects() 실행
                             projects 배열 필터링(visible: true) → 카드 DOM 생성
index.html                → <script src="projects/data.js"> 먼저 로드,
                             그 다음 <script src="scripts/main.js"> 로드
```

- `data.js`는 빌드 없이 전역 `projects` 변수로 노출됨 (`window.projects`)
- 각 케이스스터디 HTML은 독립 페이지 — 공통 nav/footer는 인라인 스타일로 자체 포함
- `tokens.css`는 모든 HTML 페이지에서 `../styles/tokens.css`로 링크

---

## 현재 프로젝트 (data.js 기준)

| 순서 | ID | 제목 | 상태 |
|---|---|---|---|
| 01 | `reels-content-strategy` | Reels Content Strategy | visible |
| 02 | `big-black-bag` | Winners Big Black Bag | visible |
| 03 | `samsung-engagement` | Samsung.com — Redesign | visible |
| 04 | `ptkorea` | PTKorea — Rebranding & Website | visible |

---

## 디자인 토큰 (`styles/tokens.css`)

### 컬러
| 변수 | 값 | 용도 |
|---|---|---|
| `--color-bg` | `#ffffff` | 배경 |
| `--color-bg-subtle` | `#f7f7f7` | 서브 배경 |
| `--color-bg-hover` | `#f2f2f2` | 호버 배경 |
| `--color-text-primary` | `#1a1a1a` | 본문 |
| `--color-text-secondary` | `#898989` | 보조 텍스트 |
| `--color-text-tertiary` | `#b8b8b8` | 캡션·레이블 |
| `--color-border` | `#e8e8e8` | 기본 선 |
| `--color-border-strong` | `#d0d0d0` | 강조 선 |

### 타이포그래피
| 변수 | 값 | 용도 |
|---|---|---|
| `--text-display` | clamp(36px–56px) | 히어로 타이틀 |
| `--text-h1` | clamp(24px–36px) | 섹션 타이틀 |
| `--text-h2` | 20px | 서브 타이틀 |
| `--text-body` | 16px | 본문 |
| `--text-small` | 14px | 네비·레이블 |
| `--text-caption` | 12px | 캡션 |

### 스페이싱 스케일
`--space-1` (4px) → `--space-2` (8) → `--space-3` (12) → `--space-4` (16) → `--space-5` (24) → `--space-6` (32) → `--space-7` (48) → `--space-8` (64) → `--space-9` (80) → `--space-10` (120)

### 레이아웃
| 변수 | 값 |
|---|---|
| `--nav-height` | 56px |
| `--content-max-width` | 1200px |
| `--content-padding-x` | 48px (mobile: 24px) |
| `--radius-sm` | 4px · `--radius-md` 8px · `--radius-full` 9999px |

---

## 사용 가능한 스킬 (슬래시 커맨드)

| 커맨드 | 언제 쓰나 |
|---|---|
| `/add-project` | 새 프로젝트를 data.js에 추가할 때 |
| `/toggle-project` | 프로젝트 공개/비공개 전환 |
| `/build-page` | 새 HTML 페이지 생성 |
| `/build-component` | 재사용 UI 컴포넌트 추가 |
| `/case-study` | 케이스스터디 콘텐츠 작업 |
| `/research-ref` | 디자인 레퍼런스 리서치 |
| `/design-system` | 토큰·스타일 가이드 작업 |
| `/pm-mode` | PM 관점 리뷰 (아래 섹션 참고) |
| `/deploy-check` | 배포 전 체크리스트 |
| `/write-content` | 케이스스터디 카피 작성·다듬기 (섹션 단위) |
| `/inbox-to-case` | 산발적인 노트·메모를 케이스스터디 초안으로 변환 |
| `/meta-cs-review` | Meta Creative Strategist Korea JD 기준으로 케이스스터디 피드백 |

---

## PM 모드 (`/pm-mode`)

케이스스터디를 수정하거나 전략적 판단이 필요할 때 호출한다.

### 평가 프레임워크: Problem → Solution → Outcome

```
Problem   : 어떤 문제를, 누구를 위해 풀었는가?
Solution  : 어떤 접근으로, 왜 그 방법을 선택했는가?
Outcome   : 결과는 무엇인가? (정량 > 정성)
```

### 케이스스터디 체크리스트

| # | 체크 항목 | 조건 |
|---|---|---|
| 1 | 해결하려는 진짜 문제가 한 문장으로 명확한가? | 필수 |
| 2 | 문제를 증명할 데이터나 리서치 결과가 있는가? | 필수 |
| 3 | 설정한 가설이 논리적으로 타당한가? | 필수 |
| 4 | 수많은 대안 중 왜 이 해결책을 선택했는가? | 필수 |
| 5 | 제품 소개가 아니라 나의 사고 과정이 보이는가? | 필수 |
| 6 | 기술적 혹은 현실적 제약을 어떻게 극복했는가? | 필수 |
| 7 | 프로젝트 내에서 본인의 역할이나 기여도가 보이는가? | 릴리즈 프로젝트일 경우 |
| 8 | 결과가 지표나 숫자로 명확히 증명되었는가? | 데이터가 있을 경우 |
| 9 | 프로젝트 종료 후 얻은 핵심 인사이트는 무엇인가? | 필수 |
| 10 | 이 포폴을 읽고 같이 일하고 싶어지는가? | 필수 |

### 타겟별 포인트
| 타겟 | 중점 확인 사항 |
|---|---|
| 테크 스타트업 채용담당자 | UX 임팩트 수치 · 의사결정 근거 · 실행 속도 |
| 외주 클라이언트 | 비주얼 결과물 · 프로세스 신뢰감 · 납기 |
| 대기업 인하우스 | 협업 방식 · 시스템 사고 · 이해관계자 커뮤니케이션 |

---

## 작업 규칙

### 언어 & 톤
- AI와의 대화: 한국어 기본. 영어 용어는 디자인·개발 전문 용어에만 사용
- 결과물(HTML 콘텐츠): 영어. 전문 Product Design/IT 용어 사용
- 코드 주석: 한국어
- 톤: Confident, professional, authentic
- **Em dash(—) 절대 사용 금지** — 구분자는 `·` (middle dot) 사용

### 코드 작업
- CSS 변수만 사용 — 값 하드코딩 금지
- 새 기능은 최소한의 변경만 — 관련 없는 리팩터링 금지
- 파일명은 kebab-case, CSS 클래스는 BEM-like 네이밍
- JavaScript는 모듈 단위로 유지 — 전역 네임스페이스 오염 금지
- 코드 변경 전 디자인 시스템(스페이싱, 타이포) 저해 여부 먼저 확인

### 절대 하지 말 것
- 묻지 않고 기능이나 아이디어 추가
- 과한 설명, 요약 마무리 반복
- 요청 범위 밖의 코드 수정

---

## 이지현에 대한 컨텍스트

- **직군:** 프로덕트 디자이너 (그래픽 디자이너 출신) → Creative Strategist 포지셔닝 중
- **지향:** AX(AI Experience) 디자이너
- **강점:** 비주얼 감각 · 스토리텔링 · 문제 정의에 대한 집요함
- **현재:** 구직 중 · 포트폴리오 케이스스터디 완성 단계
- **Final Deliverables:** 1. High-fidelity portfolio website. 2. Interview presentation deck.
- **Strategy:** Highlight 'Impact' and 'Problem-solving' for the North American tech market.
