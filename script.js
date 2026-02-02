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

    const preview = pack.preview_url ? `<img src="${pack.preview_url}" alt="${pack.name}" class="pack-preview" />` : `<div class="pack-preview"></div>`;
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

    card.querySelector(".download-btn").addEventListener("click", () => {
      if (pack.pack_url) window.open(pack.pack_url, "_blank");
    });

    container.appendChild(card);
  });
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
