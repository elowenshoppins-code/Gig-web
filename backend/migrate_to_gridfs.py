#!/usr/bin/env python3
"""
Script para migrar APK existente a MongoDB GridFS
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from pathlib import Path
import os

async def migrate_apk():
    # Conexión a MongoDB
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'test_database')
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    fs = AsyncIOMotorGridFSBucket(db)
    
    # Buscar APK en ubicaciones posibles
    apk_locations = [
        "/data/db/apk_storage/gigzipfinder.apk",
        "/data/db/apk_backup/gigzipfinder.apk",
        "/app/backend/apk_files/gigzipfinder.apk"
    ]
    
    apk_path = None
    for location in apk_locations:
        if Path(location).exists():
            apk_path = location
            print(f"✅ APK encontrado en: {location}")
            break
    
    if not apk_path:
        print("❌ No se encontró APK en ninguna ubicación")
        return False
    
    # Leer APK
    with open(apk_path, 'rb') as f:
        apk_data = f.read()
    
    file_size = len(apk_data)
    print(f"📦 Tamaño del APK: {file_size / (1024*1024):.2f} MB")
    
    # Eliminar APK anterior si existe
    apk_filename = "gigzipfinder.apk"
    async for grid_file in fs.find({"filename": apk_filename}):
        await fs.delete(grid_file._id)
        print("🗑️  APK anterior eliminado de GridFS")
    
    # Subir a GridFS
    from datetime import datetime
    import io
    
    file_id = await fs.upload_from_stream(
        apk_filename,
        io.BytesIO(apk_data),
        metadata={
            "contentType": "application/vnd.android.package-archive",
            "uploadDate": datetime.utcnow().isoformat(),
            "size": file_size,
            "migrated": True
        }
    )
    
    print(f"✅ APK migrado exitosamente a MongoDB GridFS")
    print(f"📋 File ID: {file_id}")
    print(f"💾 Almacenado en: {db_name}.fs collection")
    
    # Verificar
    grid_file = await fs.find_one({"filename": apk_filename})
    if grid_file:
        print(f"✅ Verificación exitosa: {grid_file.length / (1024*1024):.2f} MB en GridFS")
        return True
    else:
        print("❌ Error: No se pudo verificar el archivo")
        return False

if __name__ == "__main__":
    success = asyncio.run(migrate_apk())
    exit(0 if success else 1)
