// Shared animation helpers for the compositions. Loaded once from index.html.
// Everything here is pure: frame numbers in, GSAP tweens out. 30 fps throughout.
(function () {
  const FPS = 30;

  /** CSS-style cubic-bezier easing (same solver as Remotion's Easing.bezier). */
  function bezier(x1, y1, x2, y2) {
    const a = (p1, p2) => 1 - 3 * p2 + 3 * p1;
    const b = (p1, p2) => 3 * p2 - 6 * p1;
    const c = (p1) => 3 * p1;
    const at = (t, p1, p2) => ((a(p1, p2) * t + b(p1, p2)) * t + c(p1)) * t;
    const slope = (t, p1, p2) => 3 * a(p1, p2) * t * t + 2 * b(p1, p2) * t + c(p1);
    const solveT = (x) => {
      let t = x;
      for (let i = 0; i < 8; i++) {
        const s = slope(t, x1, x2);
        if (Math.abs(s) < 1e-6) break;
        t -= (at(t, x1, x2) - x) / s;
      }
      let lo = 0;
      let hi = 1;
      for (let i = 0; i < 30 && Math.abs(at(t, x1, x2) - x) > 1e-7; i++) {
        if (at(t, x1, x2) < x) lo = t;
        else hi = t;
        t = (lo + hi) / 2;
      }
      return t;
    };
    return (x) => (x <= 0 ? 0 : x >= 1 ? 1 : at(solveT(x), y1, y2));
  }

  const EASE_IN_OUT = bezier(0.65, 0, 0.35, 1);
  const EASE_OUT = bezier(0.16, 1, 0.3, 1);

  const sec = (frame) => frame / FPS;

  /**
   * Tween `from` → `to` over frames [a, b]. Always fromTo with immediateRender off, so
   * the timeline is correct whatever order it is seeked in.
   */
  function span(tl, target, a, b, from, to, ease = EASE_IN_OUT) {
    tl.fromTo(target, { ...from }, { ...to, duration: sec(b - a), ease, immediateRender: false }, sec(a));
  }

  /**
   * The Remotion `visibleBetween` shape applied to any property pair: reaches `on` by
   * start + fadeIn (ease-out), holds, and is back to `off` exactly at `end`.
   */
  function between(tl, target, start, end, fadeIn, fadeOut, off, on) {
    span(tl, target, start, start + fadeIn, off, on, EASE_OUT);
    // Never let the fade-out overlap the fade-in: two tweens on one property would fight.
    span(tl, target, Math.max(end - fadeOut, start + fadeIn), end, on, off, EASE_IN_OUT);
  }

  window.GB = { FPS, sec, bezier, EASE_IN_OUT, EASE_OUT, span, between };
})();
