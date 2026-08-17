import { useEffect, useRef } from "react";

const COLORS = {
  bg: "#09090b",
  base: "#ffffff",
  active: "#ffffff",
  cyan: "#ffffff",
};

const COLOR_INDEX = { base: 0, active: 1, cyan: 2 };
const INDIA_OUTLINE = [[0.2886,0.9744],[0.1848,0.7309],[0.1606,0.6282],[0.1641,0.5703],[0.1506,0.523],[0.1656,0.5109],[0.1461,0.5101],[0.1371,0.5488],[0.0932,0.5664],[0.0286,0.5103],[0.0692,0.5019],[0.0894,0.4799],[0.045,0.493],[0.0,0.4629],[0.0227,0.4416],[0.1007,0.4395],[0.0879,0.3938],[0.0683,0.3847],[0.0708,0.3635],[0.0482,0.3569],[0.0508,0.3416],[0.0776,0.3129],[0.0959,0.3234],[0.1291,0.3163],[0.2257,0.207],[0.2211,0.1805],[0.2487,0.1686],[0.1888,0.1371],[0.1807,0.0927],[0.2066,0.0677],[0.1515,0.0393],[0.1717,0.0127],[0.2474,0.0],[0.3189,0.0532],[0.3852,0.0366],[0.4164,0.05],[0.4089,0.0809],[0.3691,0.1065],[0.372,0.1287],[0.3879,0.1313],[0.3938,0.1493],[0.3717,0.1632],[0.3518,0.1567],[0.3652,0.199],[0.3771,0.1945],[0.4422,0.2368],[0.419,0.2531],[0.4088,0.2844],[0.4999,0.3311],[0.5465,0.3301],[0.6067,0.3629],[0.681,0.369],[0.6869,0.3154],[0.7087,0.3136],[0.7045,0.3432],[0.7184,0.3547],[0.8185,0.3533],[0.8039,0.3202],[0.8357,0.3195],[0.9081,0.2674],[0.9345,0.2775],[0.9562,0.2628],[0.9739,0.2859],[0.9639,0.3001],[1.0,0.3058],[0.9826,0.3261],[0.9929,0.3431],[0.9636,0.3378],[0.9211,0.367],[0.8902,0.4571],[0.8593,0.4511],[0.8641,0.4788],[0.8486,0.5205],[0.837,0.5207],[0.8256,0.4613],[0.802,0.4876],[0.7878,0.4658],[0.831,0.4162],[0.7425,0.4069],[0.7389,0.3767],[0.7259,0.3822],[0.6935,0.3603],[0.6833,0.3885],[0.7136,0.4077],[0.6808,0.4279],[0.7052,0.443],[0.6991,0.4617],[0.7164,0.5228],[0.6887,0.5364],[0.6873,0.5175],[0.6827,0.512],[0.6798,0.5126],[0.6783,0.5269],[0.644,0.5433],[0.6476,0.5655],[0.6242,0.5909],[0.5672,0.6208],[0.4858,0.6921],[0.4856,0.7094],[0.4173,0.7383],[0.4018,0.9266],[0.3815,0.9285],[0.3689,0.9548],[0.3827,0.9625],[0.3513,0.9678],[0.3312,1.0],[0.312,0.9994]];
const MUMBAI_NORM = { x: 0.1632, y: 0.6222 };

function hexToRgb(hex) {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

// Pre-calculate 21 opacity levels (0 to 1, steps of 0.05) for 3 colors
const ALPHA_STEPS = 20;
const colorCache = [[], [], []];
[COLORS.base, COLORS.active, COLORS.cyan].forEach((hex, i) => {
  const rgb = hexToRgb(hex);
  for (let a = 0; a <= ALPHA_STEPS; a++) {
    colorCache[i].push(`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(a / ALPHA_STEPS).toFixed(2)})`);
  }
});

function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export default function IntroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // Disable alpha channel for massive paint perf

    let W = 0, H = 0, cx = 0, cy = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2); 
    
    const N_MAX = 4000;
    let N = 0;
    let mapScale = 0, mapOriginX = 0, mapOriginY = 0;

    // Typed Arrays (Data-Oriented Design) - Zero GC footprint
    const pos = new Float32Array(N_MAX * 2);
    const vel = new Float32Array(N_MAX * 2);
    const tgt = new Float32Array(N_MAX * 2);
    const sphere = new Float32Array(N_MAX * 3);
    const indiaTgt = new Float32Array(N_MAX * 2);
    const gridTgt = new Float32Array(N_MAX * 2);
    
    const size = new Float32Array(N_MAX);
    const tsize = new Float32Array(N_MAX);
    const opacity = new Float32Array(N_MAX);
    const topacity = new Float32Array(N_MAX);
    const colorKey = new Uint8Array(N_MAX);

    // Linked-list bins for batch rendering
    const binHeads = new Int32Array(3 * (ALPHA_STEPS + 1));
    const nextInBin = new Int32Array(N_MAX);

    function buildTargets() {
      const GRID_SPACING = 18;
      N = Math.max(600, Math.min(N_MAX, Math.round((W * H) / (GRID_SPACING * GRID_SPACING))));

      let minX = 1, maxX = 0, minY = 1, maxY = 0;
      INDIA_OUTLINE.forEach(p => {
        if(p[0] < minX) minX = p[0]; if(p[0] > maxX) maxX = p[0];
        if(p[1] < minY) minY = p[1]; if(p[1] > maxY) maxY = p[1];
      });

      const cols = Math.max(1, Math.round(Math.sqrt(N * (W / H))));
      const rows = Math.max(1, Math.ceil(N / cols));

      const phi = Math.PI * (3 - Math.sqrt(5));
      let indiaCount = 0;

      for (let i = 0; i < N; i++) {
        pos[i*2] = cx + (Math.random() - 0.5) * W;
        pos[i*2+1] = cy + (Math.random() - 0.5) * H;
        size[i] = 1; tsize[i] = 1;
        opacity[i] = 0; topacity[i] = 0.4;
        
        const y = 1 - (i / (N - 1)) * 2;
        const radius = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = phi * i;
        sphere[i*3] = Math.cos(theta) * radius;
        sphere[i*3+1] = y;
        sphere[i*3+2] = Math.sin(theta) * radius;

        let attempts = 0;
        while(attempts++ < 200) {
          const rx = minX + Math.random() * (maxX - minX);
          const ry = minY + Math.random() * (maxY - minY);
          if (pointInPolygon(rx, ry, INDIA_OUTLINE)) {
            indiaTgt[i*2] = rx; indiaTgt[i*2+1] = ry;
            indiaCount++;
            break;
          }
        }
        if (attempts >= 200) { indiaTgt[i*2] = MUMBAI_NORM.x; indiaTgt[i*2+1] = MUMBAI_NORM.y; }

        gridTgt[i*2] = ((i % cols) + 0.5) / cols;
        gridTgt[i*2+1] = (Math.floor(i / cols) + 0.5) / rows;
      }
      
      // Shuffle targets
      for (let i = N - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tx = indiaTgt[i*2], ty = indiaTgt[i*2+1];
        indiaTgt[i*2] = indiaTgt[j*2]; indiaTgt[i*2+1] = indiaTgt[j*2+1];
        indiaTgt[j*2] = tx; indiaTgt[j*2+1] = ty;

        const gx = gridTgt[i*2], gy = gridTgt[i*2+1];
        gridTgt[i*2] = gridTgt[j*2]; gridTgt[i*2+1] = gridTgt[j*2+1];
        gridTgt[j*2] = gx; gridTgt[j*2+1] = gy;
      }
    }

    let stage = 1, sphereAngle = 0, stageEnteredAt = performance.now();
    let autoSequenceActive = false, autoTimer = null;

    function applyStaticTargets() {
      if (stage === 2) {
        for (let i = 0; i < N; i++) {
          tgt[i*2] = mapOriginX + indiaTgt[i*2] * mapScale;
          tgt[i*2+1] = mapOriginY + indiaTgt[i*2+1] * mapScale;
          tsize[i] = 0.42; topacity[i] = 0.75 + Math.random() * 0.05; colorKey[i] = COLOR_INDEX.active;
        }
      } else if (stage === 3) {
        const pinX = mapOriginX + MUMBAI_NORM.x * mapScale;
        const pinY = mapOriginY + MUMBAI_NORM.y * mapScale;
        for (let i = 0; i < N; i++) {
          const tx = indiaTgt[i*2], ty = indiaTgt[i*2+1];
          const dToMumbai = Math.hypot(tx - MUMBAI_NORM.x, ty - MUMBAI_NORM.y);
          if (dToMumbai < 0.045) {
            const ang = ((i * 137.5) % 360) * (Math.PI / 180);
            const rad = 3 + (i % 5) * 1.4;
            tgt[i*2] = pinX + Math.cos(ang) * rad; tgt[i*2+1] = pinY + Math.sin(ang) * rad;
            tsize[i] = 0.65; topacity[i] = 0.95; colorKey[i] = COLOR_INDEX.cyan;
          } else {
            tgt[i*2] = mapOriginX + tx * mapScale; tgt[i*2+1] = mapOriginY + ty * mapScale;
            tsize[i] = 0.32; topacity[i] = 0.16; colorKey[i] = COLOR_INDEX.base;
          }
        }
      } else if (stage === 4) {
        for (let i = 0; i < N; i++) {
          tgt[i*2] = gridTgt[i*2] * W; tgt[i*2+1] = gridTgt[i*2+1] * H;
          tsize[i] = 0.4; topacity[i] = 0.3; colorKey[i] = COLOR_INDEX.base;
        }
      }
    }

    function setStage(n) {
      stage = n; stageEnteredAt = performance.now();
      if (stage !== 1) applyStaticTargets();
    }

    function runAutoSequence() {
      autoSequenceActive = true;
      const seq = [1, 2, 3, 4], holdTimes = [5500, 3200, 3200, 3200];
      let idx = 0;
      
      const next = () => {
        if (!autoSequenceActive) return;
        setStage(seq[idx]);
        autoTimer = setTimeout(() => {
          idx++; if (idx < seq.length) next(); else autoSequenceActive = false;
        }, holdTimes[idx]);
      };
      next();
    }

    let radarRings = [], radarSpawnAcc = 0;
    const SPRING = 0.055, DAMPING = 0.82;

    function loop() {
      if (stage === 1) {
        sphereAngle += 0.0032;
        const R = Math.min(W, H) * 0.3;
        const cosA = Math.cos(sphereAngle), sinA = Math.sin(sphereAngle);
        for (let i = 0; i < N; i++) {
          const sx = sphere[i*3], sy = sphere[i*3+1], sz = sphere[i*3+2];
          const xr = sx * cosA - sz * sinA, zr = sx * sinA + sz * cosA;
          const depth = (zr + 1) / 2;
          tgt[i*2] = cx + xr * R; tgt[i*2+1] = cy + sy * R;
          tsize[i] = 0.35 + depth * 0.32; topacity[i] = 0.15 + depth * 0.8; colorKey[i] = COLOR_INDEX.base;
        }
      }

      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, W, H);
      binHeads.fill(-1); // Reset bins for this frame

      // Update Physics & Bin Particles
      for (let i = 0; i < N; i++) {
        const id = i*2;
        vel[id] += (tgt[id] - pos[id]) * SPRING;
        vel[id+1] += (tgt[id+1] - pos[id+1]) * SPRING;
        vel[id] *= DAMPING; vel[id+1] *= DAMPING;
        pos[id] += vel[id]; pos[id+1] += vel[id+1];
        
        size[i] += (tsize[i] - size[i]) * 0.08;
        opacity[i] += (topacity[i] - opacity[i]) * 0.06;

        const aLevel = (opacity[i] * ALPHA_STEPS + 0.5) | 0; // fast round
        const clampedA = aLevel < 0 ? 0 : (aLevel > ALPHA_STEPS ? ALPHA_STEPS : aLevel);
        const binIdx = colorKey[i] * (ALPHA_STEPS + 1) + clampedA;
        
        nextInBin[i] = binHeads[binIdx];
        binHeads[binIdx] = i;
      }

      // Batch Rendering (Draw Calls drop from 4000 -> Max 63)
      for (let c = 0; c < 3; c++) {
        for (let a = 1; a <= ALPHA_STEPS; a++) {
          let pIdx = binHeads[c * (ALPHA_STEPS + 1) + a];
          if (pIdx === -1) continue;

          ctx.fillStyle = colorCache[c][a];
          ctx.beginPath(); // Start batch
          while (pIdx !== -1) {
            const s = size[pIdx];
            ctx.rect(pos[pIdx*2] - s/2, pos[pIdx*2+1] - s/2, s, s);
            pIdx = nextInBin[pIdx];
          }
          ctx.fill(); // Render entire batch instantly
        }
      }

      // Draw HUD
      if (stage === 3) {
        const pinX = mapOriginX + MUMBAI_NORM.x * mapScale, pinY = mapOriginY + MUMBAI_NORM.y * mapScale;
        const settle = Math.min(1, (performance.now() - stageEnteredAt) / 900);

        if (++radarSpawnAcc > 55) { radarSpawnAcc = 0; radarRings.push({ r: 2, o: 0.55 }); }
        
        ctx.lineWidth = 1;
        radarRings = radarRings.filter((ring) => {
          ring.r += 0.55; ring.o -= 0.007;
          if (ring.o <= 0) return false;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56,189,248,${ring.o.toFixed(2)})`;
          ctx.arc(pinX, pinY, ring.r, 0, Math.PI * 2);
          ctx.stroke();
          return true;
        });

        const lX = pinX + 46, lY = pinY - 46;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56,189,248,${(0.5 * settle).toFixed(2)})`;
        ctx.moveTo(pinX + 4, pinY - 4); ctx.lineTo(lX - 4, lY + 6);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(56,189,248,${settle.toFixed(2)})`;
        ctx.arc(pinX, pinY, 2.2, 0, Math.PI * 2); ctx.fill();

        ctx.font = "500 11px 'JetBrains Mono', monospace";
        ctx.fillStyle = `rgba(244,244,245,${settle.toFixed(2)})`;
        ctx.textBaseline = "alphabetic";
        ctx.fillText("MUMBAI, INDIA", lX, lY);
        ctx.font = "400 9px 'JetBrains Mono', monospace";
        ctx.fillStyle = `rgba(113,113,122,${settle.toFixed(2)})`;
        ctx.fillText("19.0760° N, 72.8777° E", lX, lY + 14);
      }

      rafId = requestAnimationFrame(loop);
    }

    let rafId = null;
    function resize() {
      W = canvas.parentElement.clientWidth; H = canvas.parentElement.clientHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W / 2; cy = H / 2;
      
      mapScale = Math.min(W * 0.62, H * 0.86);
      mapOriginX = cx - mapScale * 0.47; mapOriginY = cy - mapScale * 0.53;
      
      buildTargets();
      if (stage !== 1) applyStaticTargets();
    }

    window.addEventListener("resize", resize);
    resize(); setStage(1);
    rafId = requestAnimationFrame(loop);
    const startTimer = setTimeout(runAutoSequence, 300);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      clearTimeout(autoTimer); clearTimeout(startTimer);
    };
  }, []);

  return (
    <section className="fixed inset-0 -z-10 overflow-hidden bg-[#09090b]">
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(9,9,11,0) 40%, rgba(9,9,11,0.55) 85%, rgba(9,9,11,0.85) 100%)" }}
      />
    </section>
  );
}