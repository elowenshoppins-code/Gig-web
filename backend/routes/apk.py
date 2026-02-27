from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
import os
import shutil

router = APIRouter()

# Directory to store APK files
APK_DIR = Path("/app/backend/apk_files")
APK_DIR.mkdir(exist_ok=True)

APK_FILE_PATH = APK_DIR / "gigzipfinder.apk"

@router.post("/upload-apk")
async def upload_apk(file: UploadFile = File(...)):
    """
    Upload APK file - Admin only endpoint
    In production, this should be protected with authentication
    """
    try:
        # Validate file type
        if not file.filename.endswith('.apk'):
            raise HTTPException(status_code=400, detail="Only APK files are allowed")
        
        # Save the file
        with open(APK_FILE_PATH, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return {
            "message": "APK uploaded successfully",
            "filename": file.filename,
            "size": os.path.getsize(APK_FILE_PATH)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/download-apk")
async def download_apk():
    """
    Download the latest APK file
    """
    if not APK_FILE_PATH.exists():
        raise HTTPException(status_code=404, detail="APK file not found. Please upload the APK first.")
    
    return FileResponse(
        path=APK_FILE_PATH,
        media_type="application/vnd.android.package-archive",
        filename="GIGZipFinder.apk"
    )

@router.get("/apk-info")
async def get_apk_info():
    """
    Get information about the current APK
    """
    if not APK_FILE_PATH.exists():
        return {
            "exists": False,
            "message": "No APK file uploaded yet"
        }
    
    file_size = os.path.getsize(APK_FILE_PATH)
    file_size_mb = round(file_size / (1024 * 1024), 2)
    
    return {
        "exists": True,
        "size": file_size,
        "size_mb": file_size_mb,
        "filename": "GIGZipFinder.apk"
    }
