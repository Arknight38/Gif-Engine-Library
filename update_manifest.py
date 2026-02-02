import os
import json
from datetime import datetime

LIBRARY_ROOT = os.path.dirname(os.path.abspath(__file__))
PACKS_DIR = os.path.join(LIBRARY_ROOT, 'packs')
MANIFEST_PATH = os.path.join(LIBRARY_ROOT, 'manifest.json')

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

    packs = []
    
    # Iterate over directories in packs folder
    if os.path.exists(PACKS_DIR):
        for pack_name in os.listdir(PACKS_DIR):
            pack_path = os.path.join(PACKS_DIR, pack_name)
            if os.path.isdir(pack_path):
                pack_json_path = os.path.join(pack_path, 'pack.json')
                if os.path.exists(pack_json_path):
                    try:
                        pack_data = load_json(pack_json_path)
                        # We append the pack data as is. 
                        # The assumption is that pack.json contains the correct relative paths 
                        # for the pack structure itself.
                        packs.append(pack_data)
                        print(f"Added pack: {pack_name}")
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
    manifest['packs'] = packs

    save_json(MANIFEST_PATH, manifest)
    print(f"Manifest updated at {MANIFEST_PATH}")

if __name__ == "__main__":
    update_manifest()
