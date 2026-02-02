let allPacks = [];
let manifest = null;

function normalize(s) {
  return (s || "").toString().toLowerCase();
}

function uniqueTags(packs) {
  const set = new Set();
  packs.forEach(p => (p.tags || []).forEach(t => set.add(normalize(t))));
  return Array.from(set).filter(Boolean);
}

function updateStats() {
  document.getElementById("total-packs").textContent = allPacks.length;
  document.getElementById("total-tags").textContent = uniqueTags(allPacks).length;
  document.getElementById("last-updated").textContent = manifest?.last_updated || "—";
}

async function loadPackDetails(packUrl) {
  try {
    const response = await fetch(packUrl, { cache: "no-store" });
    return await response.json();
  } catch (e) {
    console.error(`Failed to load pack from ${packUrl}`, e);
    return null;
  }
}

function render(packs) {
  const container = document.getElementById("packs-container");
  const empty = document.getElementById("empty");
  container.innerHTML = "";

  if (!packs.length) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  packs.forEach(async (pack) => {
    const card = document.createElement("div");
    card.className = "pack-card";

    const preview = pack.preview_url ? `<canvas class="pack-preview" data-preview-url="${pack.preview_url}"></canvas>` : `<div class="pack-preview"></div>`;
    const tags = (pack.tags || []).map(tag => `<span class="tag">${tag}</span>`).join("");
    const meta = [
      pack.version ? `v${pack.version}` : null,
      pack.author ? `by ${pack.author}` : null
    ].filter(Boolean).join(" • ");

    card.innerHTML = `
      ${preview}
      <div>
        <p class="pack-name">${pack.name || pack.id || "Untitled Pack"}</p>
        <p class="pack-author">${meta}</p>
      </div>
      <p class="pack-description">${pack.description || ""}</p>
      <div class="tags">${tags}</div>
      <div class="row">
        <span class="meta">${pack.id ? `id: ${pack.id}` : ""}</span>
      </div>
      <button class="download-btn">Open pack.json</button>
    `;

    // Load pack details to get fps settings
    if (pack.pack_url) {
      const packDetails = await loadPackDetails(pack.pack_url);
      if (packDetails && packDetails.animations && packDetails.animations.length > 0) {
        const canvas = card.querySelector(".pack-preview");
        if (canvas) {
          const animations = packDetails.animations;
          const fps = animations[0]?.default_settings?.fps || 10;
          setupCanvasAnimation(canvas, animations.map(a => a.url), fps);
        }
      }
    }

    card.querySelector(".download-btn").addEventListener("click", () => {
      if (pack.pack_url) window.open(pack.pack_url, "_blank");
    });

    container.appendChild(card);
  });
}

function setupCanvasAnimation(canvas, urls, fps) {
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");
  let currentIndex = 0;
  let frameTime = 1000 / fps;
  let lastFrameTime = 0;
  let images = [];
  let imagesLoaded = 0;

  // Load all images
  urls.forEach((url, idx) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      images[idx] = img;
      imagesLoaded++;
      if (imagesLoaded === urls.length) {
        startAnimation();
      }
    };
    img.onerror = () => {
      imagesLoaded++;
      if (imagesLoaded === urls.length) {
        startAnimation();
      }
    };
    img.src = url;
  });

  function startAnimation() {
    function animate(timestamp) {
      if (timestamp - lastFrameTime >= frameTime) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (images[currentIndex]) {
          const img = images[currentIndex];
          const aspectRatio = img.width / img.height;
          let drawWidth = canvas.width;
          let drawHeight = canvas.height;
          if (aspectRatio > 1) {
            drawHeight = canvas.width / aspectRatio;
          } else {
            drawWidth = canvas.height * aspectRatio;
          }
          const x = (canvas.width - drawWidth) / 2;
          const y = (canvas.height - drawHeight) / 2;
          ctx.drawImage(img, x, y, drawWidth, drawHeight);
        }
        currentIndex = (currentIndex + 1) % images.length;
        lastFrameTime = timestamp;
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // Click to cycle through animations
  if (urls.length > 1) {
    canvas.style.cursor = "pointer";
    canvas.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
    });
  }
}

async function loadManifest() {
  try {
    const response = await fetch("manifest.json", { cache: "no-store" });
    manifest = await response.json();
    allPacks = manifest.packs || [];
    updateStats();
    render(allPacks);
  } catch (e) {
    console.error("Failed to load manifest.json", e);
    allPacks = [];
    updateStats();
    render([]);
  }
}

document.getElementById("search").addEventListener("input", (e) => {
  const q = normalize(e.target.value);
  const filtered = allPacks.filter(p => {
    return normalize(p.name).includes(q) ||
      normalize(p.id).includes(q) ||
      normalize(p.author).includes(q) ||
      normalize(p.description).includes(q) ||
      (p.tags || []).some(t => normalize(t).includes(q));
  });
  render(filtered);
});

document.getElementById("open-manifest").addEventListener("click", () => {
  window.open("manifest.json", "_blank");
});

loadManifest();
