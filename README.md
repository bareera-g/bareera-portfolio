# Bareera Gulraiz — Portfolio

A scroll-driven "Nine Homes" narrative portfolio with a 3D moving-box hero intro, built with React, TypeScript, Vite, React Three Fiber, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.tsx                     # Root: lazy-loads Hero3D → MainContent
├── main.tsx                    # Entry point
├── styles/global.css           # Tailwind + paper texture + blueprint grid
├── data/projects.ts            # Project data array (edit here)
├── hooks/useReducedMotion.ts
├── three/                      # 3D hero components (React Three Fiber)
│   ├── BoxScene.tsx            # Lights, camera rig, scene composition
│   ├── MovingBox.tsx           # Procedural box: walls, flaps, tape
│   └── MiniRoom.tsx            # Tiny room interior (desk, chair, plant)
├── components/
│   ├── Nav.tsx                 # Sticky nav + scroll progress bar
│   ├── RoomScene.tsx           # 2D SVG room renderer (4 room types)
│   ├── ProjectCard.tsx         # Project grid cards
│   └── ProjectModal.tsx        # Accessible case-study modal
└── sections/
    ├── Hero3D.tsx              # 3D Canvas + scroll driver + overlay text
    ├── MainContent.tsx         # Wrapper for all 2D sections
    ├── Hero.tsx                # (Legacy 2D hero, kept for reference)
    ├── HouseJourney.tsx        # Scroll-driven rooms → project morph
    ├── Projects.tsx            # Full project grid
    ├── About.tsx               # Philosophy / 3 principles
    └── Contact.tsx             # Email, LinkedIn, GitHub
```

## 3D Hero — How It Works

### Scroll → Animation Mapping

The hero occupies **400vh** of scroll space. A `position: fixed` Canvas renders the 3D scene while Framer Motion's `useScroll` maps scroll position to a `progressRef` (0→1):

| Scroll % | Animation Phase |
|----------|----------------|
| 0–4%     | Idle: subtle box float |
| 4–28%    | Tape peels back |
| 22–62%   | Four flaps hinge open |
| 50–92%   | Camera dollies into the box |
| 84–100%  | 3D canvas fades out → 2D sections appear |

Overlay text fades in/out at key moments:
- *"I moved nine times before I was nine."* — 4–52%
- *"Now I design systems that help people feel at home."* — 58–96%

### Camera Rig

Two-phase interpolation in `BoxScene.tsx` → `CameraRig`:
- Phase 1 (0–50%): Slow approach from `[0, 1.8, 3.5]` to `[0, 1.35, 2.0]`
- Phase 2 (50–92%): Dolly into box from `[0, 1.35, 2.0]` to `[0, 0.55, 0.12]`

Camera position uses 10% per-frame damping for smooth scroll-following.

### Tuning Colors & Lighting

In `BoxScene.tsx`:
- `<color args={['#F4EFE6']} />` — scene background (match page)
- Key light: `position={[3, 5, 4]}`, warm `#FFFAF0`
- Fill light: `position={[-2, 3, -1]}`, cool `#E0E5F0`
- Ambient: `0.55` intensity

In `MovingBox.tsx`:
- `CARDBOARD = '#C4A882'` — front/back/top/bottom
- `CARDBOARD_SIDE = '#B89872'` — left/right (subtle depth)
- `TAPE_COLOR = '#D9CBA8'`

## Where to Edit

| What | File |
|------|------|
| Projects | `src/data/projects.ts` |
| Hero copy | `src/sections/Hero3D.tsx` (overlay text) |
| Box colors | `src/three/MovingBox.tsx` (top constants) |
| Room furniture | `src/three/MiniRoom.tsx` |
| Lighting | `src/three/BoxScene.tsx` |
| Camera path | `src/three/BoxScene.tsx` → `CameraRig` |
| 2D rooms | `src/components/RoomScene.tsx` |
| Design tokens | `tailwind.config.js` |
| About text | `src/sections/About.tsx` |
| Contact links | `src/sections/Contact.tsx` |

## Reduced Motion

When `prefers-reduced-motion: reduce` is active:
- The 3D Canvas is **not rendered at all**
- A static fallback shows the thesis text on a blueprint grid
- All scroll animations in the 2D sections are disabled
- No parallax, no fade transitions

## Accessibility

- Skip-to-content link (keyboard visible)
- "Skip intro →" button bypasses 3D hero
- "Skip story → Projects" in nav for recruiters
- Modal: focus-trapped, ESC to close, `aria-modal`
- Proper heading hierarchy (`h1` → `h2` → `h3`)
- Focus-visible outlines (terracotta)

## Performance

- **Code splitting**: Three.js loads as a separate chunk (~288KB gz), lazy-loaded
- **Main bundle**: ~53KB gz (renders immediately without waiting for 3D)
- **3D scene**: ~30 draw calls, no textures, no postprocessing
- **Procedural geometry**: Box, flaps, tape, room furniture — all built from primitives
- **Camera damping**: 10% per-frame lerp avoids jank on fast scroll
- **Shadow map**: 1024×1024, single directional light
- **DPR capped** at 1.5 to prevent GPU strain on high-DPI displays
