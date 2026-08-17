import { useEffect, useRef } from "react";

const DPR_LIMIT = 2;
const N_MAX = 3500;
const ALPHA_STEPS = 20;
const MUMBAI = { x: 0.1632, y: 0.6222 };

const INDIA_OUTLINE = [
  [0.2886,0.9744],[0.1848,0.7309],[0.1606,0.6282],[0.1641,0.5703],[0.1506,0.523],
  [0.1656,0.5109],[0.1461,0.5101],[0.1371,0.5488],[0.0932,0.5664],[0.0286,0.5103],
  [0.0692,0.5019],[0.0894,0.4799],[0.045,0.493],[0.0,0.4629],[0.0227,0.4416],
  [0.1007,0.4395],[0.0879,0.3938],[0.0683,0.3847],[0.0708,0.3635],[0.0482,0.3569],
  [0.0508,0.3416],[0.0776,0.3129],[0.0959,0.3234],[0.1291,0.3163],[0.2257,0.207],
  [0.2211,0.1805],[0.2487,0.1686],[0.1888,0.1371],[0.1807,0.0927],[0.2066,0.0677],
  [0.1515,0.0393],[0.1717,0.0127],[0.2474,0.0],[0.3189,0.0532],[0.3852,0.0366],
  [0.4164,0.05],[0.4089,0.0809],[0.3691,0.1065],[0.372,0.1287],[0.3879,0.1313],
  [0.3938,0.1493],[0.3717,0.1632],[0.3518,0.1567],[0.3652,0.199],[0.3771,0.1945],
  [0.4422,0.2368],[0.419,0.2531],[0.4088,0.2844],[0.4999,0.3311],[0.5465,0.3301],
  [0.6067,0.3629],[0.681,0.369],[0.6869,0.3154],[0.7087,0.3136],[0.7045,0.3432],
  [0.7184,0.3547],[0.8185,0.3533],[0.8039,0.3202],[0.8357,0.3195],[0.9081,0.2674],
  [0.9345,0.2775],[0.9562,0.2628],[0.9739,0.2859],[0.9639,0.3001],[1.0,0.3058],
  [0.9826,0.3261],[0.9929,0.3431],[0.9636,0.3378],[0.9211,0.367],[0.8902,0.4571],
  [0.8593,0.4511],[0.8641,0.4788],[0.8486,0.5205],[0.837,0.5207],[0.8256,0.4613],
  [0.802,0.4876],[0.7878,0.4658],[0.831,0.4162],[0.7425,0.4069],[0.7389,0.3767],
  [0.7259,0.3822],[0.6935,0.3603],[0.6833,0.3885],[0.7136,0.4077],[0.6808,0.4279],
  [0.7052,0.443],[0.6991,0.4617],[0.7164,0.5228],[0.6887,0.5364],[0.6873,0.5175],
  [0.6827,0.512],[0.6798,0.5126],[0.6783,0.5269],[0.644,0.5433],[0.6476,0.5655],
  [0.6242,0.5909],[0.5672,0.6208],[0.4858,0.6921],[0.4856,0.7094],[0.4173,0.7383],
  [0.4018,0.9266],[0.3815,0.9285],[0.3689,0.9548],[0.3827,0.9625],[0.3513,0.9678],
  [0.3312,1.0],[0.312,0.9994]
];

const COLOR_CACHE = [[255, 255, 255], [255, 255, 255], [56, 189, 248]].map(([r, g, b]) =>
  Array.from({ length: ALPHA_STEPS + 1 }, (_, a) => `rgba(${r},${g},${b},${(a / ALPHA_STEPS).toFixed(2)})`)
);

function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export default function IntroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    let W = 0, H = 0, cx = 0, cy = 0, N = 0;
    let mapScale = 0, mapOriginX = 0, mapOriginY = 0;
    let stage = 1, sphereAngle = 0, stageEnteredAt = performance.now();
    let radarRings = [], radarAcc = 0, rafId = null, autoTimer = null;

    const DPR = Math.min(window.devicePixelRatio || 1, DPR_LIMIT);

    const pos = new Float32Array(N_MAX * 2);
    const vel = new Float32Array(N_MAX * 2);
    const tgt = new Float32Array(N_MAX * 2);
    const sphere = new Float32Array(N_MAX * 3);
    const indiaTgt = new Float32Array(N_MAX * 2);
    const gridTgt = new Float32Array(N_MAX * 2);
    const size = new Float32Array(N_MAX).fill(1);
    const tsize = new Float32Array(N_MAX).fill(1);
    const opacity = new Float32Array(N_MAX);
    const topacity = new Float32Array(N_MAX).fill(0.4);
    const colorKey = new Uint8Array(N_MAX);

    const binHeads = new Int32Array(3 * (ALPHA_STEPS + 1));
    const nextInBin = new Int32Array(N_MAX);

    // Final Grid settings (Jaise image me box grid hai)
    const GRID_SIZE = 55;

    function buildTargets() {
      N = Math.max(600, Math.min(N_MAX, Math.round((W * H) / 324)));
      const cols = Math.max(1, Math.round(W / GRID_SIZE));
      const rows = Math.max(1, Math.round(H / GRID_SIZE));
      const phi = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < N; i++) {
        pos[i * 2] = cx + (Math.random() - 0.5) * W;
        pos[i * 2 + 1] = cy + (Math.random() - 0.5) * H;

        const y = 1 - (i / (N - 1)) * 2;
        const rad = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = phi * i;
        sphere[i * 3] = Math.cos(theta) * rad;
        sphere[i * 3 + 1] = y;
        sphere[i * 3 + 2] = Math.sin(theta) * rad;

        let found = false;
        for (let attempts = 0; attempts < 100; attempts++) {
          const rx = Math.random(), ry = Math.random();
          if (pointInPolygon(rx, ry, INDIA_OUTLINE)) {
            indiaTgt[i * 2] = rx;
            indiaTgt[i * 2 + 1] = ry;
            found = true;
            break;
          }
        }
        if (!found) {
          indiaTgt[i * 2] = MUMBAI.x;
          indiaTgt[i * 2 + 1] = MUMBAI.y;
        }

        // Intersections of Grid Lines
        gridTgt[i * 2] = (i % cols) * GRID_SIZE;
        gridTgt[i * 2 + 1] = Math.floor(i / cols) * GRID_SIZE;
      }
    }

    function applyStaticTargets() {
      const pinX = mapOriginX + MUMBAI.x * mapScale;
      const pinY = mapOriginY + MUMBAI.y * mapScale;

      for (let i = 0; i < N; i++) {
        const i2 = i * 2;
        if (stage === 2) {
          tgt[i2] = mapOriginX + indiaTgt[i2] * mapScale;
          tgt[i2 + 1] = mapOriginY + indiaTgt[i2 + 1] * mapScale;
          tsize[i] = 0.42;
          topacity[i] = 0.8;
          colorKey[i] = 1;
        } else if (stage === 3) {
          const tx = indiaTgt[i2], ty = indiaTgt[i2 + 1];
          const isMumbai = Math.hypot(tx - MUMBAI.x, ty - MUMBAI.y) < 0.045;

          if (isMumbai) {
            const ang = ((i * 137.5) % 360) * (Math.PI / 180);
            const rad = 3 + (i % 5) * 1.4;
            tgt[i2] = pinX + Math.cos(ang) * rad;
            tgt[i2 + 1] = pinY + Math.sin(ang) * rad;
            tsize[i] = 0.65;
            topacity[i] = 0.95;
            colorKey[i] = 2;
          } else {
            tgt[i2] = mapOriginX + tx * mapScale;
            tgt[i2 + 1] = mapOriginY + ty * mapScale;
            tsize[i] = 0.32;
            topacity[i] = 0.16;
            colorKey[i] = 0;
          }
        } else if (stage === 4) {
          // Dots grid ke points par snap hote hue fade-out ho jayenge
          tgt[i2] = gridTgt[i2];
          tgt[i2 + 1] = gridTgt[i2 + 1];
          tsize[i] = 0.1;
          topacity[i] = 0.0;
          colorKey[i] = 0;
        }
      }
    }

    function setStage(n) {
      stage = n;
      stageEnteredAt = performance.now();
      if (stage !== 1) applyStaticTargets();
    }

    function runSequence() {
      const seq = [1, 2, 3, 4];
      const hold = [5000, 3000, 3500, 4000];
      let idx = 0;

      const next = () => {
        setStage(seq[idx]);
        autoTimer = setTimeout(() => {
          if (++idx < seq.length) next();
        }, hold[idx]);
      };
      next();
    }

    function drawFinalGridLines() {
      if (stage !== 4) return;
      const elapsed = performance.now() - stageEnteredAt;
      const fade = Math.min(1, Math.max(0, elapsed / 800));

      ctx.save();
      // Image jaisa dark subtle grid border
      ctx.strokeStyle = `rgba(255, 255, 255, ${(0.05 * fade).toFixed(3)})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();

      for (let x = 0; x <= W; x += GRID_SIZE) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H);
      }
      for (let y = 0; y <= H; y += GRID_SIZE) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(W, y + 0.5);
      }
      ctx.stroke();
      ctx.restore();
    }

    function drawHUD(pinX, pinY) {
      const settle = Math.min(1, (performance.now() - stageEnteredAt) / 900);
      if (++radarAcc > 55) {
        radarAcc = 0;
        radarRings.push({ r: 2, o: 0.55 });
      }

      ctx.lineWidth = 1;
      radarRings = radarRings.filter((ring) => {
        ring.r += 0.55;
        ring.o -= 0.007;
        if (ring.o <= 0) return false;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56,189,248,${ring.o.toFixed(2)})`;
        ctx.arc(pinX, pinY, ring.r, 0, Math.PI * 2);
        ctx.stroke();
        return true;
      });

      const lX = pinX + 46, lY = pinY - 46;
      ctx.strokeStyle = `rgba(56,189,248,${(0.5 * settle).toFixed(2)})`;
      ctx.beginPath();
      ctx.moveTo(pinX + 4, pinY - 4);
      ctx.lineTo(lX - 4, lY + 6);
      ctx.stroke();

      ctx.fillStyle = `rgba(56,189,248,${settle.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(pinX, pinY, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(244,244,245,${settle.toFixed(2)})`;
      ctx.font = "500 11px monospace";
      ctx.fillText("MUMBAI, INDIA", lX, lY);

      ctx.fillStyle = `rgba(113,113,122,${settle.toFixed(2)})`;
      ctx.font = "400 9px monospace";
      ctx.fillText("19.0760° N, 72.8777° E", lX, lY + 14);
    }

    function loop() {
      if (stage === 1) {
        sphereAngle += 0.0032;
        const R = Math.min(W, H) * 0.3;
        const cosA = Math.cos(sphereAngle), sinA = Math.sin(sphereAngle);

        for (let i = 0; i < N; i++) {
          const sx = sphere[i * 3], sy = sphere[i * 3 + 1], sz = sphere[i * 3 + 2];
          const xr = sx * cosA - sz * sinA;
          const zr = sx * sinA + sz * cosA;
          const depth = (zr + 1) * 0.5;

          tgt[i * 2] = cx + xr * R;
          tgt[i * 2 + 1] = cy + sy * R;
          tsize[i] = 0.35 + depth * 0.32;
          topacity[i] = 0.15 + depth * 0.8;
          colorKey[i] = 0;
        }
      }

      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, W, H);
      binHeads.fill(-1);

      for (let i = 0; i < N; i++) {
        const id = i * 2;
        vel[id] = (vel[id] + (tgt[id] - pos[id]) * 0.055) * 0.82;
        vel[id + 1] = (vel[id + 1] + (tgt[id + 1] - pos[id + 1]) * 0.055) * 0.82;
        pos[id] += vel[id];
        pos[id + 1] += vel[id + 1];

        size[i] += (tsize[i] - size[i]) * 0.08;
        opacity[i] += (topacity[i] - opacity[i]) * 0.06;

        const aLevel = Math.min(ALPHA_STEPS, Math.max(0, (opacity[i] * ALPHA_STEPS + 0.5) | 0));
        const binIdx = colorKey[i] * (ALPHA_STEPS + 1) + aLevel;
        nextInBin[i] = binHeads[binIdx];
        binHeads[binIdx] = i;
      }

      for (let c = 0; c < 3; c++) {
        const offset = c * (ALPHA_STEPS + 1);
        for (let a = 1; a <= ALPHA_STEPS; a++) {
          let pIdx = binHeads[offset + a];
          if (pIdx === -1) continue;

          ctx.fillStyle = COLOR_CACHE[c][a];
          ctx.beginPath();
          while (pIdx !== -1) {
            const s = size[pIdx];
            ctx.rect(pos[pIdx * 2] - s * 0.5, pos[pIdx * 2 + 1] - s * 0.5, s, s);
            pIdx = nextInBin[pIdx];
          }
          ctx.fill();
        }
      }

      if (stage === 3) drawHUD(mapOriginX + MUMBAI.x * mapScale, mapOriginY + MUMBAI.y * mapScale);
      if (stage === 4) drawFinalGridLines();

      rafId = requestAnimationFrame(loop);
    }

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      cx = W * 0.5;
      cy = H * 0.5;
      mapScale = Math.min(W * 0.62, H * 0.86);
      mapOriginX = cx - mapScale * 0.47;
      mapOriginY = cy - mapScale * 0.53;

      buildTargets();
      if (stage !== 1) applyStaticTargets();
    }

    window.addEventListener("resize", resize);
    resize();
    setStage(1);
    rafId = requestAnimationFrame(loop);
    const startTimer = setTimeout(runSequence, 300);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      clearTimeout(autoTimer);
      clearTimeout(startTimer);
    };
  }, []);

  return (
    <section className="fixed inset-0 -z-10 overflow-hidden bg-[#09090b]">
      <canvas ref={canvasRef} className="absolute left-0 top-0 z-0" />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(9,9,11,0) 40%, rgba(9,9,11,0.55) 85%, rgba(9,9,11,0.85) 100%)",
        }}
      />
    </section>
  );
}