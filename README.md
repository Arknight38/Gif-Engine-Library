# Gif-Engine Community Library

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://arknight38.github.io/Gif-Engine-Library/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Packs](https://img.shields.io/badge/packs-9-blue)](https://arknight38.github.io/Gif-Engine-Library/)

> Community-curated animation packs for [Gif-Engine](https://github.com/Arknight38/Gif-Engine)

**[🌐 Browse Library](https://arknight38.github.io/Gif-Engine-Library/)** • **[📦 Submit a Pack](#contributing-a-pack)** • **[📖 Documentation](#documentation)**

---

## What is This?

This repository hosts a community library of animation packs for **Gif-Engine** - a desktop pet application that displays animated characters on your screen. Users can:

- **Browse** available animation packs in a web gallery
- **Download** packs with one click
- **Submit** their own creations via pull requests
- **Share** animations with the community

All packs are hosted on GitHub Pages for free, fast, and reliable access.

---

## Quick Start

### For Users

1. Visit the **[Web Gallery](https://arknight38.github.io/Gif-Engine-Library/)**
2. Browse available animation packs
3. Click **"Open pack.json"** on any pack
4. Use the URL in Gif-Engine to install (coming soon)

### For Contributors

Want to share your animations? Jump to **[Contributing a Pack](#contributing-a-pack)**.

---

## Repository Structure

```
Gif-Engine-Library/
├── index.html              # Web gallery interface
├── manifest.json           # Master pack index (auto-generated)
├── update_manifest.py      # Script to rebuild manifest
├── packs/
│   ├── anime-reactions/
│   │   ├── pack.json      # Pack metadata
│   │   ├── preview.gif    # Preview image (optional)
│   │   └── animations/
│   │       ├── happy.gif
│   │       ├── sad.gif
│   │       └── ...
│   └── pixel-art/
│       └── ...
└── README.md
```

---

## Documentation

### File Formats

#### `manifest.json` (Auto-Generated)

The master index of all packs. **Do not edit manually** - it's automatically updated by the GitHub Action when you submit a pack.

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
      "preview_fps": 30,
      "pack_url": "https://arknight38.github.io/Gif-Engine-Library/packs/anime-reactions/pack.json",
      "animation_count": 52,
      "file_size_mb": 15.2
    }
  ]
}
```

<details>
<summary><strong>Field Reference</strong></summary>

| Field | Required | Description |
|-------|----------|-------------|
| `id` | ✅ | Unique identifier (lowercase, hyphens only) |
| `name` | ✅ | Display name |
| `author` | ✅ | Creator's name or username |
| `description` | ✅ | Brief description (1-2 sentences) |
| `version` | ✅ | Semantic version (e.g., "1.0.0") |
| `tags` | ✅ | Array of searchable tags |
| `preview_url` | ✅ | Full URL to preview image |
| `preview_fps` | ❌ | FPS for GIF playback (if applicable) |
| `pack_url` | ✅ | Full URL to pack.json |
| `animation_count` | ❌ | Number of animations |
| `file_size_mb` | ❌ | Total size in MB |

</details>

#### `pack.json` (Per Pack)

Located at `packs/<pack-id>/pack.json`. Defines pack metadata and lists all animations.

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
      "url": "animations/happy.gif",
      "display_name": "Happy Reaction",
      "tags": ["happy", "smile", "joy"],
      "default_settings": {
        "scale": 1.5,
        "fps": 30,
        "alignment": "BottomRight",
        "always_on_top": true
      }
    }
  ]
}
```

<details>
<summary><strong>Animation Object Fields</strong></summary>

| Field | Required | Description |
|-------|----------|-------------|
| `filename` | ✅ | Original filename |
| `url` | ✅ | Relative path from pack root |
| `display_name` | ✅ | Human-readable name |
| `tags` | ❌ | Array of descriptive tags |
| `default_settings` | ❌ | Recommended playback settings |

**Default Settings** (all optional):
- `scale` - Size multiplier (e.g., 1.5)
- `fps` - Frames per second
- `alignment` - Screen position
- `always_on_top` - Keep above other windows

</details>

### Supported File Formats

| Format | Extension | Notes |
|--------|-----------|-------|
| Animated GIF | `.gif` | Most common format |
| Animated PNG | `.apng` | Better quality, larger files |
| Static PNG | `.png` | Single-frame images |

---

## Contributing a Pack

### Step 1: Prepare Your Pack

Create a folder with this structure:

```
my-awesome-pack/
├── pack.json           # Required
├── preview.gif         # Optional but recommended
└── animations/
    ├── animation1.gif
    ├── animation2.apng
    └── ...
```

#### Creating `pack.json`

Use this template:

```json
{
  "id": "my-awesome-pack",
  "name": "My Awesome Pack",
  "author": "YourUsername",
  "version": "1.0.0",
  "description": "A collection of awesome animations",
  "tags": ["awesome", "cool", "fun"],
  "animations": [
    {
      "filename": "animation1.gif",
      "url": "animations/animation1.gif",
      "display_name": "Animation 1",
      "tags": ["tag1", "tag2"],
      "default_settings": {
        "scale": 1.0,
        "fps": 30
      }
    }
  ]
}
```

**Important:**
- `id` must be unique and use only lowercase letters, numbers, and hyphens
- `url` should be relative to the pack folder (e.g., `animations/file.gif`)
- All tags should be lowercase
- File sizes: Keep each animation under 10MB

#### Creating a Preview Image

Optional but **highly recommended**:
- Size: 300×200px (or 3:2 aspect ratio)
- Format: GIF or PNG
- File size: Under 2MB
- Content: Showcase multiple animations or a representative sample

### Step 2: Test Locally (Optional)

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/Gif-Engine-Library.git
cd Gif-Engine-Library

# Add your pack
cp -r /path/to/my-awesome-pack packs/

# Run the update script
python update_manifest.py

# Serve locally
python -m http.server 8000

# Visit http://localhost:8000 to test
```

### Step 3: Submit Your Pack

1. **Fork** this repository
2. **Add your pack** to `packs/<your-pack-id>/`
3. **Commit** with a clear message:
   ```bash
   git add packs/my-awesome-pack
   git commit -m "Add My Awesome Pack - collection of awesome animations"
   git push
   ```
4. **Open a Pull Request** with:
   - Title: `Add [Pack Name] pack`
   - Description of what animations are included
   - Confirmation that you have rights to share these files

### Step 4: Review

Maintainers will check:
- ✅ Files follow the correct format
- ✅ No copyrighted content (unless you're the creator)
- ✅ Animations work correctly
- ✅ File sizes are reasonable
- ✅ No malicious or inappropriate content

Once approved, your pack will be automatically added to the library!

---

## Submission Guidelines

### ✅ Best Practices

- Use **descriptive, searchable tags**
- **Optimize file sizes** using tools like [gifsicle](https://www.lcdf.org/gifsicle/)
- Include **diverse animations** in your pack
- **Credit original artists** if applicable
- **Test locally** before submitting
- Write a **clear description** (think SEO!)

### ❌ Restrictions

- ❌ No copyrighted content without permission
- ❌ No NSFW or inappropriate content
- ❌ Maximum 10MB per animation
- ❌ No offensive names or tags
- ❌ No corrupted or low-quality files
- ❌ No malicious code or links

---

## For Developers

### Fetching Packs Programmatically

**Rust Example:**

```rust
use reqwest;
use serde::Deserialize;

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
    preview_url: String,
    pack_url: String,
    // ... other fields
}

async fn fetch_available_packs() -> Result<Vec<PackMetadata>, Box<dyn std::error::Error>> {
    let url = "https://arknight38.github.io/Gif-Engine-Library/manifest.json";
    let manifest: Manifest = reqwest::get(url).await?.json().await?;
    Ok(manifest.packs)
}
```

### Installing a Pack

```rust
async fn install_pack(pack_url: &str) -> Result<(), Box<dyn std::error::Error>> {
    let pack: Pack = reqwest::get(pack_url).await?.json().await?;
    
    for animation in pack.animations {
        let full_url = format!(
            "https://arknight38.github.io/Gif-Engine-Library/packs/{}/{}",
            pack.id, animation.url
        );
        
        let bytes = reqwest::get(&full_url).await?.bytes().await?;
        let dest = get_gifs_dir().join(&animation.filename);
        std::fs::write(&dest, bytes)?;
    }
    
    Ok(())
}
```

---

## Pack Statistics

| Metric | Count |
|--------|-------|
| Total Packs | 9 |
| Total Animations | 9 |
| Contributors | 1 |

*Last updated: 2026-02-02*

---

## Community

- **Main Project:** [Gif-Engine](https://github.com/Arknight38/Gif-Engine)
- **Report Issues:** [Issue Tracker](https://github.com/Arknight38/Gif-Engine-Library/issues)
- **Discussions:** [Share ideas and feedback](https://github.com/Arknight38/Gif-Engine-Library/discussions)

---

## Roadmap

- [x] Web gallery with search
- [x] Auto-generated manifest
- [x] GitHub Actions automation
- [ ] In-app pack browser (Gif-Engine integration)
- [ ] Download statistics
- [ ] Rating system
- [ ] Pack categories
- [ ] Featured packs section
- [ ] User profiles

---

## License

Individual packs are licensed by their respective authors. Please check each pack's license before using.

The repository structure and code are licensed under the **MIT License**.

---

## Credits

**Maintained by:** [Arknight38](https://github.com/Arknight38)

**Special thanks to all pack contributors!**

---

<div align="center">

**[⬆ Back to Top](#gif-engine-community-library)**

Made with ❤️ by the Gif-Engine community

</div>
