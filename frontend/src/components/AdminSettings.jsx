import React, { useState, useEffect } from 'react';
import { Save, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    google_play_url: '',
    apple_store_url: '',
    google_analytics_id: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/settings/store-links`);
      setSettings({
        google_play_url: response.data.google_play_url || '',
        apple_store_url: response.data.apple_store_url || '',
        google_analytics_id: response.data.google_analytics_id || ''
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setMessage('');
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await axios.post(`${BACKEND_URL}/api/settings/store-links`, settings);
      setMessage('✅ Configuración guardada exitosamente!');
    } catch (error) {
      setMessage('❌ Error al guardar: ' + (error.response?.data?.detail || error.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0f172a] py-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0f172a] py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-[#1e293b] rounded-3xl p-8 border border-cyan-500/20">
          <h1 className="text-3xl font-bold text-white mb-2">Admin - Configuración de Tiendas y Analytics</h1>
          <p className="text-gray-400 mb-8">Configura los enlaces a las tiendas y Google Analytics</p>

          {/* Settings Form */}
          <div className="space-y-6">
            {/* Google Play Store */}
            <div>
              <label htmlFor="google-play" className="block text-white font-semibold mb-2 flex items-center gap-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Google Play"
                  className="h-6 w-auto"
                />
                URL de Google Play Store
              </label>
              <input
                id="google-play"
                type="url"
                value={settings.google_play_url}
                onChange={(e) => handleChange('google_play_url', e.target.value)}
                placeholder="https://play.google.com/store/apps/details?id=..."
                className="w-full bg-[#0f172a] border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
              <p className="text-gray-400 text-sm mt-2">
                Deja vacío si aún no está disponible. Cuando agregues la URL, el botón se activará automáticamente.
              </p>
            </div>

            {/* Apple App Store */}
            <div>
              <label htmlFor="apple-store" className="block text-white font-semibold mb-2 flex items-center gap-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="App Store"
                  className="h-6 w-auto"
                />
                URL de Apple App Store
              </label>
              <input
                id="apple-store"
                type="url"
                value={settings.apple_store_url}
                onChange={(e) => handleChange('apple_store_url', e.target.value)}
                placeholder="https://apps.apple.com/us/app/..."
                className="w-full bg-[#0f172a] border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
              <p className="text-gray-400 text-sm mt-2">
                Deja vacío si aún no está disponible. Cuando agregues la URL, el botón se activará automáticamente.
              </p>
            </div>

            {/* Google Analytics */}
            <div>
              <label htmlFor="ga-id" className="block text-white font-semibold mb-2 flex items-center gap-2">
                📊 Google Analytics ID
              </label>
              <input
                id="ga-id"
                type="text"
                value={settings.google_analytics_id}
                onChange={(e) => handleChange('google_analytics_id', e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full bg-[#0f172a] border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
              <p className="text-gray-400 text-sm mt-2">
                Tu Google Analytics 4 Tracking ID. Formato: G-XXXXXXXXXX
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mt-3">
                <p className="text-yellow-200 text-sm">
                  ⚠️ Después de agregar el GA ID, debes actualizar el archivo <code className="bg-black/30 px-1 rounded">/app/frontend/src/utils/analytics.js</code> con el nuevo ID para que funcione.
                </p>
              </div>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>Guardando...</>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  Guardar Configuración
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
            <h3 className="text-white font-semibold mb-3">📋 Instrucciones:</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong>Google Play / App Store:</strong> Agrega las URLs cuando las apps estén publicadas</li>
              <li>• Los botones de descarga se activarán automáticamente cuando agregues las URLs</li>
              <li>• <strong>Google Analytics:</strong> Obtén tu ID desde <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Google Analytics</a></li>
              <li>• Las descargas de APK y clics en tiendas se trackearán automáticamente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
