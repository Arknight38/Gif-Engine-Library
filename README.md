# Gif-Engine Library

This repository is a **community library** for Gif-Engine animation packs, intended to be hosted on **GitHub Pages**.

## Structure

```
/
  index.html          # Browsable pack gallery (GitHub Pages)
  manifest.json       # Machine-readable manifest that Gif-Engine can fetch
  packs/
    <pack-id>/
      pack.json       # Pack metadata + animation list
      preview.gif     # Preview image for the gallery
      animations/
        *.gif|*.apng|*.png
```

## GitHub Pages

In GitHub:
- Settings → Pages
- Source: `main` branch
- Folder: `/ (root)`

Your site will be available at:
`https://<username>.github.io/<repo>/`

## Manifest format (`manifest.json`)

`manifest.json` contains a top-level list of packs:

```json
{
  "version": "1.0",
  "last_updated": "2026-02-02",
  "packs": [
    {
      "id": "example-pack",
      "name": "Example Pack",
      "author": "CommunityUser",
      "description": "Short description",
      "version": "1.0.0",
      "tags": ["tag1", "tag2"],
      "preview_url": "https://<username>.github.io/<repo>/packs/example-pack/preview.gif",
      "pack_url": "https://<username>.github.io/<repo>/packs/example-pack/pack.json"
    }
  ]
}
```

## Pack format (`packs/<pack-id>/pack.json`)

Each pack lists its animations:

```json
{
  "id": "example-pack",
  "name": "Example Pack",
  "author": "CommunityUser",
  "version": "1.0.0",
  "description": "Short description",
  "tags": ["tag1", "tag2"],
  "animations": [
    {
      "filename": "happy.gif",
      "url": "https://<username>.github.io/<repo>/packs/example-pack/animations/happy.gif",
      "display_name": "Happy",
      "tags": ["happy", "smile"]
    }
  ]
}
```


"# Gif-Engine-Library" 
