let noise = new SimplexNoise();
function draw(t) {
  let e = .001 * t,
    n = ctx.createLinearGradient(-width, 0, width, height),
    i = e % 1,
    s = 0 === floor(e % 2),
    r = s ? 210 : 340,
    o = hsl(s ? 340 : 210, 100, 50),
    a = hsl(r, 100, 50);
  n.addColorStop(map(i, 0, 1, THIRD, ZERO), o),
    n.addColorStop(map(i, 0, 1, TWO_THIRDS, THIRD), a),
    n.addColorStop(map(i, 0, 1, ONE, TWO_THIRDS), o),
    ctx.globalAlpha = map(cos(e), -1, 1, .15, .3),
    background(n),
    ctx.globalAlpha = 1,
    beginPath();
  for (let t = 0; t < 80; t++) {
    let n = .1 * cos(t * (1 / 79) * TAU + e);
    for (let t = 0; t < 35; t++) {
      let i = t * (1 / 34), s = noise.noise3D(i, e, n);
      (t ? lineTo : moveTo)(
        i * (width + 20) - width_half - 10,
        s * height_half,
      );
    }
    e += .01;
  }
  compositeOperation(compOper.lighter),
    ctx.filter = "blur(10px)",
    stroke(n, 5),
    ctx.filter = "blur(5px)",
    stroke(hsl(0, 0, 100, .8), 2);
}
