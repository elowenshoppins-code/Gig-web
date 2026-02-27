import React, { useState, useEffect } from 'react';
import { Upload, Check, AlertCircle, Download } from 'lucide-react';
import { Button } from './ui/button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [apkInfo, setApkInfo] = useState(null);

  useEffect(() => {
    fetchApkInfo();
  }, []);

  const fetchApkInfo = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/apk/apk-info`);
      setApkInfo(response.data);
    } catch (error) {
      console.error('Error fetching APK info:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.apk')) {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage('Por favor selecciona un archivo .apk válido');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Por favor selecciona un archivo primero');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/apk/upload-apk`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✅ APK subido exitosamente!');
      setFile(null);
      fetchApkInfo();
      
      // Reset file input
      const fileInput = document.getElementById('apk-file-input');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setMessage('❌ Error al subir el archivo: ' + (error.response?.data?.detail || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0f172a] py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-[#1e293b] rounded-3xl p-8 border border-cyan-500/20">
          <h1 className="text-3xl font-bold text-white mb-2">Admin - Upload APK</h1>
          <p className="text-gray-400 mb-8">Sube el archivo APK para que los usuarios puedan descargarlo</p>

          {/* Current APK Info */}
          {apkInfo?.exists && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Check className="text-green-400" size={20} />
                <span className="text-green-400 font-semibold">APK Actual Disponible</span>
              </div>
              <p className="text-gray-300 text-sm">Tamaño: {apkInfo.size_mb} MB</p>
            </div>
          )}

          {!apkInfo?.exists && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-yellow-400" size={20} />
                <span className="text-yellow-400 font-semibold">No hay APK subido aún</span>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="space-y-4">
            <div>
              <label htmlFor="apk-file-input" className="block text-white font-semibold mb-2">
                Seleccionar archivo APK
              </label>
              <input
                id="apk-file-input"
                type="file"
                accept=".apk"
                onChange={handleFileChange}
                className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 file:cursor-pointer"
              />
            </div>

            {file && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                <p className="text-cyan-400 text-sm">
                  Archivo seleccionado: <span className="font-semibold">{file.name}</span>
                </p>
                <p className="text-gray-400 text-xs">
                  Tamaño: {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>Subiendo...</>
              ) : (
                <>
                  <Upload size={20} className="mr-2" />
                  Subir APK
                </>
              )}
            </Button>

            {message && (
              <div className={`rounded-lg p-3 ${message.includes('✅') ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <p className={`text-sm ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 pt-6 border-t border-cyan-500/20">
            <h3 className="text-white font-semibold mb-3">Instrucciones:</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Selecciona el archivo .apk de GIG ZipFinder</li>
              <li>• Haz clic en "Subir APK"</li>
              <li>• El archivo estará disponible para descarga en la página principal</li>
              <li>• Puedes subir un nuevo APK para reemplazar el anterior</li>
            </ul>
          </div>

          {/* Test Download */}
          {apkInfo?.exists && (
            <div className="mt-6">
              <Button
                onClick={() => window.open(`${BACKEND_URL}/api/apk/download-apk`, '_blank')}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full"
              >
                <Download size={20} className="mr-2" />
                Probar Descarga
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
