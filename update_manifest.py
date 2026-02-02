import os
import json
from datetime import datetime

LIBRARY_ROOT = os.path.dirname(os.path.abspath(__file__))
PACKS_DIR = os.path.join(LIBRARY_ROOT, 'packs')
MANIFEST_PATH = os.path.join(LIBRARY_ROOT, 'manifest.json')
BASE_URL = "https://arknight38.github.io/Gif-Engine-Library"

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

def update_manifest():
    if not os.path.exists(PACKS_DIR):
        print(f"Packs directory not found: {PACKS_DIR}")
        return

    packs_metadata = []
    
    # Iterate over directories in packs folder
    if os.path.exists(PACKS_DIR):
        for pack_id in os.listdir(PACKS_DIR):
            pack_path = os.path.join(PACKS_DIR, pack_id)
            if os.path.isdir(pack_path):
                pack_json_path = os.path.join(pack_path, 'pack.json')
                if os.path.exists(pack_json_path):
                    try:
                        pack_data = load_json(pack_json_path)
                        
                        # Construct PackMetadata
                        # Required fields: id, name, author, description, version, tags, preview_url, pack_url
                        
                        # Infer preview URL (try preview.gif, then first animation)
                        preview_url = ""
                        preview_fps = None
                        
                        preview_path_local = os.path.join(pack_path, "preview.gif")
                        if os.path.exists(preview_path_local):
                            preview_url = f"{BASE_URL}/packs/{pack_id}/preview.gif"
                        elif pack_data.get("animations"):
                            first_anim = pack_data["animations"][0]
                            # Assuming anim url is relative like "animations/foo.gif"
                            anim_url = first_anim.get("url", "")
                            if anim_url:
                                preview_url = f"{BASE_URL}/packs/{pack_id}/{anim_url}"
                                # Extract FPS if available
                                if "default_settings" in first_anim:
                                    preview_fps = first_anim["default_settings"].get("fps")
                        
                        meta = {
                            "id": pack_data.get("id", pack_id),
                            "name": pack_data.get("name", pack_id),
                            "author": pack_data.get("author", "Unknown"),
                            "description": pack_data.get("description", f"Pack {pack_id}"),
                            "version": pack_data.get("version", "1.0.0"),
                            "tags": pack_data.get("tags", []),
                            "preview_url": preview_url,
                            "preview_fps": preview_fps,
                            "pack_url": f"{BASE_URL}/packs/{pack_id}/pack.json",
                            "animation_count": len(pack_data.get("animations", [])),
                            "file_size_mb": 0.0 # Placeholder
                        }
                        
                        packs_metadata.append(meta)
                        print(f"Added pack: {pack_id}")
                    except Exception as e:
                        print(f"Error reading {pack_json_path}: {e}")
                else:
                    print(f"Warning: No pack.json found in {pack_path}")

    # Load existing manifest to preserve other fields (like icons)
    if os.path.exists(MANIFEST_PATH):
        try:
            manifest = load_json(MANIFEST_PATH)
        except Exception:
            manifest = {"version": "1.0", "icons": []}
    else:
        manifest = {"version": "1.0", "icons": []}

    manifest['last_updated'] = datetime.now().strftime("%Y-%m-%d")
    manifest['packs'] = packs_metadata

    save_json(MANIFEST_PATH, manifest)
    print(f"Manifest updated at {MANIFEST_PATH}")

if __name__ == "__main__":
    update_manifest()
