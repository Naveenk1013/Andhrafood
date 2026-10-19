# mobile-compatibility.md: Mobile, OS and Browser Compatibility Guide

Goal: the app works well on **any phone, any OS, any modern browser**, including low-end Android devices and slow networks. Follow this file together with `design.md` and `instructions.md`.

## 1. Strategy
1. **Mobile first, progressive enhancement.** Core content (dishes, recipes, search) works with plain HTML and CSS rendered on the server. JavaScript, the PWA and the AI chat enhance it.
2. **Web standards only.** No browser-specific features without a fallback.
3. **Feature detection, never browser sniffing.** Use `if ('wakeLock' in navigator)` or `CSS.supports(...)`, not user-agent checks.
4. **Test on real devices**, not only emulators.

## 2. Support matrix

| Platform | Browsers | Minimum target |
|---|---|---|
| Android | Chrome, Samsung Internet, Firefox, Edge, Opera, in-app WebViews | Android 8+ with browsers updated in the last ~3 years |
| iOS / iPadOS | Safari, Chrome, Firefox, Edge (all use WebKit on iOS), in-app browsers | iOS 15+ |
| Desktop (secondary) | Chrome, Edge, Safari, Firefox | Last 2 versions |
| Basic/low-end | Opera Mini, UC Browser, KaiOS | Content readable and navigable; chat and PWA features may be absent |

Set in `package.json`:
```json
"browserslist": [
  "last 2 versions",
  "> 0.5%",
  "iOS >= 15",
  "Android >= 8",
  "not dead",
  "not op_mini all"
]
```
Opera Mini is excluded from compiled features but must still receive a readable server-rendered page.

## 3. Viewport and layout basics
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```
- **Never** disable zoom (`user-scalable=no`, `maximum-scale=1`). Users need to zoom.
- Design widths: 320, 360, 390, 412, 600, 768, 1024, 1280px. 320px must not break.
- Use `rem`, `%`, `clamp()`, CSS grid and flexbox. No fixed pixel widths for containers.
- Use **dynamic viewport units** (`100dvh`) with a `100vh` fallback, because mobile address bars resize:
```css
.screen { min-height: 100vh; min-height: 100dvh; }
```
- Add safe-area padding for notches and gesture bars:
```css
.bottom-nav { padding-bottom: max(8px, env(safe-area-inset-bottom)); }
```
- No horizontal scrolling of the page. Wide content (tables) scrolls inside its own container.
- Use container queries or media queries by **content breakpoint**, not by device name.
- Support portrait and landscape; do not lock orientation. Foldables: layout must adapt to any width, with no hardcoded device sizes.

## 4. Touch and interaction
- Touch targets at least **44 by 44px** with 8px spacing.
- Never rely on hover. Wrap hover-only styles:
```css
@media (hover: hover) and (pointer: fine) { .card:hover { ... } }
```
- Use pointer events or standard `click`; avoid touch-only or mouse-only handlers.
- Gestures (swipe between cooking steps) always have a visible button alternative.
- Remove the tap delay with `touch-action: manipulation` on interactive elements.
- Do not hijack the back button or pull-to-refresh. Every screen needs a real URL so Back works as expected, and scroll position is restored.
- Long-press and text selection stay enabled for recipe text.
- Provide haptics only as an optional enhancement (`navigator.vibrate` is not available on iOS).

## 5. Forms, keyboard and chat composer
- Input font size **at least 16px**, otherwise iOS Safari zooms in on focus.
- Correct input attributes: `type="search"`, `inputmode`, `enterkeyhint="send"`, `autocomplete`, `autocapitalize`.
- When the on-screen keyboard opens, the chat composer must stay visible. Use `visualViewport` to adjust layout:
```js
const vv = window.visualViewport;
vv?.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--kb', `${window.innerHeight - vv.height}px`);
});
```
- Telugu input: test with Gboard, Samsung keyboard and iOS Telugu keyboard. Search must accept Telugu script, English and transliterated text.
- Labels are visible or properly associated; errors appear next to the field.

## 6. Telugu and fonts
- Set `lang="te"` on Telugu content and `lang="en"` on English content.
- Self-host subsetted fonts (Latin and Telugu) as WOFF2 with `font-display: swap`. Do not rely on a user having Telugu fonts installed.
- Always define fallbacks: `'Hind Guntur', 'Noto Sans Telugu', system-ui, sans-serif`.
- Include `-webkit-text-size-adjust: 100%` so iOS does not inflate text in landscape.
- Test conjuncts and vowel signs on Android Chrome, Samsung Internet and iOS Safari. Telugu needs more line-height than Latin.
- Never use letter-spacing on Telugu text; it breaks shaping.
- Avoid text inside images. Keep names and steps as real text.

## 7. Performance on real-world phones
Many users have mid-range or older Android devices and patchy 4G.
- Budgets: LCP under 2.5s, INP under 200ms, CLS under 0.1, JS under 170 KB gzipped per route.
- Server-render and statically generate content pages.
- Images: AVIF/WebP with JPEG fallback, responsive `srcset`, explicit `width` and `height`, lazy-load below the fold.
- Load the AI chat code only when opened.
- Respect `prefers-reduced-motion` and `Save-Data`: serve smaller images and skip heavy animation.
- Avoid heavy blur, large box-shadows and many layered animations; they stutter on low-end GPUs.
- The region map is SVG, kept small, with a static fallback if animation is not supported.

## 8. PWA behaviour by platform

| Capability | Android Chrome | iOS Safari |
|---|---|---|
| Install | Install prompt (`beforeinstallprompt`) or menu | **Share > Add to Home Screen** only; no automatic prompt |
| Service worker and offline | Yes | Yes, with stricter storage limits |
| Storage persistence | Generally persistent | Browser data can be cleared after about 7 days of non-use unless installed |
| Push notifications | Yes | Only for installed home-screen apps on recent iOS |
| Screen Wake Lock (cooking mode) | Yes | Recent iOS versions only |
| Web Share | Yes | Yes |

Implement:
- `manifest.webmanifest` with name, short name, icons (192, 512, maskable), theme colour, `display: standalone`, `start_url`, `lang`.
- Apple touch icon and `apple-mobile-web-app-*` meta tags.
- On iOS, show a small, dismissible "How to install" hint explaining Share > Add to Home Screen. On Android, use the install prompt after meaningful engagement.
- Offline: cache the app shell, visited dish pages and favourites; show a friendly offline page. The chat says clearly when it needs a connection.
- Store favourites in IndexedDB with `localStorage` fallback; tell users data lives on their device.
- Do not depend on push notifications in the MVP.

## 9. Progressive enhancement and fallbacks

| Feature | Fallback |
|---|---|
| Screen Wake Lock | Show "Keep your screen on while cooking" tip |
| View Transitions | Instant navigation |
| `100dvh` | `100vh` |
| Container queries | Media queries |
| Web Share | Copy link button |
| Service worker | Normal online site |
| `backdrop-filter` | Solid background |
| JavaScript disabled or failed | Server-rendered content and a `<noscript>` message for chat |

Do not use new APIs without checking compatibility (caniuse or MDN) and adding the fallback in the table above.

## 10. Theme, display and accessibility
- Support light and dark with `prefers-color-scheme` plus a manual toggle; set `<meta name="color-scheme" content="light dark">` and `theme-color` for each scheme.
- Layout must work at **200% text size** and with Android and iOS font-size settings.
- Screen readers: TalkBack (Android) and VoiceOver (iOS) test passes for navigation, search, dish page and chat.
- Contrast and focus rules from `design.md`.
- Do not use colour alone to convey heat or diet labels.

## 11. In-app browsers and WebViews
Users often open shared links inside WhatsApp, Instagram, Facebook or Telegram browsers.
- Content pages must work with no PWA features and limited storage.
- Do not rely on install prompts or service workers there; show "Open in browser" only if something truly breaks.
- Share cards (Open Graph and Twitter tags) with image, title and description, so links look good in WhatsApp.

## 12. Network resilience
- Show skeletons and clear loading states; handle timeouts and retries.
- Chat requests stream, with a "Retry" action on failure.
- Cache API responses for search suggestions where safe.
- Handle offline and online events gracefully.

## 13. Test plan

### Real device matrix (minimum)
| Device type | Example | Browser |
|---|---|---|
| Low-end Android | Android Go / 2 to 3 GB RAM phone | Chrome |
| Mid-range Android | Common 6 to 8 GB phone | Chrome, Samsung Internet, Firefox |
| Flagship Android | Recent Samsung or Pixel | Chrome, Samsung Internet |
| Older iPhone | iPhone with iOS 15 | Safari |
| Current iPhone | Latest iOS | Safari, Chrome |
| Tablet | iPad and an Android tablet | Safari, Chrome |
| In-app | Link opened from WhatsApp and Instagram | Built-in browser |

### Automated
- Playwright projects for Chromium (mobile Chrome emulation), WebKit (iPhone Safari emulation) and Firefox, at 360, 390 and 768px.
- Lighthouse CI on mobile profile with Slow 4G throttling.
- axe accessibility checks on every key route.
- Visual regression screenshots for Home, Browse, Dish, Cooking mode, Ruchi.
- Cloud device testing (such as BrowserStack) for iOS versions you do not own.

### Manual checklist per release
- [ ] No horizontal scroll at 320px
- [ ] Telugu text renders correctly with no broken conjuncts
- [ ] Input focus does not zoom the page on iOS
- [ ] Chat composer stays above the keyboard
- [ ] Bottom nav respects safe areas and does not hide content
- [ ] Back button behaves correctly on every screen
- [ ] Rotation works
- [ ] Offline page and cached dishes work
- [ ] Install works on Android; iOS "Add to Home Screen" instructions are clear
- [ ] Cooking mode keeps the screen awake where supported
- [ ] Works inside WhatsApp's in-app browser
- [ ] Dark mode and 200% text size verified

## 14. Rules for agents
1. Never use browser-specific code without feature detection and a fallback.
2. Never disable zoom or lock orientation.
3. Test every UI task at 320, 360, 390, 768 and 1280px and attach screenshots.
4. Check Telugu rendering in every new text component.
5. Run Playwright WebKit and Chromium projects before marking a task done.
6. Record any compatibility workaround in `decisions.md` with the reason and the affected browser or OS.
