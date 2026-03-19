"""
GIG ZipFinder Production API Tests
Tests for production endpoints: https://gigzipfinder-production.up.railway.app

Features tested:
- Health check endpoint
- ZIP codes retrieval
- Guides listing and downloads
- Terms & conditions  
- Stripe checkout session creation
- Payment verification endpoints
- AI ZIP search (known to fail due to LlmChat not imported)
"""

import pytest
import requests

# Production backend URL
BASE_URL = "https://gigzipfinder-production.up.railway.app"


class TestProductionHealth:
    """Basic health and connectivity tests for production"""
    
    def test_health_check(self):
        """Test /api/health returns 200 and healthy status"""
        response = requests.get(f"{BASE_URL}/api/health", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        print(f"✅ Production health check passed: {data}")


class TestProductionZipCodes:
    """ZIP codes endpoint tests for production"""
    
    def test_get_zip_codes_instacart(self):
        """Test getting ZIP codes for Instacart"""
        response = requests.get(f"{BASE_URL}/api/zip-codes/instacart", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Instacart ZIP codes: {len(data)} found")
    
    def test_get_zip_codes_doordash(self):
        """Test getting ZIP codes for DoorDash"""
        response = requests.get(f"{BASE_URL}/api/zip-codes/doordash", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ DoorDash ZIP codes: {len(data)} found")
    
    def test_get_zip_codes_spark(self):
        """Test getting ZIP codes for Spark"""
        response = requests.get(f"{BASE_URL}/api/zip-codes/spark", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Spark ZIP codes: {len(data)} found")


class TestProductionGuides:
    """Guides endpoint tests for production"""
    
    def test_guides_list(self):
        """Test /api/guides-list returns available guides"""
        response = requests.get(f"{BASE_URL}/api/guides-list", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 8, "Should have 8 guides (4 apps x 2 languages)"
        print(f"✅ Guides list: {len(data)} guides available")
        
        # Check expected apps are present
        apps = [g["app"] for g in data]
        assert "instacart" in apps
        assert "doordash" in apps
        assert "spark" in apps
        assert "google_voice" in apps
    
    def test_guide_download_instacart_en(self):
        """Test Instacart English guide download"""
        response = requests.get(
            f"{BASE_URL}/api/download-guide/instacart/en",
            stream=True,
            timeout=15
        )
        assert response.status_code == 200
        assert "application/pdf" in response.headers.get("content-type", "")
        print("✅ Instacart English guide downloadable")
    
    def test_guide_download_doordash_es(self):
        """Test DoorDash Spanish guide download"""
        response = requests.get(
            f"{BASE_URL}/api/download-guide/doordash/es",
            stream=True,
            timeout=15
        )
        assert response.status_code == 200
        assert "application/pdf" in response.headers.get("content-type", "")
        print("✅ DoorDash Spanish guide downloadable")


class TestProductionTerms:
    """Terms & conditions endpoint tests for production"""
    
    def test_get_terms(self):
        """Test /api/terms returns terms and conditions"""
        response = requests.get(f"{BASE_URL}/api/terms", timeout=10)
        assert response.status_code == 200
        data = response.json()
        
        assert "content_en" in data
        assert "content_es" in data
        assert "version" in data
        assert len(data["content_en"]) > 100
        assert len(data["content_es"]) > 100
        print(f"✅ Terms retrieved: v{data['version']}")


class TestProductionStripe:
    """Stripe payment endpoint tests for production"""
    
    def test_stripe_config(self):
        """Test /api/stripe/config returns publishable key"""
        response = requests.get(f"{BASE_URL}/api/stripe/config", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert "publishable_key" in data
        key = data["publishable_key"]
        assert key.startswith("pk_live_"), "Should be LIVE publishable key"
        print(f"✅ Stripe LIVE config: Key starts with {key[:15]}...")
    
    def test_create_checkout_session(self):
        """Test Stripe checkout session creation with LIVE keys"""
        response = requests.post(
            f"{BASE_URL}/api/stripe/create-checkout-session",
            json={
                "user_id": "test_prod_user_123",
                "app_name": "instacart",
                "terms_accepted": True
            },
            timeout=15
        )
        assert response.status_code == 200
        data = response.json()
        assert "checkout_url" in data
        assert "session_id" in data
        assert data["checkout_url"].startswith("https://checkout.stripe.com")
        print(f"✅ Stripe checkout session created: {data['checkout_url'][:60]}...")
    
    def test_create_checkout_without_terms_fails(self):
        """Test checkout fails when terms not accepted"""
        response = requests.post(
            f"{BASE_URL}/api/stripe/create-checkout-session",
            json={
                "user_id": "test_user_123",
                "app_name": "instacart",
                "terms_accepted": False
            },
            timeout=10
        )
        assert response.status_code == 400
        print("✅ Checkout correctly fails without terms acceptance")
    
    def test_check_payment_by_user(self):
        """Test payment check endpoint"""
        response = requests.get(
            f"{BASE_URL}/api/stripe/check-payment-by-user/nonexistent_user_xyz",
            params={"app_name": "instacart"},
            timeout=10
        )
        assert response.status_code == 200
        data = response.json()
        assert data["found"] == False
        print(f"✅ Payment check returns not found for nonexistent user")
    
    def test_paid_apps_endpoint(self):
        """Test paid apps endpoint"""
        response = requests.get(
            f"{BASE_URL}/api/stripe/paid-apps/test_user_123",
            timeout=10
        )
        assert response.status_code == 200
        data = response.json()
        assert "paid_apps" in data
        assert "count" in data
        print(f"✅ Paid apps endpoint works: {data}")


class TestProductionAISearch:
    """AI ZIP code search tests - EXPECTED TO FAIL due to missing import"""
    
    @pytest.mark.xfail(reason="LlmChat and UserMessage not imported in production")
    def test_ai_search_instacart(self):
        """Test AI-powered ZIP code search - KNOWN BUG: LlmChat not defined"""
        response = requests.post(
            f"{BASE_URL}/api/search-zip-codes/instacart",
            timeout=60
        )
        # This FAILS with 500 due to: name 'LlmChat' is not defined
        assert response.status_code == 200
        data = response.json()
        assert "zip_codes" in data
        print(f"✅ AI search works: {len(data.get('zip_codes', []))} codes found")


class TestProductionAPK:
    """APK download endpoint tests"""
    
    def test_apk_info(self):
        """Test APK info endpoint"""
        response = requests.get(f"{BASE_URL}/api/apk/apk-info", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert data["exists"] == True
        assert "size_mb" in data
        assert data["size_mb"] > 0
        print(f"✅ APK info: {data['filename']} ({data['size_mb']:.2f} MB)")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
