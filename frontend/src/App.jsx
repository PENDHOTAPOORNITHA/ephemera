import { useState, useEffect, useRef, useCallback } from "react";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=IM+Fell+English:ital@0;1&display=swap";

const SAMPLE_CAPSULES = [
  // ── OPEN LETTERS (unlocked — anyone can read these) ──────────────────
  {
    id: "c1",
    title: "You Made It Through",
    recipient: "Whoever Needs This",
    message: `I don't know what you've been carrying. But I know it's been heavy — heavier than you let on, heavier than most people around you even noticed.

And yet here you are. Reading this. Still going.

I want you to sit with that for a moment. Not rush past it the way we rush past everything. You have survived every single hard day of your life so far. Every one. That is not a small thing. That is everything.

Whatever it was — the loss, the fear, the quiet kind of pain that doesn't have a name — you didn't let it swallow you whole. You bent, maybe. You broke a little, probably. But you are still here, still breathing, still capable of wondering what the future holds.

The future holds good things. I believe that for you even when you can't believe it for yourself.

You are more resilient than you know. More loved than you feel. And the best chapters of your story? They haven't been written yet.

Keep going. Please. The world is better with you in it.`,
    unlockDate: new Date(Date.now() - 86400000 * 30).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 365).toISOString(),
    color: "#e8c4a0", x: 18, y: 28, unlocked: true, star: { size: 3.8, pulse: 1.8 }
  },
  {
    id: "c2",
    title: "On the Day Everything Changed",
    recipient: "My Future Self",
    message: `Today is the day I decided to stop waiting for my life to begin.

I don't know what that decision will look like from where you're standing now. Maybe it led somewhere beautiful. Maybe it led somewhere unexpected. Maybe both — the way most brave things do.

But I want you to remember what it felt like in this exact moment: the fear that felt like excitement, the uncertainty that felt like standing at the edge of something vast and real. I was terrified. And I did it anyway.

I hope you remember that you are someone who, when it mattered most, chose courage over comfort.

If things got hard along the way — and they did, didn't they — I hope you held onto the version of yourself who stood here today and said: I am worth betting on.

Because you were. You are. You always will be.

Thank you for not giving up on us.`,
    unlockDate: new Date(Date.now() - 86400000 * 14).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 200).toISOString(),
    color: "#f4c4c4", x: 72, y: 22, unlocked: true, star: { size: 3.2, pulse: 2.4 }
  },
  {
    id: "c3",
    title: "A Letter About Ordinary Days",
    recipient: "You, Someday",
    message: `I'm writing this on an ordinary Tuesday. Nothing remarkable happened today. I made coffee. I watched the light move across the floor in the afternoon the way it does in autumn. I called a friend and we talked about nothing important for an hour and it was one of the best hours I've had in weeks.

I think I'm only now learning how to love ordinary days.

For so long I was always waiting — waiting for the trip, the promotion, the relationship, the moment when my real life would finally start. And I missed so many Tuesdays.

So if you're reading this and you're in the middle of an ordinary week: look around. Really look. The light. The coffee going cold on your desk. The sound of the city or the silence of a house settling. The friend you keep meaning to call.

This is it. This is your life, happening right now, in all its unremarkable, irreplaceable glory.

Don't miss it the way I almost did.`,
    unlockDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 120).toISOString(),
    color: "#b8e4c9", x: 38, y: 58, unlocked: true, star: { size: 2.6, pulse: 3.1 }
  },
  {
    id: "c4",
    title: "To Anyone Who Feels Behind",
    recipient: "Dear Wanderer",
    message: `You are not behind. I need you to hear that.

There is no schedule. There never was. The timeline you're measuring yourself against — the one with the house, the title, the relationship, the body, the savings account — someone made that up. It wasn't even made for you specifically. It was made for a hypothetical person who doesn't exist, living a hypothetical life that was never yours to live.

Your path has been yours. Every detour, every delay, every year that felt wasted — it was all part of a journey that only makes sense from the inside, and only in hindsight, and only if you allow it to.

The people who look like they're ahead? They have their own private panic. Their own sense of falling short. We are all, every one of us, just making it up as we go.

So please — put down the scoreboard. You are exactly where you need to be to become who you are becoming.

And who you are becoming is someone worth becoming.`,
    unlockDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
    color: "#a8d8ea", x: 55, y: 40, unlocked: true, star: { size: 3.0, pulse: 2.0 }
  },

  // ── SEALED LETTERS (still waiting — creates mystery and wonder) ───────
  {
    id: "c5",
    title: "The Year Everything Changed",
    recipient: "My Heart",
    message: `I don't know what year you're reading this. But I remember the exact moment I decided to stop waiting for life to happen and started building it instead. I hope you kept that fire. I hope you didn't trade it for comfort. The version of me writing this believes in you completely.`,
    unlockDate: new Date(Date.now() + 86400000 * 60).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    color: "#f9a8d4", x: 25, y: 65, unlocked: false, star: { size: 2.2, pulse: 3.8 }
  },
  {
    id: "c6",
    title: "The Version of Me I'm Growing Into",
    recipient: "Future Me",
    message: `Right now I am becoming someone I can't quite see yet.

I can feel the edges of them. The way they're less afraid of silence. The way they've stopped apologizing for taking up space. The way they've learned that rest is not the same as failure, and that asking for help is not the same as weakness, and that being gentle with yourself is not the same as giving up.

I don't know if you remember what it cost to get there. I hope you do — not to dwell in it, but to honour it. The becoming wasn't painless. Growth rarely is.

But I hope that when you look in the mirror now, you recognize someone you actually like. Someone you'd want to know. Someone who earned their own respect.

I'm proud of you already, and I haven't even met you yet.

Save some of that grace for the version of you that comes after — they'll need it too.`,
    unlockDate: new Date(Date.now() + 86400000 * 180).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    color: "#c9b1e8", x: 80, y: 50, unlocked: false, star: { size: 2.0, pulse: 4.5 }
  },
  {
    id: "c7",
    title: "If Things Got Hard Again",
    recipient: "My Stronger Self",
    message: `If you're reading this because things got hard again — first, I want to say: I know. I know how exhausting it is to keep finding your way back. I know it can feel like you should be further along by now, like you already paid your dues, like this isn't fair.

You're right. It isn't fair.

But here is what I also know: you have come back before. From things that felt unsurvivable. From nights that had no visible morning. You have proven, over and over, that you are capable of more than you believe yourself to be in the low moments.

This is a low moment. It will not last.

Please eat something. Drink water. Text one person — just one — and tell them you're struggling. You don't have to explain everything. You just have to reach one hand out into the dark.

Someone will take it. I promise. People love you more than you let yourself believe when you're in this place.

Come back. Take your time. But come back.

I'll be here.`,
    unlockDate: new Date(Date.now() + 86400000 * 365).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    color: "#86efac", x: 48, y: 78, unlocked: false, star: { size: 1.8, pulse: 2.9 }
  },
  {
    id: "c8",
    title: "A Note on Being Proud",
    recipient: "The One Who Never Celebrates",
    message: `You never let yourself be proud of yourself. I've watched you do it — deflect every compliment, minimise every achievement, immediately move on to the next thing before the last thing has even settled.

I'm writing this to tell you: stop.

You did something hard. You built something real. You showed up when it would have been easier not to. You chose courage over comfort, or kindness over convenience, or honesty over approval — and that deserves to be acknowledged.

Not just by others. By you.

So when you read this — whatever you've done since I wrote it — I want you to sit in it for a moment. Not forever. Just a moment. Let it be real. Let it matter. Let yourself be someone who is allowed to feel good about what they've accomplished.

You work so hard. You care so much. You give so generously.

You are allowed to receive some of that back. Even if you're the one giving it to yourself.

You're doing better than you think. Much better.`,
    unlockDate: new Date(Date.now() + 86400000 * 730).toISOString(),
    createdAt: new Date(Date.now()).toISOString(),
    color: "#fde68a", x: 12, y: 72, unlocked: false, star: { size: 2.4, pulse: 1.6 }
  },
];

// ─── STARFIELD ───────────────────────────────────────────────────────
function StarField({ capsules, onStarClick, onStarHover, activeId }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    starsRef.current = Array.from({ length: 320 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      brightness: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    const spawnShootingStar = () => {
      shootingStarsRef.current.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.5,
        len: 80 + Math.random() * 140,
        speed: 7 + Math.random() * 9,
        angle: Math.PI / 6 + (Math.random() - 0.5) * 0.4,
        life: 1,
        decay: 0.014 + Math.random() * 0.014,
      });
    };
    const shootInterval = setInterval(spawnShootingStar, 4000 + Math.random() * 3000);
    setTimeout(spawnShootingStar, 1500);

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);

      const bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, Math.max(W, H) * 0.8);
      bg.addColorStop(0, "#0d0720");
      bg.addColorStop(0.4, "#080514");
      bg.addColorStop(1, "#020108");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      [
        { x: 0.2, y: 0.3, r: W * 0.35, c: "rgba(80,40,160,0.06)" },
        { x: 0.8, y: 0.6, r: W * 0.28, c: "rgba(160,60,80,0.05)" },
        { x: 0.5, y: 0.8, r: W * 0.22, c: "rgba(40,80,160,0.055)" },
        { x: 0.1, y: 0.7, r: W * 0.2, c: "rgba(60,160,120,0.03)" },
      ].forEach(n => {
        const g = ctx.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, n.r);
        g.addColorStop(0, n.c); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });

      const px = (mouseRef.current.x - 0.5) * 14;
      const py = (mouseRef.current.y - 0.5) * 9;

      starsRef.current.forEach(s => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset);
        const alpha = 0.4 + 0.6 * twinkle * s.brightness;
        ctx.beginPath();
        ctx.arc(s.x * W + px * 0.3, s.y * H + py * 0.3, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      // Shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter(ss => ss.life > 0);
      shootingStarsRef.current.forEach(ss => {
        const tx = Math.cos(ss.angle) * ss.len;
        const ty = Math.sin(ss.angle) * ss.len;
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - tx, ss.y - ty);
        grad.addColorStop(0, `rgba(255,255,255,${ss.life * 0.9})`);
        grad.addColorStop(0.3, `rgba(200,180,255,${ss.life * 0.5})`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - tx, ss.y - ty);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8 * ss.life;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2.5 * ss.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ss.life})`;
        ctx.fill();
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life -= ss.decay;
      });

      // Capsule stars
      capsules.forEach(cap => {
        const x = (cap.x / 100) * W + px;
        const y = (cap.y / 100) * H + py;
        const isActive = cap.id === activeId;
        const pulse = 0.6 + 0.4 * Math.sin(t * cap.star.pulse);
        const baseR = cap.star.size * 1.4;
        const r = isActive ? baseR * 2.4 : baseR * (1 + pulse * 0.4);
        const glowColor = cap.unlocked ? cap.color : "#9988dd";

        for (let i = 4; i >= 0; i--) {
          const gr = ctx.createRadialGradient(x, y, 0, x, y, r * (3.5 + i * 3));
          const alpha = isActive ? 0.15 - i * 0.025 : 0.09 - i * 0.015;
          gr.addColorStop(0, glowColor + Math.floor(Math.max(0, alpha) * 255).toString(16).padStart(2, "0"));
          gr.addColorStop(1, "transparent");
          ctx.fillStyle = gr;
          ctx.beginPath();
          ctx.arc(x, y, r * (3.5 + i * 3), 0, Math.PI * 2);
          ctx.fill();
        }

        const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
        coreGrad.addColorStop(0, "#ffffff");
        coreGrad.addColorStop(0.3, glowColor);
        coreGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        const fLen = r * (isActive ? 6 : 3.5);
        ctx.save();
        ctx.globalAlpha = isActive ? 0.6 : 0.3;
        for (let ang = 0; ang < 4; ang++) {
          const a = (ang * Math.PI) / 2;
          const fg = ctx.createLinearGradient(x, y, x + Math.cos(a) * fLen, y + Math.sin(a) * fLen);
          fg.addColorStop(0, glowColor); fg.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(a) * fLen, y + Math.sin(a) * fLen);
          ctx.strokeStyle = fg;
          ctx.lineWidth = isActive ? 1.8 : 1;
          ctx.stroke();
        }
        ctx.restore();

        // Bigger, brighter labels
        ctx.save();
        ctx.globalAlpha = isActive ? 1 : 0.9;
        ctx.font = `${isActive ? "600" : "500"} ${isActive ? 14 : 13}px 'Cinzel', serif`;
        ctx.fillStyle = isActive ? "#ffffff" : "rgba(235,215,255,0.97)";
        ctx.textAlign = "center";
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = isActive ? 14 : 8;
        ctx.fillText(cap.title, x, y + r + 22);
        ctx.shadowBlur = 0;

        ctx.font = `300 ${isActive ? 11 : 10}px 'Cinzel', serif`;
        if (!cap.unlocked) {
          const daysLeft = Math.ceil((new Date(cap.unlockDate) - Date.now()) / 86400000);
          ctx.fillStyle = isActive ? "rgba(210,190,255,0.95)" : "rgba(200,180,255,0.82)";
          ctx.shadowColor = "#9977cc"; ctx.shadowBlur = 5;
          ctx.fillText(`opens in ${daysLeft}d`, x, y + r + 38);
        } else {
          ctx.fillStyle = isActive ? cap.color : cap.color + "dd";
          ctx.shadowColor = cap.color; ctx.shadowBlur = 7;
          ctx.fillText("✦ open now", x, y + r + 38);
        }
        ctx.shadowBlur = 0;
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      mouseRef.current = { x: cx / W, y: cy / H };
      const px2 = (mouseRef.current.x - 0.5) * 14;
      const py2 = (mouseRef.current.y - 0.5) * 9;
      let hov = null;
      for (const cap of capsules) {
        const sx = (cap.x / 100) * W + px2;
        const sy = (cap.y / 100) * H + py2;
        if (Math.hypot(cx - sx, cy - sy) < 44) { hov = { cap, screenX: e.clientX, screenY: e.clientY }; break; }
      }
      onStarHover(hov);
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const px2 = (mouseRef.current.x - 0.5) * 14;
      const py2 = (mouseRef.current.y - 0.5) * 9;
      const cx = e.clientX - rect.left - px2;
      const cy = e.clientY - rect.top - py2;
      for (const cap of capsules) {
        const sx = (cap.x / 100) * W;
        const sy = (cap.y / 100) * H;
        if (Math.hypot(cx - sx, cy - sy) < 42) { onStarClick(cap); return; }
      }
      onStarClick(null);
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(shootInterval);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
    };
  }, [capsules, activeId]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "crosshair" }} />;
}

// ─── HOVER TOOLTIP ───────────────────────────────────────────────────
function HoverTooltip({ data }) {
  if (!data) return null;
  const { cap, screenX, screenY } = data;
  const daysLeft = Math.ceil((new Date(cap.unlockDate) - Date.now()) / 86400000);
  const flip = screenX > window.innerWidth * 0.7;
  return (
    <div style={{
      position: "fixed",
      left: flip ? screenX - 240 : screenX + 20,
      top: Math.min(screenY - 10, window.innerHeight - 160),
      zIndex: 80, pointerEvents: "none",
      background: "rgba(8,5,22,0.94)",
      border: `1px solid ${cap.color}77`,
      borderRadius: 16, padding: "16px 20px",
      boxShadow: `0 10px 40px rgba(0,0,0,0.7), 0 0 24px ${cap.color}28`,
      backdropFilter: "blur(20px)",
      maxWidth: 230,
      animation: "fadeUp 0.15s ease both",
    }}>
      <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: cap.color, fontFamily: "'Cinzel', serif", marginBottom: 8, opacity: 0.95 }}>
        {cap.unlocked ? "✦ Unsealed" : "⌛ Sealed"}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#f5eeff", fontWeight: 400, marginBottom: 6, lineHeight: 1.3 }}>
        {cap.title}
      </div>
      <div style={{ fontSize: 11, color: "rgba(195,170,255,0.65)", fontFamily: "'Cinzel', serif" }}>To: {cap.recipient}</div>
      {!cap.unlocked && (
        <div style={{ marginTop: 10, fontSize: 13, color: cap.color, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
          Opens in {daysLeft} days
        </div>
      )}
      {cap.unlocked && (
        <div style={{ marginTop: 10, fontSize: 13, color: "rgba(220,200,255,0.6)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
          Click to read ✦
        </div>
      )}
    </div>
  );
}

// ─── STATS PANEL ─────────────────────────────────────────────────────
function StatsPanel({ capsules, onClose }) {
  const [animIn, setAnimIn] = useState(false);
  useEffect(() => { setTimeout(() => setAnimIn(true), 10); }, []);

  const total = capsules.length;
  const open = capsules.filter(c => c.unlocked).length;
  const sealed = capsules.filter(c => !c.unlocked).length;
  const wordCount = capsules.reduce((s, c) => s + c.message.split(/\s+/).filter(Boolean).length, 0);
  const nextUp = [...capsules].filter(c => !c.unlocked).sort((a, b) => new Date(a.unlockDate) - new Date(b.unlockDate))[0];

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 149, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", opacity: animIn ? 1 : 0, transition: "opacity 0.3s" }} />
      <div style={{
        position: "fixed", bottom: 0, left: "50%",
        transform: animIn ? "translate(-50%,0)" : "translate(-50%,100%)",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        zIndex: 150, width: "min(700px, 96vw)",
        background: "linear-gradient(160deg, #0f0a22 0%, #080614 100%)",
        borderRadius: "24px 24px 0 0",
        border: "1px solid rgba(200,160,255,0.22)", borderBottom: "none",
        boxShadow: "0 -20px 80px rgba(0,0,0,0.85)",
        padding: "28px 32px 44px",
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(200,160,255,0.3)", margin: "0 auto 28px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(200,160,255,0.55)", fontFamily: "'Cinzel', serif", marginBottom: 8 }}>Your Constellation</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#f5eeff", fontStyle: "italic", fontWeight: 300 }}>{total} letters sealed in time</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 20 }}>
          {[
            { icon: "✦", label: "Open Letters", value: open, c: "#e8c4a0" },
            { icon: "⌛", label: "Still Sealed", value: sealed, c: "#a8d8ea" },
            { icon: "✍️", label: "Words Written", value: wordCount.toLocaleString(), c: "#c9b1e8" },
            { icon: "🌌", label: "Stars in Sky", value: total, c: "#f4c4c4" },
          ].map(({ icon, label, value, c }) => (
            <div key={label} style={{ padding: "18px 16px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: `1px solid ${c}28`, textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(190,165,255,0.55)", fontFamily: "'Cinzel', serif", marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#f0e8ff" }}>{value}</div>
            </div>
          ))}
        </div>

        {nextUp && (
          <div style={{ padding: "18px 22px", borderRadius: 16, background: "rgba(200,160,255,0.06)", border: "1px solid rgba(200,160,255,0.16)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(190,165,255,0.55)", fontFamily: "'Cinzel', serif", marginBottom: 6 }}>Next letter opens</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#e8d8ff", fontStyle: "italic" }}>{nextUp.title}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 26, color: "#c9b1e8" }}>{Math.ceil((new Date(nextUp.unlockDate) - Date.now()) / 86400000)}</div>
              <div style={{ fontSize: 10, color: "rgba(180,160,255,0.45)", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>DAYS</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── LETTER PANEL ────────────────────────────────────────────────────
function LetterPanel({ capsule, onClose, onDelete }) {
  const [animIn, setAnimIn] = useState(false);
  const [supernova, setSupernova] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimIn(true), 10);
    if (capsule?.unlocked) { setTimeout(() => setSupernova(true), 200); setTimeout(() => setSupernova(false), 1800); }
  }, [capsule]);

  if (!capsule) return null;
  const isOpen = capsule.unlocked;
  const daysLeft = Math.ceil((new Date(capsule.unlockDate) - Date.now()) / 86400000);
  const sentDate = new Date(capsule.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      {supernova && <div style={{ position: "fixed", inset: 0, zIndex: 200, background: `radial-gradient(circle at 50% 50%, ${capsule.color}99 0%, transparent 65%)`, animation: "supernova 1.8s ease-out forwards", pointerEvents: "none" }} />}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(2,1,8,0.5)", backdropFilter: "blur(3px)", opacity: animIn ? 1 : 0, transition: "opacity 0.4s" }} />
      <div style={{
        position: "fixed", right: 0, top: 0, bottom: 0, width: "min(540px, 100vw)", zIndex: 100,
        background: "linear-gradient(160deg, #0f0a22 0%, #080614 60%, #0a0a1c 100%)",
        borderLeft: `1px solid ${capsule.color}55`,
        boxShadow: `-30px 0 100px ${capsule.color}30, -1px 0 0 ${capsule.color}77`,
        transform: animIn ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }} />

        <div style={{ padding: "32px 36px 24px", borderBottom: `1px solid ${capsule.color}30` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: capsule.color, fontFamily: "'Cinzel', serif", marginBottom: 10 }}>
                {isOpen ? "✦ Time Capsule — Unsealed" : "✦ Time Capsule — Sealed"}
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 300, color: "#f8f0ff", lineHeight: 1.2, fontStyle: "italic" }}>
                {capsule.title}
              </h2>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.55)", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 16, transition: "all 0.2s" }}>✕</button>
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 12, color: "rgba(210,185,255,0.75)", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>
            <span>To: {capsule.recipient}</span>
            <span>Written: {sentDate}</span>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "36px 36px 20px", position: "relative" }}>
          {isOpen ? (
            <>
              <div style={{ position: "absolute", top: 20, right: 20, width: 60, height: 60, opacity: 0.14, borderTop: `1px solid ${capsule.color}`, borderRight: `1px solid ${capsule.color}` }} />
              <p style={{ fontFamily: "'IM Fell English', serif", fontSize: 19, lineHeight: 2.0, color: "rgba(248,240,255,0.94)", fontStyle: "italic" }}>
                {capsule.message}
              </p>
              <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${capsule.color}28`, fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: capsule.color, opacity: 0.8, letterSpacing: "2px", textTransform: "uppercase" }}>
                — Sent from the past · {new Date(capsule.unlockDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", paddingTop: 40 }}>
              <div style={{ width: 90, height: 90, borderRadius: "50%", border: `1px solid ${capsule.color}66`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: `0 0 50px ${capsule.color}30, inset 0 0 30px ${capsule.color}16`, animation: "breathe 4s ease-in-out infinite" }}>
                <span style={{ fontSize: 36 }}>⌛</span>
              </div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: "3px", color: capsule.color, marginBottom: 16, textTransform: "uppercase" }}>Sealed Until</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, color: "#f8f0ff", fontWeight: 300, marginBottom: 12 }}>
                {new Date(capsule.unlockDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "rgba(210,190,255,0.65)", fontStyle: "italic" }}>{daysLeft} days remain</div>
              <div style={{ marginTop: 40, padding: 24, background: "rgba(255,255,255,0.025)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "rgba(220,200,255,0.65)", lineHeight: 1.8, fontStyle: "italic" }}>
                  This letter drifts patiently through the cosmos, waiting for its moment to arrive.
                </p>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "20px 36px 32px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {confirmDelete ? (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "rgba(255,185,185,0.85)", fontStyle: "italic", flex: 1 }}>Dissolve this star forever?</span>
              <button onClick={() => { onDelete(capsule.id); onClose(); }} style={{ padding: "8px 18px", borderRadius: 30, border: "1px solid rgba(255,100,100,0.4)", background: "rgba(255,80,80,0.12)", color: "rgba(255,160,160,0.95)", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "1px" }}>Yes, dissolve</button>
              <button onClick={() => setConfirmDelete(false)} style={{ padding: "8px 16px", borderRadius: 30, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: 11 }}>Keep</button>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.22)", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "1px", transition: "color 0.2s" }}
              onMouseOver={e => e.target.style.color = "rgba(255,130,130,0.7)"}
              onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.22)"}
            >✕ dissolve this star</button>
          )}
        </div>
      </div>
    </>
  );
}

// ─── COMPOSE MODAL ───────────────────────────────────────────────────
function ComposeModal({ onClose, onSave }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("Future Self");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [animIn, setAnimIn] = useState(false);
  useEffect(() => { setTimeout(() => setAnimIn(true), 10); }, []);

  const COLORS = ["#e8c4a0","#a8d8ea","#c9b1e8","#f4c4c4","#b8e4c9","#fde68a","#f9a8d4","#86efac"];
  const minDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const handleSave = () => {
    if (!title || !message || !unlockDate) return;
    onSave({ title, recipient, message, unlockDate, id: Date.now().toString(), createdAt: new Date().toISOString(), color: COLORS[Math.floor(Math.random() * COLORS.length)], x: 8 + Math.random() * 84, y: 8 + Math.random() * 78, unlocked: false, star: { size: 1.6 + Math.random() * 2, pulse: 2 + Math.random() * 3 } });
    onClose();
  };

  const steps = [
    {
      label: "Occasion", valid: title.length > 2,
      content: (
        <>
          <label style={labelStyle}>What is this letter about?</label>
          <input style={inputStyle} placeholder="e.g. On the day I quit my job..." value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <label style={{ ...labelStyle, marginTop: 24 }}>Addressed to</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Future Self","Older Me","You","My Dearest"].map(r => (
              <button key={r} onClick={() => setRecipient(r)} style={{ padding: "9px 18px", borderRadius: 30, border: `1px solid ${recipient === r ? "#c9b1e8" : "rgba(255,255,255,0.1)"}`, background: recipient === r ? "rgba(200,160,255,0.15)" : "transparent", color: recipient === r ? "#e8d8ff" : "rgba(190,165,255,0.55)", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, transition: "all 0.2s" }}>{r}</button>
            ))}
          </div>
        </>
      ),
    },
    {
      label: "Words", valid: message.length > 20,
      content: (
        <>
          <label style={labelStyle}>Write your letter</label>
          <textarea style={{ ...inputStyle, height: 220, lineHeight: 1.9, fontStyle: "italic", fontFamily: "'IM Fell English', serif", fontSize: 18 }} placeholder="Dear future me, I'm writing this on a day I want you to remember..." value={message} onChange={e => setMessage(e.target.value)} autoFocus />
          <div style={{ fontSize: 11, color: "rgba(190,165,255,0.4)", textAlign: "right", marginTop: 8, fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>{message.split(/\s+/).filter(Boolean).length} words</div>
        </>
      ),
    },
    {
      label: "Seal", valid: !!unlockDate,
      content: (
        <>
          <label style={labelStyle}>When should this letter find you?</label>
          <input type="date" min={minDate} style={{ ...inputStyle, colorScheme: "dark" }} value={unlockDate} onChange={e => setUnlockDate(e.target.value)} />
          {unlockDate && (
            <div style={{ marginTop: 24, padding: 28, borderRadius: 18, background: "rgba(200,160,255,0.05)", border: "1px solid rgba(200,160,255,0.15)", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>✦</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#e8d8ff", fontStyle: "italic", marginBottom: 8 }}>Sealed for {Math.ceil((new Date(unlockDate) - Date.now()) / 86400000)} days</div>
              <div style={{ fontSize: 12, color: "rgba(190,165,255,0.55)", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>{new Date(unlockDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 199, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", opacity: animIn ? 1 : 0, transition: "opacity 0.4s" }} />
      <div style={{ position: "fixed", left: "50%", top: "50%", transform: animIn ? "translate(-50%,-50%)" : "translate(-50%,-42%)", zIndex: 200, width: "min(600px, 94vw)", background: "linear-gradient(160deg, #0f0a22 0%, #080614 100%)", borderRadius: 24, border: "1px solid rgba(200,160,255,0.24)", boxShadow: "0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(200,160,255,0.07)", overflow: "hidden", opacity: animIn ? 1 : 0, transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ display: "flex", padding: "28px 36px 0", gap: 4 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ height: 2, background: i <= step ? "#c9b1e8" : "rgba(200,160,255,0.12)", transition: "background 0.3s", marginBottom: 10, borderRadius: 1 }} />
              <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: i === step ? "#c9b1e8" : "rgba(190,165,255,0.35)", fontFamily: "'Cinzel', serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "28px 36px" }}>{steps[step].content}</div>
        <div style={{ padding: "0 36px 32px", display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ ...btnStyle, background: "transparent", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.28)", marginRight: "auto" }}>Cancel</button>
          {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ ...btnStyle, background: "transparent", border: "1px solid rgba(200,160,255,0.22)", color: "rgba(200,160,255,0.7)" }}>← Back</button>}
          {step < steps.length - 1
            ? <button onClick={() => setStep(s => s + 1)} disabled={!steps[step].valid} style={{ ...btnStyle, opacity: steps[step].valid ? 1 : 0.3 }}>Continue →</button>
            : <button onClick={handleSave} disabled={!steps[step].valid} style={{ ...btnStyle, background: "linear-gradient(135deg, #7c3aed, #db2777)", opacity: steps[step].valid ? 1 : 0.3 }}>✦ Seal & Launch</button>
          }
        </div>
      </div>
    </>
  );
}

const labelStyle = { display: "block", marginBottom: 12, fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(200,175,255,0.65)", fontFamily: "'Cinzel', serif" };
const inputStyle = { width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.045)", border: "1px solid rgba(200,160,255,0.2)", borderRadius: 12, color: "#f0e4ff", fontSize: 17, fontFamily: "'Cormorant Garamond', serif", outline: "none", transition: "border-color 0.2s", display: "block" };
const btnStyle = { padding: "12px 26px", borderRadius: 40, border: "none", background: "linear-gradient(135deg, #4c1d95, #7c3aed)", color: "white", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "1px", transition: "all 0.2s" };

const GLOBAL_STYLES = `
  @import url('${FONT_URL}');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #020108; overflow: hidden; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(200,160,255,0.25); border-radius: 2px; }
  @keyframes supernova { 0% { opacity:0; transform:scale(0.5); } 20% { opacity:1; transform:scale(1); } 100% { opacity:0; transform:scale(3); } }
  @keyframes breathe { 0%,100% { transform:scale(1); } 50% { transform:scale(1.06); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeOut { to { opacity:0; } }
  input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.7) sepia(1) saturate(3) hue-rotate(240deg); }
  textarea { resize: none; }
`;

// ─── MAIN APP ─────────────────────────────────────────────────────────
export default function Ephemera() {
  const [capsules, setCapsules] = useState(SAMPLE_CAPSULES);
  const [active, setActive] = useState(null);
  const [composing, setComposing] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [introVisible, setIntroVisible] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_STYLES;
    document.head.appendChild(el);
    const saved = localStorage.getItem("ephemera_capsules");
    if (saved) try { setCapsules(prev => [...prev, ...JSON.parse(saved)]); } catch (e) {}
    setTimeout(() => setIntroVisible(false), 3400);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  const handleStarClick = useCallback((cap) => { setActive(cap); }, []);
  const handleStarHover = useCallback((data) => { setHovered(data); }, []);

  const handleSave = (newCap) => {
    setCapsules(prev => {
      const updated = [...prev, newCap];
      const userCaps = updated.filter(c => !SAMPLE_CAPSULES.find(s => s.id === c.id));
      try { localStorage.setItem("ephemera_capsules", JSON.stringify(userCaps)); } catch (e) {}
      return updated;
    });
    showToast("✦ Your letter is now drifting among the stars");
  };

  const handleDelete = (id) => {
    setCapsules(prev => {
      const updated = prev.filter(c => c.id !== id);
      const userCaps = updated.filter(c => !SAMPLE_CAPSULES.find(s => s.id === c.id));
      try { localStorage.setItem("ephemera_capsules", JSON.stringify(userCaps)); } catch (e) {}
      return updated;
    });
    showToast("Star dissolved into the void");
  };

  const openCount = capsules.filter(c => c.unlocked).length;
  const sealedCount = capsules.filter(c => !c.unlocked).length;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#020108", overflow: "hidden" }}>
      <StarField capsules={capsules} onStarClick={handleStarClick} onStarHover={handleStarHover} activeId={active?.id} />

      {introVisible && (
        <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#020108", animation: "fadeUp 1s ease 0.2s both, fadeOut 0.8s ease 2.6s both", pointerEvents: "none" }}>
          <div style={{ fontSize: 13, letterSpacing: "8px", textTransform: "uppercase", color: "rgba(210,180,255,0.6)", fontFamily: "'Cinzel', serif", marginBottom: 20, animation: "fadeUp 0.8s ease 0.4s both" }}>✦ ephemera ✦</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px,5vw,54px)", color: "rgba(248,240,255,0.97)", fontStyle: "italic", fontWeight: 300, animation: "fadeUp 0.8s ease 0.7s both" }}>Letters to your future self</div>
          <div style={{ marginTop: 16, fontSize: 15, color: "rgba(200,178,255,0.6)", animation: "fadeUp 0.8s ease 1.1s both", letterSpacing: "2px", fontFamily: "'Cinzel', serif" }}>sealed in the stars, waiting to find you</div>
        </div>
      )}

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, padding: "24px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(to bottom, rgba(2,1,8,0.93) 0%, transparent 100%)", animation: "fadeUp 0.6s ease 3.2s both" }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: "5px", textTransform: "uppercase", color: "rgba(220,190,255,0.7)", fontFamily: "'Cinzel', serif", marginBottom: 5 }}>✦ Ephemera</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "rgba(215,195,255,0.6)", fontStyle: "italic" }}>{openCount} open · {sealedCount} sealed · drifting in the cosmos</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setShowStats(true)} style={{ padding: "11px 22px", border: "1px solid rgba(200,160,255,0.28)", background: "rgba(200,160,255,0.07)", borderRadius: 40, color: "rgba(220,195,255,0.82)", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", backdropFilter: "blur(10px)", transition: "all 0.3s" }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(200,160,255,0.18)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "rgba(200,160,255,0.07)"; }}>
            ◈ Constellation
          </button>
          <button onClick={() => setComposing(true)} style={{ padding: "11px 26px", border: "1px solid rgba(200,160,255,0.38)", background: "rgba(200,160,255,0.11)", borderRadius: 40, color: "rgba(235,215,255,0.97)", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", backdropFilter: "blur(10px)", transition: "all 0.3s" }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(200,160,255,0.22)"; e.currentTarget.style.borderColor = "rgba(200,160,255,0.68)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "rgba(200,160,255,0.11)"; e.currentTarget.style.borderColor = "rgba(200,160,255,0.38)"; }}>
            ✦ Write a Letter
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 10, textAlign: "center", pointerEvents: "none", animation: "fadeUp 0.6s ease 3.5s both" }}>
        <div style={{ fontSize: 11, letterSpacing: "2px", color: "rgba(200,178,255,0.5)", fontFamily: "'Cinzel', serif", textTransform: "uppercase" }}>
          Click a star to read · Hover to preview · Move mouse to drift
        </div>
      </div>

      {hovered && !active && <HoverTooltip data={hovered} />}

      {toast && (
        <div style={{ position: "fixed", bottom: 60, left: "50%", transform: "translateX(-50%)", zIndex: 300, background: "rgba(14,9,32,0.96)", border: "1px solid rgba(200,160,255,0.32)", borderRadius: 50, padding: "14px 30px", fontFamily: "'Cinzel', serif", fontSize: 12, color: "rgba(225,205,255,0.95)", letterSpacing: "1px", backdropFilter: "blur(20px)", boxShadow: "0 8px 40px rgba(0,0,0,0.65)", animation: "fadeUp 0.3s ease both", whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}

      {active && <LetterPanel capsule={active} onClose={() => setActive(null)} onDelete={handleDelete} />}
      {composing && <ComposeModal onClose={() => setComposing(false)} onSave={handleSave} />}
      {showStats && <StatsPanel capsules={capsules} onClose={() => setShowStats(false)} />}
    </div>
  );
}
