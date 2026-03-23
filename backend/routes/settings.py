from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from typing import Optional
from pathlib import Path
import json
import os

router = APIRouter()

# Configuration file - Use relative path
BACKEND_DIR = Path(__file__).parent.parent
CONFIG_DIR = BACKEND_DIR / "config"
CONFIG_DIR.mkdir(parents=True, exist_ok=True)
CONFIG_FILE = CONFIG_DIR / "app_settings.json"

class StoreLinks(BaseModel):
    google_play_url: Optional[HttpUrl] = None
    apple_store_url: Optional[HttpUrl] = None
    google_analytics_id: Optional[str] = None

def load_config():
    if CONFIG_FILE.exists():
        with open(CONFIG_FILE, 'r') as f:
            return json.load(f)
    return {
        "google_play_url": None,
        "apple_store_url": None,
        "google_analytics_id": None
    }

def save_config(config):
    with open(CONFIG_FILE, 'w') as f:
        json.dump(config, f, indent=2)

@router.get("/store-links")
async def get_store_links():
    """Get configured store links and GA ID"""
    config = load_config()
    return config

@router.post("/store-links")
async def update_store_links(links: StoreLinks):
    """Update store links and GA ID"""
    try:
        config = {
            "google_play_url": str(links.google_play_url) if links.google_play_url else None,
            "apple_store_url": str(links.apple_store_url) if links.apple_store_url else None,
            "google_analytics_id": links.google_analytics_id
        }
        save_config(config)
        return {"message": "Store links updated successfully", "config": config}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
