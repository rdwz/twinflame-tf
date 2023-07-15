const {
  E: E,
  LN10: LN10,
  LN2: LN2,
  LOG10E: LOG10E,
  LOG2E: LOG2E,
  PI: PI,
  SQRT1_2: SQRT1_2,
  SQRT2: SQRT2,
  abs: abs,
  acos: acos,
  acosh: acosh,
  asin: asin,
  asinh: asinh,
  atan: atan,
  atan2: atan2,
  atanh: atanh,
  cbrt: cbrt,
  ceil: ceil,
  clz32: clz32,
  cosh: cosh,
  exp: exp,
  expm1: expm1,
  floor: floor,
  fround: fround,
  hypot: hypot,
  imul: imul,
  log: log,
  log10: log10,
  log1p: log1p,
  log2: log2,
  max: max,
  min: min,
  pow: pow,
  round: round,
  sign: sign,
  sinh: sinh,
  sqrt: sqrt,
  tan: tan,
  tanh: tanh,
  trunc: trunc,
} = Math;
let _codepenIDRegex =
  /codepen\.io\/[^/]+\/(?:pen|debug|fullpage|fullembedgrid)\/([^?#]+)/;
const ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  ELEVEN = 11,
  TWELVE = 12,
  SIXTEEN = 16,
  THIRTY = 30,
  THIRTY_TWO = 32,
  SIXTY = 60,
  HUNDRED = 100,
  THOUSAND = 1e3,
  HALF = ONE / 2,
  THIRD = ONE / 3,
  TWO_THIRDS = 2 * THIRD,
  QUARTER = ONE / 4,
  THREE_QUARTER = 3 * QUARTER,
  FIFTH = ONE / 5,
  SIXTH = ONE / 6,
  SEVENTH = ONE / 7,
  EIGHTH = ONE / 8,
  TWELFTH = ONE / 12,
  SIXTEENTH = ONE / 16,
  ONE_THIRTIETH = ONE / 30,
  THIRTY_SECONDTH = ONE / 32,
  SIXTIETH = ONE / 60,
  TENTH = .1,
  HUNDREDTH = .01,
  THOUSANDTH = .001,
  TEN_THOUSANDTH = 1e-4,
  HUNDRED_THOUSANDTH = 1e-5,
  MILLIONTH = 1e-6,
  TEN_MILLIONTH = 1e-7,
  HUNDRED_MILLIONTH = 1e-8,
  BILLIONTH = 1e-9,
  TEN_BILLIONTH = 1e-10,
  HUNDRED_BILLIONTH = 1e-11,
  HALF_PI = PI * HALF,
  THREE_QUARTER_PI = PI * THREE_QUARTER,
  THIRD_PI = PI * THIRD,
  QUARTER_PI = PI * QUARTER,
  FIFTH_PI = PI * FIFTH,
  SIXTH_PI = PI * SIXTH,
  SEVENTH_PI = PI * SEVENTH,
  EIGHTH_PI = PI * EIGHTH,
  TWELFTH_PI = PI * TWELFTH,
  SIXTEENTH_PI = PI * SIXTEENTH,
  THIRTY_SECONDTH_PI = PI * THIRTY_SECONDTH,
  TAU = 2 * PI,
  TWO_TAU = 2 * TAU,
  THREE_QUARTER_TAU = TAU * THREE_QUARTER,
  HALF_TAU = PI,
  THIRD_TAU = TAU * THIRD,
  QUARTER_TAU = HALF_PI,
  FIFTH_TAU = TAU * FIFTH,
  SIXTH_TAU = THIRD_PI,
  EIGHTH_TAU = QUARTER_PI,
  TWELFTH_TAU = SIXTH_PI,
  SIXTEENTH_TAU = EIGHTH_PI,
  THIRTY_SECONDTH_TAU = SIXTEENTH_PI,
  SQRT_3 = sqrt(3),
  SQRT_4 = sqrt(4),
  SQRT_5 = sqrt(5),
  PHI = .5 * (1 + sqrt(5)),
  GOLDEN_ANGLE = 1 / (PHI * PHI),
  COLOR_BLACK = hsl(0, 0, 0),
  COLOR_WHITE = hsl(0, 0, 100),
  COLOR_RED = hsl(0, 100, 50),
  COLOR_ORANGE = hsl(30, 100, 50),
  COLOR_YELLOW = hsl(60, 100, 50),
  COLOR_GREEN = hsl(120, 100, 50),
  COLOR_CYAN = hsl(180, 100, 50),
  COLOR_BLUE = hsl(240, 100, 50),
  COLOR_PURPLE = hsl(280, 100, 50),
  COLOR_MAGENTA = hsl(300, 100, 50),
  TEXTALIGN_LEFT = "left",
  TEXTALIGN_CENTER = "center",
  TEXTALIGN_RIGHT = "right",
  TEXTBASELINE_TOP = "top",
  TEXTBASELINE_MIDDLE = "middle",
  TEXTBASELINE_BOTTOM = "bottom";
let _defaulCanvasOptions = {
    autoClear: !1,
    autoCompensate: !0,
    autoPushPop: !1,
    canvas: !0,
    centered: !1,
    desynchronized: !1,
    drawAndStop: !1,
    width: null,
    height: null,
  },
  _canvasOptions = {},
  canvas = document.getElementById("canvas");
null === canvas &&
  ((canvas = document.createElement("canvas")).id = "canvas",
    document.body.appendChild(canvas));
let ctx = canvas.getContext("2d", {
  desynchronized:
    window.canvasOptions && void 0 !== window.canvasOptions.desynchronized
      ? window.canvasOptions.desynchronized
      : _defaulCanvasOptions.desynchronized,
});
const _originalCtx = ctx;
let _anim,
  _lastCanvasTime,
  canvasFrameRate,
  frameCount,
  width,
  height,
  width_half,
  height_half,
  width_quarter,
  height_quarter,
  _canvasCurrentlyCentered = !1,
  _logMouseEvents = !1,
  _mouseUpdateTimeThreshold = 12,
  mouseUpdate = -1 / 0,
  mouseIn = !1,
  mouseDown = !1,
  mouseButton = -1,
  mouseMove = null,
  mousePos = null,
  mousePosPrev = null,
  mouseDownTime = -1 / 0,
  mouseDownPos = null,
  mouseEnterPos = null,
  mouseExitPos = null,
  mouseUpTime = -1 / 0,
  mouseUpPos = null,
  mouseEnterTime = -1 / 0,
  mouseExitTime = -1 / 0;
function updateMouse(t, e) {
  if (
    _logMouseEvents && console.log("Mouse event", e, t),
      t && !t.clientX && (t = t.touches && t.touches.length
        ? t.touches[0]
        : t.changedTouches
        ? t.changedTouches[0]
        : t),
      !t
  ) return void (_logMouseEvents && console.log("Missing event data"));
  const n = void 0 === t.timeStamp ? performance.now() : t.timeStamp;
  if (mouseUpdate > 0 && n - mouseUpdate < _mouseUpdateTimeThreshold) {
    return void (_logMouseEvents &&
      console.log("Skipping mouse event, are the dev tools open?"));
  }
  mouseUpdate = n;
  let i = canvas.getBoundingClientRect(),
    s = canvas.scrollWidth / width,
    r = canvas.scrollHeight / height,
    o = (t.clientX - i.left) / s,
    a = (t.clientY - i.top) / r;
  o < 0 ? o = 0 : o > width && (o = width),
    a < 0 ? a = 0 : a > height && (a = height),
    mousePos && (mousePosPrev.set(mousePos), mousePos.set(o, a));
}
function _draw(t) {
  frameCount++,
    canvasFrameRate = 1e3 / (t - _lastCanvasTime),
    _lastCanvasTime || (_lastCanvasTime = t),
    ctx = _originalCtx,
    _canvasOptions.autoClear && clear(null),
    _canvasOptions.autoPushPop &&
    (push(),
      _canvasOptions.centered && (_canvasCurrentlyCentered = !0) &&
      translateCenter(),
      _canvasOptions.autoCompensate && compensateCanvas()),
    "draw" in window && window.draw(t),
    _canvasOptions.autoPushPop && pop(),
    _canvasCurrentlyCentered = !1,
    _lastCanvasTime = t,
    _canvasOptions.drawAndStop || (_anim = requestAnimationFrame(_draw));
}
function _resizeCanvas(t) {
  width = canvas.width = null !== _canvasOptions.width
    ? _canvasOptions.width
    : window.innerWidth,
    height = canvas.height = null !== _canvasOptions.height
      ? _canvasOptions.height
      : window.innerHeight,
    width_quarter = (width_half = width * HALF) * HALF,
    height_quarter = (height_half = height * HALF) * HALF,
    ctx.fillStyle = "hsl(0, 0%, 100%)",
    ctx.strokeStyle = "hsl(0, 0%, 100%)",
    "onResize" in window && window.onResize();
}
function clear(t, e, n, i) {
  void 0 !== t && "number" == typeof t
    ? ctx.clearRect(t, e, n, i)
    : _canvasOptions.centered && _canvasCurrentlyCentered
    ? ctx.clearRect(-width_half, -height_half, width, height)
    : ctx.clearRect(0, 0, width, height);
}
function isVectorish(t) {
  return t instanceof Vector || "object" == typeof t && "x" in t && "y" in t;
}
function _resolveVectorArgs(t, e) {
  if (0 === arguments.length || void 0 === t) return [];
  if ("number" == typeof t) return [t, ..._resolveVectorArgs(e)];
  if (isVectorish(t)) return [t.x, t.y, ..._resolveVectorArgs(e)];
  if (Array.isArray(t)) return [...t, ..._resolveVectorArgs(e)];
  throw new Error(
    `Could not understand arguments with types [ ${typeof t}, ${typeof e} ]`,
  );
}
function background(t) {
  push(),
    "number" != typeof t && fillStyle(t),
    _canvasOptions.centered && _canvasCurrentlyCentered
      ? ctx.fillRect(-width_half, -height_half, width, height)
      : ctx.fillRect(0, 0, width, height),
    pop();
}
function globalAlpha(t = ctx.globalAlpha) {
  return ctx.globalAlpha = t;
}
function fillStyle(...t) {
  if (1 === t.length) {
    let e = t[0];
    ("string" == typeof e || e instanceof CanvasGradient ||
      e instanceof CanvasPattern) && (ctx.fillStyle = e);
  }
  return ctx.fillStyle;
}
function lineWidth(t) {
  return "number" == typeof t && (ctx.lineWidth = t), ctx.lineWidth;
}
function lineCap(t = "butt") {
  ctx.lineCap = t;
}
function lineJoin(t) {
  ctx.lineJoin = t;
}
function miterLimit(t = 10) {
  ctx.miterLimit = t;
}
function strokeStyle(...t) {
  if (1 === t.length) {
    let [e] = t;
    ("string" == typeof e || e instanceof CanvasGradient) &&
      (ctx.strokeStyle = e);
  } else 2 === t.length && (strokeStyle(t[0]), lineWidth(t[1]));
  return ctx.strokeStyle;
}
function lerpRGB(...t) {
  let e = 255, n = 255, i = 255, s = 1, r = 0, o = 0, a = 0, u = 1, c = .5;
  if (3 === t.length) {
    if (Array.isArray(t[0]) && Array.isArray(t[1])) {
      return lerpRGB(...t[0], ...t[1], t[2]);
    }
    [
      { r: e = 255, b: n = 255, g: i = 255, a: s = 1 },
      { r: r = 0, b: a = 0, g: o = 0, a: u = 1 },
      c,
    ] = t;
  } else if (7 === t.length) [e, i, n, r, o, a, c] = t;
  else if (9 === t.length) [e, i, n, s, r, o, a, u, c] = t;
  else {
    if (2 !== t.length || !Array.isArray(t[0])) {
      return { r: 127.5, g: 127.5, b: 127.5, a: 1 };
    }
    if (2 === t[0].length) return lerpRGB(...t[0], t[1]);
  }
  return {
    r: lerp(e, r, c),
    g: lerp(i, o, c),
    b: lerp(n, a, c),
    a: lerp(s, u, c),
  };
}
function hsl(t, e, n, i = 1) {
  return "number" != typeof t &&
    (Array.isArray(t)
      ? [t, e, n, i = i] = t
      : "h" in t && ({ h: t, s: e, l: n, a: i = i } = t)),
    (t %= 360) < 0 && (t += 360),
    `hsl(${t} ${e}% ${n}% / ${i})`;
}
function parseHSL(t) {
  if ("string" != typeof t) return t;
  let e = t.match(
    /hsla?\(([\d.]+)\s*,?\s*([\d.]+)%\s*,?\s*([\d.]+)%\s*[/,]?\s*([\d.]*)?\)/,
  );
  if (e) {
    let [n, i, s, r, o] = e;
    return { input: t, h: i, s: s, l: r, a: o };
  }
  return null;
}
function setHueHSL(t, e) {
  if (void 0 === e) return t;
  let n = parseHSL(t);
  return n.h = e, hsl(n);
}
function rotateHSL(t, e = 90) {
  if (0 === e) return t;
  let n = parseHSL(t);
  return n.h += e, hsl(n);
}
function saturateHSL(t, e = .1) {
  if (0 === e) return t;
  let n = parseHSL(t);
  return n.s *= 1 + e, hsl(n);
}
function lightenHSL(t, e = .1) {
  if (0 === e) return t;
  let n = parseHSL(t);
  return n.l *= 1 + e, hsl(n);
}
function rgb(t = 255, e = 255, n = 255, i = 1) {
  return "number" != typeof t && "r" in t
    ? ({ r: t = 255, g: e = 255, b: n = 255, a: i = 1 } = t)
    : isVectorish(t) && ({ x: t = 255, y: e = 255, z: n = 255, a: i = 1 } = t),
    `rgba(${[t, e, n, i]})`;
}
function fill(...t) {
  let e;
  t.length && (t[0] instanceof Path2D && (e = t.shift()), fillStyle(...t)),
    e ? ctx.fill(e) : ctx.fill();
}
function stroke(...t) {
  let e;
  t.length && (t[0] instanceof Path2D && (e = t.shift()), strokeStyle(...t)),
    e ? ctx.stroke(e) : ctx.stroke();
}
function clip(...t) {
  ctx.clip(...t);
}
function createLinearGradient(t = -100, e = -100, n = 100, i = 100, s = []) {
  "number" != typeof t && "number" != typeof e
    ? (s = n, ({ x: n, y: i } = e), ({ x: t, y: e } = t))
    : "number" != typeof t && "number" == typeof e && "number" == typeof n
    ? (s = i, [n, i] = [e, n], ({ x: t, y: e } = t))
    : "number" == typeof t && "number" == typeof e && "number" != typeof n &&
      (s = i, ({ x: n, y: i } = n));
  const r = ctx.createLinearGradient(t, e, n, i);
  return s && Array.isArray(s) && s.length && s.forEach((t) => {
    try {
      Array.isArray(t)
        ? r.addColorStop(t[0], t[1])
        : t.offset && t.color && r.addColorStop(t.offset, t.color);
    } catch (e) {
      console.error(e), console.error(t);
    }
  }),
    r;
}
function createRadialGradient(t = 0, e = 0, n = 0, i = 0, s = 0, r = 200) {
  return ctx.createRadialGradient(t, e, n, i, s, r);
}
function createPattern(t, e = null) {
  return ctx.createPattern(t, e);
}
function drawImage(t, ...e) {
  const n = [];
  if (0 === e.length) n.push(0, 0);
  else {for (let t = 0; t < e.length; t += 2) {
      const i = _resolveVectorArgs(...e.slice(t, t + 2));
      n.push(...i);
    }}
  t && t instanceof AlcaImage && (t = t.image), t && ctx.drawImage(t, ...n);
}
function compensateCanvas() {
  let t = 0, e = 0;
  width % 2 && (t += .5), height % 2 && (e += .5), (t || e) && translate(t, e);
}
canvas.addEventListener("mouseenter", (t) => {
  updateMouse(t, "mouseenter"), mouseIn = !0, mouseEnterTime = t.timeStamp;
}),
  canvas.addEventListener("mouseleave", (t) => {
    updateMouse(t, "mouseleave"),
      mouseIn = mouseDown = !1,
      mouseExitTime = t.timeStamp;
  }),
  canvas.addEventListener("mousemove", (t) => {
    updateMouse(t, "mousemove"), mouseIn = !0, mouseMove = t.timeStamp;
  }),
  canvas.addEventListener("mousedown", (t) => {
    updateMouse(t, "mousedown"),
      mouseIn = mouseDown = !0,
      mouseButton = t.button,
      mouseDownTime = t.timeStamp,
      mouseDownPos = mousePos.copy();
  }),
  canvas.addEventListener("mouseup", (t) => {
    updateMouse(t, "mouseup"),
      mouseDown = !1,
      mouseButton = t.button,
      mouseUpTime = t.timeStamp,
      mouseUpPos = mousePos.copy();
  }),
  canvas.addEventListener(
    "touchstart",
    (t) => (updateMouse(t, "touchstart"), mouseIn = !0),
  ),
  canvas.addEventListener(
    "touchend",
    (t) => (updateMouse(t, "touchend"), mouseIn = mouseDown = !1),
  ),
  canvas.addEventListener(
    "touchcancel",
    (t) => (updateMouse(t, "touchcancel"), mouseIn = mouseDown = !1),
  ),
  canvas.addEventListener(
    "touchmove",
    (t) => (updateMouse(t, "touchmove"), mouseIn = !0),
  ),
  window.addEventListener("resize", _resizeCanvas),
  window.addEventListener("load", () => {
    mousePos = new Vector(),
      mousePosPrev = new Vector(),
      mouseUpPos = new Vector(),
      mouseDownPos = new Vector(),
      mouseEnterPos = new Vector(),
      mouseExitPos = new Vector(),
      Object.assign(
        _canvasOptions,
        _defaulCanvasOptions,
        "canvasOptions" in window ? window.canvasOptions : {},
      ),
      !1 === _canvasOptions.canvas && document.body.removeChild(canvas),
      _resizeCanvas(),
      "setup" in window && window.setup(),
      frameCount = 0,
      _anim = requestAnimationFrame(_draw);
  });
const compOper = {
  default: "source-over",
  sourceOver: "source-over",
  sourceIn: "source-in",
  sourceOut: "source-out",
  sourceAtop: "source-atop",
  destinationOver: "destination-over",
  destinationIn: "destination-in",
  destinationOut: "destination-out",
  destinationAtop: "destination-atop",
  lighter: "lighter",
  copy: "copy",
  xor: "xor",
  multiply: "multiply",
  screen: "screen",
  overlay: "overlay",
  darken: "darken",
  lighten: "lighten",
  colorDodge: "color-dodge",
  colorBurn: "color-burn",
  hardLight: "hard-light",
  softLight: "soft-light",
  difference: "difference",
  exclusion: "exclusion",
  hue: "hue",
  saturation: "saturation",
  color: "color",
  luminosity: "luminosity",
  source: {
    over: "source-over",
    in: "source-in",
    out: "source-out",
    atop: "source-atop",
  },
  destination: {
    over: "destination-over",
    in: "destination-in",
    out: "destination-out",
    atop: "destination-atop",
  },
  light: { hard: "hard-light", soft: "soft-light" },
};
function compositeOperation(t = compOper.default) {
  ctx.globalCompositeOperation = t;
}
function filter(t = "none") {
  ctx.filter = t || "none";
}
function beginPath() {
  ctx.beginPath();
}
function moveTo(t, e) {
  "number" == typeof t
    ? ctx.moveTo(t, e)
    : isVectorish(t) && ctx.moveTo(t.x, t.y);
}
function lineTo(t, e) {
  "number" == typeof t
    ? ctx.lineTo(t, e)
    : isVectorish(t) && ctx.lineTo(t.x, t.y);
}
function quadraticCurveTo(t, e, n, i) {
  let s = [], r = [];
  "number" == typeof t
    ? (s = [t, e], "number" == typeof n ? r = [n, i] : "x" in n && (r = n.xy))
    : "x" in t &&
      (s = t.xy, "number" == typeof e ? r = [e, n] : "x" in e && (r = e.xy)),
    ctx.quadraticCurveTo(s[0], s[1], r[0], r[1]);
}
function bezierCurveTo(t, e, n, i, s, r) {
  let o = [], a = [], u = [];
  "number" == typeof t
    ? (o = [t, e],
      "number" == typeof n
        ? (a = [n, i],
          "number" == typeof s ? u = [s, r] : "x" in s && (u = s.xy))
        : "x" in n &&
          (a = n.xy,
            "number" == typeof i ? u = [i, s] : "x" in i && (u = i.xy)))
    : "x" in t &&
      (o = t.xy,
        "number" == typeof e
          ? (a = [e, n],
            "number" == typeof i ? u = [i, s] : "x" in i && (u = i.xy))
          : "x" in e &&
            (a = e.xy,
              "number" == typeof n ? u = [n, i] : "x" in n && (u = n.xy))),
    ctx.bezierCurveTo(o[0], o[1], a[0], a[1], u[0], u[1]);
}
function closePath() {
  ctx.closePath();
}
function point(t = 0, e = 0, n = 0, i = 0, s = 0, r = 255, o = !0) {}
function line(t = 0, e = 0, n = 0, i = 0) {
  "number" == typeof t
    ? (moveTo(t, e), lineTo(n, i))
    : isVectorish(t) && (moveTo(t), lineTo(e, n));
}
function vertices(...t) {
  let e = !1;
  if (0 !== t.length) {
    1 === t.length && Array.isArray(t[0])
      ? t = t[0]
      : 2 === t.length && Array.isArray(t[0]) && "boolean" == typeof t[1] &&
        (e = t[1], t = t[0]);
    for (let n = 0; n < t.length; n++) {
      let i = t[n], s = 0, r = 0;
      Array.isArray(i) ? [s, r] = i : isVectorish(i) && ({ x: s, y: r } = i),
        e && 0 === n ? moveTo(s, r) : lineTo(s, r);
    }
  }
}
function map(t, e, n, i, s) {
  return (t - e) * (s - i) / (n - e) + i;
}
function constrain(t, e, n) {
  return max(e, min(n, t));
}
function _distSq(t, e, n, i) {
  let s = n - t, r = i - e;
  return s * s + r * r;
}
function distSq(t, e, n, i) {
  return isVectorish(t) && ([n, i] = [e, n], ({ x: t, y: e } = t)),
    isVectorish(n) && ({ x: n, y: i } = n),
    _distSq(t, e, n, i);
}
function dist(t, e, n, i) {
  let s = distSq(t, e, n, i);
  return 0 === s ? 0 : sqrt(s);
}
function cos(t, e = 1, n = 0) {
  return Math.cos(t % TAU) * e;
}
function sin(t, e = 1, n = 0) {
  return Math.sin(t % TAU) * e + n;
}
let _warning_createVector = !1;
function createVector(t, e, n) {
  return _warning_createVector ||
    (_warning_createVector = !0,
      console.warn("[Alca Canvas Warning] Hey, stop using createVector")),
    new Vector(t, e, n);
}
class Vector {
  constructor(t = 0, e = 0, n = 0) {
    this.x = t, this.y = e, this.z = n;
  }
  toString() {
    let { x: t, y: e, z: n } = this;
    return `{ x: ${t}, y: ${e}, z: ${n} }`;
  }
  static center() {
    return new Vector(width_half, height_half);
  }
  static from(t, ...e) {
    return void 0 === t
      ? new Vector()
      : Array.isArray(t)
      ? new Vector(...t)
      : "object" == typeof t
      ? new Vector(t.x, t.y, t.z)
      : "number" == typeof t
      ? new Vector(t, ...e)
      : void 0;
  }
  static random2D(t = !0, e = 1) {
    let n;
    return n = !0 === t
      ? Vector.fromAngle(random(TAU))
      : new Vector(random(-1, 1), random(-1, 1)),
      "number" == typeof t ? n.mult(t) : 1 !== e && n.mult(e),
      n;
  }
  get xy() {
    return [this.x, this.y];
  }
  get yx() {
    return [this.y, this.x];
  }
  get xz() {
    return [this.x, this.z];
  }
  get zx() {
    return [this.z, this.x];
  }
  get yz() {
    return [this.y, this.z];
  }
  get zy() {
    return [this.z, this.y];
  }
  get xyz() {
    return [this.x, this.y, this.z];
  }
  get xzy() {
    return [this.x, this.z, this.y];
  }
  get yxz() {
    return [this.y, this.x, this.z];
  }
  get yzx() {
    return [this.y, this.z, this.x];
  }
  get zyx() {
    return [this.z, this.y, this.x];
  }
  get zxy() {
    return [this.z, this.x, this.y];
  }
  get xyObject() {
    return { x: this.x, y: this.y };
  }
  get xzObject() {
    return { x: this.x, z: this.z };
  }
  get yzObject() {
    return { y: this.y, z: this.z };
  }
  get xyzObject() {
    return { x: this.x, y: this.y, z: this.z };
  }
  copy() {
    return new Vector(this.x, this.y, this.z);
  }
  get _() {
    return this.copy();
  }
  swap(t, e) {
    const n = this[t];
    return this[t] = this[e], this[e] = n, this;
  }
  swapXY() {
    return this.swap("x", "y");
  }
  swapYZ() {
    return this.swap("y", "z");
  }
  swapZX() {
    return this.swap("z", "x");
  }
  swapYX() {
    return this.swapXY();
  }
  swapZY() {
    return this.swapYZ();
  }
  swapXZ() {
    return this.swapZX();
  }
  copyWithin(t, e) {
    return this[e] = this[t], this;
  }
  copyXY() {
    return this.copyWithin("x", "y");
  }
  copyYX() {
    return this.copyWithin("y", "x");
  }
  copyYZ() {
    return this.copyWithin("y", "z");
  }
  copyZY() {
    return this.copyWithin("z", "y");
  }
  copyZX() {
    return this.copyWithin("z", "x");
  }
  copyXZ() {
    return this.copyWithin("x", "z");
  }
  equals(t, e = 0) {
    return 0 === e
      ? this.x === t.x && this.y === t.y
      : abs(this.x - t.x) < e && abs(this.y - t.y) < e;
  }
  equals3D(t = {}) {
    return this.x === t.x && this.y === t.y && this.z === t.z;
  }
  draw() {
    point(this.x, this.y);
  }
  set(t = this.x, e = this.y, n = this.z) {
    return t instanceof Vector
      ? (this.x = t.x, this.y = t.y, this.z = t.z, this)
      : (this.x = t, this.y = e, this.z = n, this);
  }
  setX(t = this.x) {
    return t instanceof Vector ? (this.x = t.x, this) : (this.x = t, this);
  }
  setY(t = this.y) {
    return t instanceof Vector ? (this.y = t.y, this) : (this.y = t, this);
  }
  setZ(t = this.z) {
    return t instanceof Vector ? (this.z = t.z, this) : (this.z = t, this);
  }
  setXY(t = this.x, e = this.y) {
    return t instanceof Vector
      ? (this.x = t.x, this.y = t.y, this)
      : (this.x = t, this.y = e, this);
  }
  setYX(...t) {
    return this.setXY(...t);
  }
  setYZ(t = this.y, e = this.z) {
    return t instanceof Vector
      ? (this.y = t.y, this.z = t.z, this)
      : (this.y = t, this.z = e, this);
  }
  setZY(...t) {
    return this.setYZ(...t);
  }
  setXZ(t = this.x, e = this.y) {
    return t instanceof Vector
      ? (this.x = t.x, this.z = t.z, this)
      : (this.x = t, this.z = e, this);
  }
  setZX(...t) {
    return this.setXZ(...t);
  }
  add(t = 0, e, n) {
    return void 0 === e ? (e = t, n = t) : void 0 === n && (n = 0),
      t instanceof Vector
        ? (this.x += t.x, this.y += t.y, this.z += t.z, this)
        : (this.x += t, this.y += e, this.z += n, this);
  }
  addX(t = 0) {
    return t instanceof Vector ? (this.x += t.x, this) : (this.x += t, this);
  }
  addY(t = 0) {
    return t instanceof Vector ? (this.y += t.y, this) : (this.y += t, this);
  }
  addZ(t = 0) {
    return t instanceof Vector ? (this.z += t.z, this) : (this.z += t, this);
  }
  addXY(t, e = t) {
    return this.addX(t).addY(e);
  }
  addYX(t, e = t) {
    return this.addXY(e, t);
  }
  addYZ(t, e = t) {
    return this.addY(t).addZ(e);
  }
  addZY(t, e = t) {
    return this.addYZ(e, t);
  }
  addZX(t, e = t) {
    return this.addZ(t).addX(e);
  }
  addXZ(t, e = t) {
    return this.addZX(t, e);
  }
  addXYZ(...t) {
    return this.add(...t);
  }
  sub(t = 0, e, n) {
    return void 0 === e ? (e = t, n = t) : void 0 === n && (n = 0),
      t instanceof Vector
        ? (this.x -= t.x, this.y -= t.y, this.z -= t.z, this)
        : (this.x -= t, this.y -= e, this.z -= n, this);
  }
  subX(t = 0) {
    return t instanceof Vector ? (this.x -= t.x, this) : (this.x -= t, this);
  }
  subY(t = 0) {
    return t instanceof Vector ? (this.y -= t.y, this) : (this.y -= t, this);
  }
  subZ(t = 0) {
    return t instanceof Vector ? (this.z -= t.z, this) : (this.z -= t, this);
  }
  subXY(t, e = t) {
    return this.subX(t).subY(e);
  }
  subYX(t, e = t) {
    return this.subXY(e, t);
  }
  subYZ(t, e = t) {
    return this.subY(t).subZ(e);
  }
  subZY(t, e = t) {
    return this.subYZ(e, t);
  }
  subZX(t, e = t) {
    return this.subZ(t).subX(e);
  }
  subXZ(t, e = t) {
    return this.subZX(t, e);
  }
  subXYZ(...t) {
    return this.sub(...t);
  }
  mult(t = 1, e = t, n = t) {
    return t instanceof Vector
      ? (this.x *= t.x, this.y *= t.y, this.z *= t.z, this)
      : (this.x *= t, this.y *= e, this.z *= n, this);
  }
  multX(t = 1) {
    return t instanceof Vector ? (this.x *= t.x, this) : (this.x *= t, this);
  }
  multY(t = 1) {
    return t instanceof Vector ? (this.y *= t.y, this) : (this.y *= t, this);
  }
  multZ(t = 1) {
    return t instanceof Vector ? (this.z *= t.z, this) : (this.z *= t, this);
  }
  multXY(t, e = t) {
    return this.multX(t).multY(e);
  }
  multYX(t, e = t) {
    return this.multXY(e, t);
  }
  multYZ(t, e = t) {
    return this.multY(t).multZ(e);
  }
  multZY(t, e = t) {
    return this.multYZ(e, t);
  }
  multZX(t, e = t) {
    return this.multZ(t).multX(e);
  }
  multXZ(t, e = t) {
    return this.multZX(t, e);
  }
  multXYZ(...t) {
    return this.mult(...t);
  }
  div(t = 1, e = t, n = t) {
    return t instanceof Vector
      ? (this.x /= t.x, this.y /= t.y, this.z /= t.z, this)
      : (this.x /= t, this.y /= e, this.z /= n, this);
  }
  divX(t = 1) {
    return t instanceof Vector ? (this.x /= t.x, this) : (this.x /= t, this);
  }
  divY(t = 1) {
    return t instanceof Vector ? (this.y /= t.y, this) : (this.y /= t, this);
  }
  divZ(t = 1) {
    return t instanceof Vector ? (this.z /= t.z, this) : (this.z /= t, this);
  }
  divXY(t, e = t) {
    return this.divX(t).divY(e);
  }
  divYX(t, e = t) {
    return this.divXY(e, t);
  }
  divYZ(t, e = t) {
    return this.divY(t).divZ(e);
  }
  divZY(t, e = t) {
    return this.divYZ(e, t);
  }
  divZX(t, e = t) {
    return this.divZ(t).divX(e);
  }
  divXZ(t, e = t) {
    return this.divZX(t, e);
  }
  divXYZ(...t) {
    return this.div(...t);
  }
  mod(t, e, n) {
    return void 0 === t
      ? this
      : t instanceof Vector
      ? (this.x %= t.x, this.y %= t.y, this.z %= t.z, this)
      : (this.x %= t,
        this.y %= void 0 === e ? t : e,
        this.z %= void 0 === n ? t : e,
        this);
  }
  min(t = this.x, e = this.y, n = this.z) {
    return t instanceof Vector
      ? (this.x = min(this.x, t.x),
        this.y = min(this.y, t.y),
        this.z = min(this.z, t.z),
        this)
      : (this.x = min(this.x, t),
        this.y = min(this.y, e),
        this.z = min(this.z, n),
        this);
  }
  max(t = this.x, e = this.y, n = this.z) {
    return t instanceof Vector
      ? (this.x = max(this.x, t.x),
        this.y = max(this.y, t.y),
        this.z = max(this.z, t.z),
        this)
      : (this.x = max(this.x, t),
        this.y = max(this.y, e),
        this.z = max(this.z, n),
        this);
  }
  minX(t) {
    return this.x = min(this.x, t instanceof Vector ? t.x : t), this;
  }
  minY(t) {
    return this.y = min(this.y, t instanceof Vector ? t.y : t), this;
  }
  minZ(t) {
    return this.z = min(this.z, t instanceof Vector ? t.z : t), this;
  }
  maxX(t) {
    return this.x = max(this.x, t instanceof Vector ? t.x : t), this;
  }
  maxY(t) {
    return this.y = max(this.y, t instanceof Vector ? t.y : t), this;
  }
  maxZ(t) {
    return this.z = max(this.z, t instanceof Vector ? t.z : t), this;
  }
magSq() {
    return this.x * this.x + this.y * this.y;
  }
  magSq3D() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  mag() {
    return Math.sqrt(this.magSq());
  }
  mag3D() {
    return Math.sqrt(this.magSq3D());
  }
  normalize(t = this.mag()) {
    return 0 === t ? this : this.div(t);
  }
  normalize3D(t = this.mag3D()) {
    return 0 === t ? this : this.div(t);
  }
  setMag(t) {
    return this.normalize().mult(t);
  }
  setMag3D(t) {
    return this.normalize3D().mult(t);
  }
  cross(t) {
    return new Vector(
      this.y * t.z - this.z * t.y,
      this.z * t.x - this.x * t.z,
      this.x * t.y - this.y * t.x,
    );
  }
  dist(t, e) {
    return t instanceof Vector
      ? t.copy().sub(this).mag()
      : ("object" == typeof t && "x" in t && ({ x: t, y: e } = t),
        dist(this.x, this.y, t, e));
  }
  dist3D(t) {
    return t.copy().sub(this).mag3D();
  }
  round() {
    return this.x = round(this.x),
      this.y = round(this.y),
      this.z = round(this.z),
      this;
  }
  floor() {
    return this.x = floor(this.x),
      this.y = floor(this.y),
      this.z = floor(this.z),
      this;
  }
  fastFloor() {
    return this.x = ~~this.x, this.y = ~~this.y, this.z = ~~this.z, this;
  }
  ceil() {
    return this.x = ceil(this.x),
      this.y = ceil(this.y),
      this.z = ceil(this.z),
      this;
  }
}
function linearTween(t = .5, e = 0, n = 1, i = 1) {
  return n * t / i + e;
}
function easeInQuad(t = .5, e = 0, n = 1, i = 1) {
  return n * (t /= i) * t + e;
}
function easeOutQuad(t = .5, e = 0, n = 1, i = 1) {
  return -n * (t /= i) * (t - 2) + e;
}
function easeInOutQuad(t = .5, e = 0, n = 1, i = 1) {
  return (t /= .5 * i) < 1
    ? .5 * n * t * t + e
    : .5 * -n * (--t * (t - 2) - 1) + e;
}
function easeInCubic(t = .5, e = 0, n = 1, i = 1) {
  return n * (t /= i) * t * t + e;
}
function easeOutCubic(t = .5, e = 0, n = 1, i = 1) {
  return t /= i, n * (--t * t * t + 1) + e;
}
function easeInOutCubic(t = .5, e = 0, n = 1, i = 1) {
  return (t /= .5 * i) < 1
    ? .5 * n * t * t * t + e
    : .5 * n * ((t -= 2) * t * t + 2) + e;
}
function easeInQuart(t = .5, e = 0, n = 1, i = 1) {
  return n * (t /= i) * t * t * t + e;
}
function easeOutQuart(t = .5, e = 0, n = 1, i = 1) {
  return t /= i, -n * (--t * t * t * t - 1) + e;
}
function easeInOutQuart(t = .5, e = 0, n = 1, i = 1) {
  return (t /= .5 * i) < 1
    ? .5 * n * t * t * t * t + e
    : .5 * -n * ((t -= 2) * t * t * t - 2) + e;
}
function easeInQuint(t = .5, e = 0, n = 1, i = 1) {
  return n * (t /= i) * t * t * t * t + e;
}
function easeOutQuint(t = .5, e = 0, n = 1, i = 1) {
  return t /= i, n * (--t * t * t * t * t + 1) + e;
}
function easeInOutQuint(t = .5, e = 0, n = 1, i = 1) {
  return (t /= .5 * i) < 1
    ? .5 * n * t * t * t * t * t + e
    : .5 * n * ((t -= 2) * t * t * t * t + 2) + e;
}
function easeInSine(t = .5, e = 0, n = 1, i = 1) {
  return -n * cos(t / i * HALF_PI) + n + e;
}
function easeOutSine(t = .5, e = 0, n = 1, i = 1) {
  return n * sin(t / i * HALF_PI) + e;
}
function easeInOutSine(t = .5, e = 0, n = 1, i = 1) {
  return .5 * -n * (cos(PI * t / i) - 1) + e;
}
function easeInExpo(t = .5, e = 0, n = 1, i = 1) {
  return n * pow(2, 10 * (t / i - 1)) + e;
}
function easeOutExpo(t = .5, e = 0, n = 1, i = 1) {
  return n * (1 - pow(2, -10 * t / i)) + e;
}
function easeInOutExpo(t = .5, e = 0, n = 1, i = 1) {
  return (t /= .5 * i) < 1
    ? .5 * n * pow(2, 10 * (t - 1)) + e
    : .5 * n * (2 - pow(2, -10 * --t)) + e;
}
function easeInCirc(t = .5, e = 0, n = 1, i = 1) {
  return -n * (sqrt(1 - (t /= i) * t) - 1) + e;
}
function easeOutCirc(t = .5, e = 0, n = 1, i = 1) {
  return t /= i, n * sqrt(1 - --t * t) + e;
}
function easeInOutCirc(t = .5, e = 0, n = 1, i = 1) {
  return (t /= .5 * i) < 1
    ? .5 * -n * (sqrt(1 - t * t) - 1) + e
    : .5 * n * (sqrt(1 - (t -= 2) * t) + 1) + e;
}
const ease = {
  linearTween: linearTween,
  easeInQuad: easeInQuad,
  easeOutQuad: easeOutQuad,
  easeInOutQuad: easeInOutQuad,
  easeInCubic: easeInCubic,
  easeOutCubic: easeOutCubic,
  easeInOutCubic: easeInOutCubic,
  easeInQuart: easeInQuart,
  easeOutQuart: easeOutQuart,
  easeInOutQuart: easeInOutQuart,
  easeInQuint: easeInQuint,
  easeOutQuint: easeOutQuint,
  easeInOutQuint: easeInOutQuint,
  easeInSine: easeInSine,
  easeOutSine: easeOutSine,
  easeInOutSine: easeInOutSine,
  easeInExpo: easeInExpo,
  easeOutExpo: easeOutExpo,
  easeInOutExpo: easeInOutExpo,
  easeInCirc: easeInCirc,
  easeOutCirc: easeOutCirc,
  easeInOutCirc: easeInOutCirc,
  in: {
    linear: linearTween,
    quad: easeInQuad,
    cubic: easeInCubic,
    quart: easeInQuart,
    quint: easeInQuint,
    sine: easeInSine,
    expo: easeInExpo,
    circ: easeInCirc,
  },
  out: {
    linear: linearTween,
    quad: easeOutQuad,
    cubic: easeOutCubic,
    quart: easeOutQuart,
    quint: easeOutQuint,
    sine: easeOutSine,
    expo: easeOutExpo,
    circ: easeOutCirc,
  },
  inOut: {
    linear: linearTween,
    quad: easeInOutQuad,
    cubic: easeInOutCubic,
    quart: easeInOutQuart,
    quint: easeInOutQuint,
    sine: easeInOutSine,
    expo: easeInOutExpo,
    circ: easeInOutCirc,
  },
  linear: Object.assign(linearTween, {
    in: linearTween,
    out: linearTween,
    inOut: linearTween,
  }),
  quad: { in: easeInQuad, out: easeOutQuad, inOut: easeInOutQuad },
  cubic: { in: easeInCubic, out: easeOutCubic, inOut: easeInOutCubic },
  quart: { in: easeInQuart, out: easeOutQuart, inOut: easeInOutQuart },
  quint: { in: easeInQuint, out: easeOutQuint, inOut: easeInOutQuint },
  sine: { in: easeInSine, out: easeOutSine, inOut: easeInOutSine },
  expo: { in: easeInExpo, out: easeOutExpo, inOut: easeInOutExpo },
  circ: { in: easeInCirc, out: easeOutCirc, inOut: easeInOutCirc },
};
function getTimeArray(t = null) {
  if (null === t) t = new Date();
  else if ("string" == typeof t || "number" == typeof t) {
    let e = Date.parse(t);
    if (isNaN(e)) throw new RangeError("Invalid Date");
    t = new Date(e);
  } else if (!(t instanceof Date)) throw new TypeError("Unsupported timestamp");
  return [t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()];
}
function push() {
  ctx.save();
}
function pop() {
  ctx.restore();
}
function translateCenter(t = 0, e = 0) {
  ctx.translate(width_half + t, height_half + e);
}
