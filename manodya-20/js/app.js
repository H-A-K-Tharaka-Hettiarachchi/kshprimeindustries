const TOTAL = 50;

const PHOTOS = Array.from({ length: TOTAL }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `images/${n}.jpg`;
});

const $ = (id) => document.getElementById(id);

const loader = $("loader");
const titleEl = $("loaderTitle");
const subEl = $("loaderSub");
const bar = $("barFill");
const pctEl = $("loaderPct");
const logEl = $("loaderLog");
const app = $("app");
const burst = $("burst");
const gallery = $("gallery");
const lightbox = $("lightbox");
const lbImg = $("lbImg");
const lbCount = $("lbCount");

let index = 0;
let touchX = null;

function setProgress(n) {
  bar.style.width = n + "%";
  pctEl.textContent = n + "%";
  bar.parentElement.setAttribute("aria-valuenow", String(n));
}

function log(line) {
  logEl.textContent += (logEl.textContent ? "\n" : "") + line;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fakeLoad() {
  const steps = [
    { wait: 700, text: "Booting kernel…", sub: "Please do not close this tab.", p: 7, log: "> handshake tls-1.3" },
    { wait: 900, text: "Verifying session…", sub: "Checking credentials", p: 18, log: "> GET /session" },
    { wait: 800, text: "Decrypting payload…", sub: "aes-256-gcm", p: 34, log: "> key exchange ok" },
    { wait: 1000, text: "Fetching remote assets…", sub: "cdn://media/bundle", p: 52, log: "> 48 objects queued" },
    { wait: 1100, text: "ERROR 0x7F", sub: "checksum mismatch — retrying", p: 73, error: true, log: "> FAIL crc32 0xA91C" },
    { wait: 900, text: "Rolling back channel…", sub: "This may take a moment", p: 74, log: "> retry #2" },
    { wait: 800, text: "Injecting overlay…", sub: "almost there…?", p: 91, log: "> unexpected MIME: celebration" },
    { wait: 700, text: "Wait.", sub: " ", p: 99, log: "> override accepted ♡" },
  ];

  for (const s of steps) {
    titleEl.textContent = s.text;
    subEl.textContent = s.sub;
    titleEl.classList.toggle("is-error", Boolean(s.error));
    setProgress(s.p);
    if (s.log) log(s.log);
    await sleep(s.wait);
  }

  await sleep(400);
  reveal();
}

function spawnHearts() {
  burst.hidden = false;
  const chars = ["♡", "♥", "✦", "✿"];
  for (let i = 0; i < 42; i++) {
    const el = document.createElement("span");
    el.className = "heart-piece";
    el.textContent = chars[i % chars.length];
    el.style.setProperty("--x", Math.random() * 100 + "%");
    el.style.setProperty("--s", 14 + Math.random() * 22 + "px");
    el.style.setProperty("--d", 2.2 + Math.random() * 2.4 + "s");
    el.style.color = i % 2 ? "#ff4d8d" : "#ffb7d0";
    burst.appendChild(el);
  }
  setTimeout(() => {
    burst.hidden = true;
    burst.innerHTML = "";
  }, 4800);
}

function reveal() {
  document.title = "Happy Birthday Manodya ♡";
  spawnHearts();
  loader.classList.add("fade-out");
  app.hidden = false;
  setTimeout(() => loader.remove(), 700);
}

function buildGallery() {
  PHOTOS.forEach((src, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.addEventListener("click", () => openLb(i));

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Memory " + (i + 1);
    img.loading = "lazy";
    img.onerror = () => btn.remove();

    btn.appendChild(img);
    gallery.appendChild(btn);
  });
}

function openLb(i) {
  index = i;
  showLb();
  lightbox.hidden = false;
}

function showLb() {
  lbImg.src = PHOTOS[index];
  lbCount.textContent = index + 1 + " / " + TOTAL;
}

function closeLb() {
  lightbox.hidden = true;
}

function next() {
  index = (index + 1) % TOTAL;
  showLb();
}

function prev() {
  index = (index - 1 + TOTAL) % TOTAL;
  showLb();
}

$("lbClose").addEventListener("click", closeLb);
$("lbNext").addEventListener("click", next);
$("lbPrev").addEventListener("click", prev);

document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

lightbox.addEventListener("touchstart", (e) => {
  touchX = e.changedTouches[0].clientX;
}, { passive: true });

lightbox.addEventListener("touchend", (e) => {
  if (touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (dx < -40) next();
  if (dx > 40) prev();
  touchX = null;
}, { passive: true });

buildGallery();
fakeLoad();