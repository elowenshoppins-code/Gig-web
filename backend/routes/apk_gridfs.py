from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from pathlib import Path
import os
import io
from datetime import datetime

router = APIRouter()

# MongoDB connection for GridFS
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'test_database')

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]
fs = AsyncIOMotorGridFSBucket(db)

APK_FILENAME = "gigzipfinder.apk"

@router.post("/upload-apk")
async def upload_apk(file: UploadFile = File(...)):
    """
    Upload APK file to MongoDB GridFS (TRULY PERSISTENT)
    This survives ALL container restarts and scaling
    """
    try:
        # Validate file is APK
        if not file.filename.endswith('.apk'):
            raise HTTPException(status_code=400, detail="File must be an APK")
        
        # Read file content
        content = await file.read()
        file_size = len(content)
        
        # Delete old APK if exists
        async for grid_file in fs.find({"filename": APK_FILENAME}):
            await fs.delete(grid_file._id)
        
        # Upload to GridFS with metadata
        file_id = await fs.upload_from_stream(
            APK_FILENAME,
            io.BytesIO(content),
            metadata={
                "contentType": "application/vnd.android.package-archive",
                "uploadDate": datetime.utcnow().isoformat(),
                "size": file_size
            }
        )
        
        return {
            "message": "APK uploaded successfully to MongoDB GridFS",
            "filename": APK_FILENAME,
            "size": file_size,
            "size_mb": round(file_size / (1024 * 1024), 2),
            "file_id": str(file_id)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading APK: {str(e)}")

@router.get("/download-apk")
async def download_apk():
    """
    Download APK from MongoDB GridFS
    """
    try:
        # Find the APK in GridFS
        grid_out = await fs.open_download_stream_by_name(APK_FILENAME)
        
        # Stream the file
        async def stream_file():
            while True:
                chunk = await grid_out.read(1024 * 1024)  # 1MB chunks
                if not chunk:
                    break
                yield chunk
        
        return StreamingResponse(
            stream_file(),
            media_type="application/vnd.android.package-archive",
            headers={
                "Content-Disposition": f"attachment; filename={APK_FILENAME}",
                "Content-Length": str(grid_out.length)
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=404, detail="APK not found")

@router.get("/apk-info")
async def get_apk_info():
    """
    Get information about the current APK from MongoDB GridFS
    Returns with no-cache headers
    """
    try:
        # Find the APK in GridFS using find()
        cursor = fs.find({"filename": APK_FILENAME})
        grid_file = None
        async for f in cursor:
            grid_file = f
            break
        
        if not grid_file:
            return JSONResponse(
                content={
                    "exists": False,
                    "message": "No APK file uploaded yet"
                },
                headers={
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0"
                }
            )
        
        file_size = grid_file.length
        file_size_mb = round(file_size / (1024 * 1024), 2)
        
        return JSONResponse(
            content={
                "exists": True,
                "size": file_size,
                "size_mb": file_size_mb,
                "filename": "GIGZipFinder.apk",
                "upload_date": grid_file.upload_date.isoformat() if grid_file.upload_date else None,
                "stored_in": "MongoDB GridFS (PERSISTENT - NEVER DELETED)"
            },
            headers={
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        )
        
    except Exception as error:
        return JSONResponse(
            content={
                "exists": False,
                "message": f"Error: {str(error)}"
            },
            status_code=500
        )
