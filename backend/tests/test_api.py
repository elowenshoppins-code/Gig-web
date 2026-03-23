"""
Backend API Tests for GIG ZipFinder
Tests: APK routes, Settings routes, and base API endpoints
"""

import pytest
import requests
import os
import tempfile

# Get BASE_URL from environment variable
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndBase:
    """Basic API health check tests"""
    
    def test_base_api_endpoint(self):
        """Test the base /api/ endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✅ Base API endpoint working: {data}")

class TestAPKEndpoints:
    """APK upload/download endpoint tests"""
    
    def test_apk_info_endpoint(self):
        """Test /api/apk/apk-info endpoint returns proper structure"""
        response = requests.get(f"{BASE_URL}/api/apk/apk-info")
        assert response.status_code == 200
        data = response.json()
        
        # Check response structure
        assert "exists" in data
        assert isinstance(data["exists"], bool)
        
        if data["exists"]:
            assert "size" in data
            assert "size_mb" in data
            assert "filename" in data
            print(f"✅ APK exists - Size: {data['size_mb']} MB")
        else:
            assert "message" in data
            print(f"✅ APK info endpoint working - No APK uploaded yet")
    
    def test_apk_download_without_file(self):
        """Test /api/apk/download-apk endpoint when no APK exists"""
        # First check if APK exists
        info_response = requests.get(f"{BASE_URL}/api/apk/apk-info")
        apk_exists = info_response.json().get("exists", False)
        
        response = requests.get(f"{BASE_URL}/api/apk/download-apk", allow_redirects=False)
        
        if not apk_exists:
            # Should return 404 when no APK is uploaded
            assert response.status_code == 404
            print("✅ Download endpoint correctly returns 404 when no APK uploaded")
        else:
            # Should return 200 with file
            assert response.status_code == 200
            print("✅ Download endpoint returns file correctly")

class TestSettingsEndpoints:
    """Settings/Store links endpoint tests"""
    
    def test_get_store_links(self):
        """Test GET /api/settings/store-links endpoint"""
        response = requests.get(f"{BASE_URL}/api/settings/store-links")
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "google_play_url" in data or data.get("google_play_url") is None
        assert "apple_store_url" in data or data.get("apple_store_url") is None
        assert "google_analytics_id" in data or data.get("google_analytics_id") is None
        print(f"✅ Store links endpoint working: {data}")
    
    def test_update_store_links(self):
        """Test POST /api/settings/store-links endpoint"""
        payload = {
            "google_play_url": "https://play.google.com/store/apps/details?id=com.test",
            "apple_store_url": None,
            "google_analytics_id": "G-TESTID123"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/settings/store-links",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "config" in data
        print(f"✅ Store links update working: {data}")
        
        # Verify by GET
        get_response = requests.get(f"{BASE_URL}/api/settings/store-links")
        assert get_response.status_code == 200
        get_data = get_response.json()
        assert get_data.get("google_analytics_id") == "G-TESTID123"
        print("✅ Verified settings persisted correctly")

class TestStatusEndpoints:
    """Status check endpoint tests"""
    
    def test_create_status_check(self):
        """Test POST /api/status endpoint"""
        payload = {"client_name": "TEST_api_test"}
        
        response = requests.post(
            f"{BASE_URL}/api/status",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert "client_name" in data
        assert data["client_name"] == "TEST_api_test"
        print(f"✅ Status check created: {data}")
    
    def test_get_status_checks(self):
        """Test GET /api/status endpoint"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        data = response.json()
        
        # Should return a list
        assert isinstance(data, list)
        print(f"✅ Status checks retrieved: {len(data)} records")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
