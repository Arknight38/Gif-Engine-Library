# Gif-Engine Community Library

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://arknight38.github.io/Gif-Engine-Library/)
[![Packs](https://img.shields.io/badge/Animation%20Packs-0-blue)](#)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Community-curated animation packs for [Gif-Engine](https://github.com/Arknight38/Gif-Engine).

Browse and download animation packs at: [arknight38.github.io/Gif-Engine-Library](https://arknight38.github.io/Gif-Engine-Library/)

---

## Overview

This repository hosts a community library of animation packs for Gif-Engine. Users can:
- Browse available packs on the web
- Download packs directly from Gif-Engine (coming soon)
- Submit their own packs via pull requests

---

## Repository Structure

```
Gif-Engine-Library/
├── index.html              # Web gallery (GitHub Pages)
├── manifest.json           # Machine-readable pack index
├── packs/
│   ├── anime-reactions/
│   │   ├── pack.json      # Pack metadata
│   │   ├── preview.gif    # Preview image
│   │   └── animations/
│   │       ├── happy.gif
│   │       ├── sad.gif
│   │       └── ...
│   └── pixel-art/
│       └── ...
└── README.md
```

---

## File Formats

### manifest.json (Repository Root)

The master index of all available packs. Gif-Engine fetches this to display available packs.

```json
{
  "version": "1.0",
  "last_updated": "2026-02-02",
  "packs": [
    {
      "id": "anime-reactions",
      "name": "Anime Reactions Pack",
      "author": "YourUsername",
      "description": "50+ anime reaction GIFs for every mood",
      "version": "1.0.0",
      "tags": ["anime", "reactions", "cute"],
      "preview_url": "https://arknight38.github.io/Gif-Engine-Library/packs/anime-reactions/preview.gif",
      "pack_url": "https://arknight38.github.io/Gif-Engine-Library/packs/anime-reactions/pack.json",
      "animation_count": 52,
      "file_size_mb": 15.2
    }
  ]
}
```

**Required fields:**
- `id` - Unique identifier (lowercase, hyphens only)
- `name` - Display name
- `author` - Creator's name or username
- `description` - Brief description (1-2 sentences)
- `version` - Semantic version (e.g., "1.0.0")
- `tags` - Array of tags for filtering
- `preview_url` - Full URL to preview image
- `pack_url` - Full URL to pack.json

**Optional fields:**
- `animation_count` - Number of animations in pack
- `file_size_mb` - Total size of all animations

### pack.json (Per Pack)

Located at `packs/<pack-id>/pack.json`. Contains pack details and animation list.

```json
{
  "id": "anime-reactions",
  "name": "Anime Reactions Pack",
  "author": "YourUsername",
  "version": "1.0.0",
  "description": "Comprehensive collection of anime reaction GIFs",
  "tags": ["anime", "reactions", "cute"],
  "animations": [
    {
      "filename": "happy.gif",
      "url": "https://arknight38.github.io/Gif-Engine-Library/packs/anime-reactions/animations/happy.gif",
      "display_name": "Happy Reaction",
      "tags": ["happy", "smile", "joy"],
      "default_settings": {
        "scale": 1.5,
        "fps": 30,
        "alignment": "BottomRight",
        "always_on_top": true
      }
    },
    {
      "filename": "sad.gif",
      "url": "https://arknight38.github.io/Gif-Engine-Library/packs/anime-reactions/animations/sad.gif",
      "display_name": "Sad Reaction",
      "tags": ["sad", "cry"],
      "default_settings": {
        "scale": 1.2,
        "fps": 24,
        "alignment": "Center"
      }
    }
  ]
}
```

**Animation object fields:**
- `filename` - Original filename
- `url` - Full URL to the animation file
- `display_name` - Human-readable name
- `tags` - Array of descriptive tags
- `default_settings` (optional) - Recommended settings for this animation

---

## Supported File Formats

- `.gif` - Animated GIF
- `.apng` - Animated PNG
- `.png` - Static PNG (single frame)

---

## Contributing a Pack

Want to share your animations? Follow these steps:

### 1. Prepare Your Pack

Create a folder structure:
```
my-awesome-pack/
├── pack.json
├── preview.gif          # 300x200 or similar aspect ratio
└── animations/
    ├── animation1.gif
    ├── animation2.gif
    └── ...
```

### 2. Create `pack.json`

Use the format above. Make sure:
- `id` is unique and uses lowercase with hyphens
- All URLs point to GitHub Pages (see example above)
- `tags` are relevant and lowercase
- File sizes are reasonable (recommend <5MB per animation)

### 3. Add Preview Image

Create a `preview.gif` that showcases your pack:
- Recommended size: 300x200px (or 3:2 aspect ratio)
- Can be a montage of animations or a representative sample
- Keep file size under 2MB

### 4. Fork and Submit

1. **Fork this repository**
2. **Add your pack** to `packs/<your-pack-id>/`
3. **Update `manifest.json`**:
   - Add your pack entry to the `packs` array
   - Update `last_updated` to today's date
   - Increment pack count in badges (optional)
4. **Test locally** (optional but recommended):
   ```bash
   # Serve locally to test
   python -m http.server 8000
   # Visit http://localhost:8000
   ```
5. **Submit a Pull Request** with:
   - Clear title: "Add [Pack Name] pack"
   - Description of what animations are included
   - Confirmation that you have rights to share these files

### 5. Review Process

Maintainers will check:
- Files follow the correct format
- No copyrighted content (unless you're the creator)
- Animations work and display correctly
- File sizes are reasonable
- No malicious content

---

## Submission Guidelines

### Requirements
- Use descriptive, searchable tags
- Optimize GIF file sizes (use tools like `gifsicle`)
- Include diverse animations in your pack
- Credit original artists if applicable
- Test your pack locally before submitting

### Restrictions
- No copyrighted content without permission
- No NSFW or inappropriate content
- Keep file sizes reasonable (max 10MB per animation)
- No offensive names or tags
- No low-quality or corrupted files

---

## For Developers

### Fetching Packs in Gif-Engine

```rust
use reqwest;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Manifest {
    version: String,
    last_updated: String,
    packs: Vec<PackMetadata>,
}

#[derive(Deserialize)]
struct PackMetadata {
    id: String,
    name: String,
    author: String,
    description: String,
    version: String,
    tags: Vec<String>,
    preview_url: String,
    pack_url: String,
    animation_count: Option<u32>,
    file_size_mb: Option<f32>,
}

async fn fetch_available_packs() -> Result<Vec<PackMetadata>, Box<dyn std::error::Error>> {
    let url = "https://arknight38.github.io/Gif-Engine-Library/manifest.json";
    let response = reqwest::get(url).await?;
    let manifest: Manifest = response.json().await?;
    Ok(manifest.packs)
}
```

### Installing a Pack

```rust
async fn install_pack(pack_url: &str) -> Result<(), Box<dyn std::error::Error>> {
    let response = reqwest::get(pack_url).await?;
    let pack: Pack = response.json().await?;
    
    for animation in pack.animations {
        // Download animation file
        let gif_response = reqwest::get(&animation.url).await?;
        let gif_bytes = gif_response.bytes().await?;
        
        // Save to local gifs directory
        let dest_path = get_gifs_dir().join(&animation.filename);
        std::fs::write(&dest_path, gif_bytes)?;
        
        // Add to library with metadata
        add_to_library(animation, dest_path)?;
    }
    
    Ok(())
}
```

---

## GitHub Pages Setup

This repository is configured to serve as a GitHub Pages site:

1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`
4. Folder: `/ (root)`

The site will be available at: `https://arknight38.github.io/Gif-Engine-Library/`

---

## Pack Statistics

| Metric | Count |
|--------|-------|
| Total Packs | 0 |
| Total Animations | 0 |
| Contributors | 0 |

*Want to see your pack here? Submit one!*

---

## Community

- Main Project: [Gif-Engine](https://github.com/Arknight38/Gif-Engine)
- Issues: [Report problems or suggest packs](https://github.com/Arknight38/Gif-Engine-Library/issues)
- Discussions: Share ideas and feedback

---

## License

Individual packs are licensed by their respective authors. Please check each pack's license before using.

The repository structure and code are licensed under MIT License.

---

## Roadmap

- [ ] Automated pack validation (GitHub Actions)
- [ ] Download statistics tracking
- [ ] Rating system
- [ ] Pack categories/collections
- [ ] Search and filter improvements
- [ ] Featured packs section
- [ ] Automated thumbnail generation

---

## Credits

Maintained by [Arknight38](https://github.com/Arknight38) and the Gif-Engine community.

Special thanks to all pack contributors.
























There's no direct way to change GIF framerate in HTML since the framerate is embedded in the GIF file itself. However, here are your options:

## Option 1: CSS Animation (Fake Slowdown/Speedup)

You can't change the actual GIF speed, but you can make it appear slower/faster by playing with visibility:

```html
<style>
/* Slow down by showing each frame longer */
@keyframes slowGif {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.slow-gif {
  animation: slowGif 2s steps(1) infinite;
}

/* Speed up using faster CSS animation */
.fast-gif {
  animation: spin 0.5s linear infinite;
}
</style>

<img src="animation.gif" class="slow-gif">
```

**Problem:** This doesn't actually change the GIF framerate, just adds effects.

---

## Option 2: Canvas Method (Actual Control)

Extract frames and redraw at your desired framerate:

```html
<canvas id="gifCanvas"></canvas>

<script src="https://cdn.jsdelivr.net/npm/gifler@0.1.0/gifler.min.js"></script>
<script>
const canvas = document.getElementById('gifCanvas');
const ctx = canvas.getContext('2d');

let targetFPS = 15; // Change this to control speed
let frameDelay = 1000 / targetFPS;

gifler('animation.gif').frames(canvas, (ctx, frame) => {
  ctx.drawImage(frame.buffer, 0, 0);
}, frameDelay); // Custom frame delay in milliseconds
</script>
```

---

## Option 3: Use gifuct-js Library (More Control)

```html
<canvas id="canvas"></canvas>

<script type="module">
import { parseGIF, decompressFrames } from 'https://cdn.skypack.dev/gifuct-js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Fetch and parse GIF
const response = await fetch('animation.gif');
const buffer = await response.arrayBuffer();
const gif = parseGIF(buffer);
const frames = decompressFrames(gif, true);

let frameIndex = 0;
let customFPS = 20; // Your desired FPS
let frameDelay = 1000 / customFPS;

// Set canvas size
canvas.width = frames[0].dims.width;
canvas.height = frames[0].dims.height;

function drawFrame() {
  const frame = frames[frameIndex];
  const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);
  imageData.data.set(frame.patch);
  ctx.putImageData(imageData, frame.dims.left, frame.dims.top);
  
  frameIndex = (frameIndex + 1) % frames.length;
  setTimeout(drawFrame, frameDelay);
}

drawFrame();
</script>
```

---

## Option 4: Server-Side Re-encode (Best Quality)

Use a tool to actually re-encode the GIF at a different framerate:

```bash
# Using ffmpeg
ffmpeg -i input.gif -r 15 output.gif

# Using gifsicle
gifsicle --delay=10 input.gif > output.gif  # 10 = 100ms per frame (10 FPS)
```

Then use the re-encoded GIF in HTML normally:
```html
<img src="output.gif">
```

---

## Option 5: JavaScript with gif.js (Generate New GIF)

Actually create a new GIF at runtime with custom framerate:

```html
<script src="https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.js"></script>
<script>
// Parse existing GIF frames
// Re-encode with new timing using gif.js
// This is complex and not recommended for real-time use
</script>
```

---

## Recommended Approach for Gif-Engine Library

For your `index.html` gallery, I'd recommend:

**Option 2 (Canvas with gifler)** - Simple and works well for preview purposes:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .gif-preview {
      width: 300px;
      height: 200px;
      object-fit: contain;
    }
    
    /* Fallback for browsers without canvas support */
    .gif-preview-img {
      display: none;
    }
  </style>
</head>
<body>
  <div class="pack-card">
    <canvas class="gif-preview" data-gif-src="pack/preview.gif" data-fps="15"></canvas>
    <!-- Fallback -->
    <img class="gif-preview-img" src="pack/preview.gif" alt="Preview">
  </div>

  <script src="https://cdn.jsdelivr.net/npm/gifler@0.1.0/gifler.min.js"></script>
  <script>
    document.querySelectorAll('.gif-preview').forEach(canvas => {
      const gifSrc = canvas.dataset.gifSrc;
      const fps = parseInt(canvas.dataset.fps) || 30;
      const frameDelay = 1000 / fps;
      
      gifler(gifSrc)
        .frames(canvas, (ctx, frame) => {
          ctx.drawImage(frame.buffer, 0, 0);
        }, frameDelay);
    });
  </script>
</body>
</html>
```

**For production:** Just re-encode the GIFs at the desired framerate server-side (Option 4) - it's cleaner and more efficient.

Which approach are you looking to use this for?