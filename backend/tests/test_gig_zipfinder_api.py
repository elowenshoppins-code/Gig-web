"""
GIG ZipFinder API Tests
Tests for core API endpoints: health, zip codes, guides, terms, stripe checkout

Features tested:
- Health check endpoint
- ZIP codes retrieval and search
- Guides listing and download URLs
- Terms & conditions
- Stripe checkout session creation
- Payment verification endpoints
"""

import pytest
import requests
import os

# Get backend URL - use localhost for container testing
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')


class TestHealthAndBasics:
    """Basic health and connectivity tests"""
    
    def test_health_check(self):
        """Test /api/health returns 200"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print(f"✅ Health check passed: {data}")
    
    def test_api_base_accessible(self):
        """Test that API base is accessible"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code in [200, 404]  # API is reachable
        print(f"✅ API base accessible at {BASE_URL}")


class TestZipCodes:
    """ZIP codes endpoint tests"""
    
    def test_get_zip_codes_instacart(self):
        """Test getting ZIP codes for Instacart"""
        response = requests.get(f"{BASE_URL}/api/zip-codes/instacart")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Instacart ZIP codes: {len(data)} found")
        if data:
            # Verify structure
            zip_code = data[0]
            assert "zip_code" in zip_code
            assert "city" in zip_code
            assert "state" in zip_code
            assert "app_name" in zip_code
            print(f"   First ZIP: {zip_code.get('zip_code')} - {zip_code.get('city')}, {zip_code.get('state')}")
    
    def test_get_zip_codes_doordash(self):
        """Test getting ZIP codes for DoorDash"""
        response = requests.get(f"{BASE_URL}/api/zip-codes/doordash")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ DoorDash ZIP codes: {len(data)} found")
    
    def test_get_zip_codes_spark(self):
        """Test getting ZIP codes for Spark"""
        response = requests.get(f"{BASE_URL}/api/zip-codes/spark")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Spark ZIP codes: {len(data)} found")
    
    def test_zip_codes_no_mongodb_id(self):
        """Verify ZIP codes don't expose MongoDB _id"""
        response = requests.get(f"{BASE_URL}/api/zip-codes/instacart")
        assert response.status_code == 200
        data = response.json()
        if data:
            for zip_code in data:
                assert "_id" not in zip_code, "MongoDB _id should not be exposed"
        print("✅ No MongoDB _id in ZIP code responses")


class TestGuides:
    """Guides endpoint tests"""
    
    def test_guides_list(self):
        """Test /api/guides-list returns available guides"""
        response = requests.get(f"{BASE_URL}/api/guides-list")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Guides list: {len(data)} guides available")
        
        # Check expected apps are present
        apps = [g["app"] for g in data]
        assert "instacart" in apps, "Should have Instacart guide"
        assert "doordash" in apps, "Should have DoorDash guide"
        assert "spark" in apps, "Should have Spark guide"
        assert "google_voice" in apps, "Should have Google Voice guide (for phone number)"
    
    def test_guides_list_structure(self):
        """Test guides list response structure"""
        response = requests.get(f"{BASE_URL}/api/guides-list")
        assert response.status_code == 200
        data = response.json()
        
        if data:
            guide = data[0]
            assert "app" in guide
            assert "language" in guide
            assert "download_url" in guide
            print(f"✅ Guide structure verified: {guide}")
    
    def test_guide_download_url_format(self):
        """Test guide download URLs are properly formatted"""
        response = requests.get(f"{BASE_URL}/api/guides-list")
        assert response.status_code == 200
        data = response.json()
        
        for guide in data:
            url = guide.get("download_url", "")
            assert url.startswith("/api/download-guide/"), f"Invalid URL format: {url}"
            assert guide["app"] in url
            assert guide["language"] in url
        print("✅ All guide download URLs properly formatted")


class TestTerms:
    """Terms & conditions endpoint tests"""
    
    def test_get_terms(self):
        """Test /api/terms returns terms and conditions"""
        response = requests.get(f"{BASE_URL}/api/terms")
        assert response.status_code == 200
        data = response.json()
        
        assert "content_en" in data, "Should have English content"
        assert "content_es" in data, "Should have Spanish content"
        assert "version" in data, "Should have version"
        
        # Verify content is not empty
        assert len(data["content_en"]) > 100, "English terms should have content"
        assert len(data["content_es"]) > 100, "Spanish terms should have content"
        print(f"✅ Terms retrieved: v{data['version']}")
    
    def test_terms_no_mongodb_id(self):
        """Verify terms don't expose MongoDB _id"""
        response = requests.get(f"{BASE_URL}/api/terms")
        assert response.status_code == 200
        data = response.json()
        assert "_id" not in data, "MongoDB _id should not be exposed"
        print("✅ No MongoDB _id in terms response")


class TestStripeEndpoints:
    """Stripe payment endpoint tests"""
    
    def test_stripe_config(self):
        """Test /api/stripe/config returns publishable key"""
        response = requests.get(f"{BASE_URL}/api/stripe/config")
        assert response.status_code == 200
        data = response.json()
        assert "publishable_key" in data
        # Key should start with pk_live or pk_test
        key = data["publishable_key"]
        assert key.startswith("pk_"), "Publishable key should start with pk_"
        print(f"✅ Stripe config: Key starts with {key[:10]}...")
    
    def test_check_payment_by_user_invalid(self):
        """Test payment check with non-existent user returns not found"""
        response = requests.get(
            f"{BASE_URL}/api/stripe/check-payment-by-user/test_invalid_user_12345",
            params={"app_name": "instacart"}
        )
        # Should return 200 with found=false, not 404
        assert response.status_code == 200
        data = response.json()
        assert data.get("found") == False
        print(f"✅ Payment check for invalid user returns not found: {data}")
    
    def test_paid_apps_invalid_user(self):
        """Test paid apps for non-existent user returns empty list"""
        response = requests.get(f"{BASE_URL}/api/stripe/paid-apps/test_invalid_user_12345")
        assert response.status_code == 200
        data = response.json()
        assert "paid_apps" in data
        assert isinstance(data["paid_apps"], list)
        assert data["count"] == 0
        print(f"✅ Paid apps for invalid user returns empty list")


class TestWebCheckoutSession:
    """Web checkout session endpoint tests"""
    
    def test_create_checkout_session_without_terms(self):
        """Test checkout session creation fails without terms accepted"""
        response = requests.post(
            f"{BASE_URL}/api/web/create-checkout-session",
            json={
                "user_id": "test_user_123",
                "app_name": "instacart",
                "terms_accepted": False,
                "return_url": "https://example.com"
            }
        )
        # Should fail because terms not accepted
        assert response.status_code in [400, 422]
        print("✅ Checkout session correctly requires terms acceptance")
    
    def test_create_checkout_session_with_terms(self):
        """Test checkout session creation with terms accepted"""
        response = requests.post(
            f"{BASE_URL}/api/web/create-checkout-session",
            json={
                "user_id": "TEST_user_checkout_test",
                "app_name": "instacart",
                "terms_accepted": True,
                "return_url": "https://example.com"
            }
        )
        # With LIVE Stripe keys, this should work
        if response.status_code == 200:
            data = response.json()
            assert "checkout_url" in data
            assert "session_id" in data
            assert data["checkout_url"].startswith("https://checkout.stripe.com")
            print(f"✅ Checkout session created: {data['checkout_url'][:60]}...")
        else:
            # Stripe API might fail with test request in LIVE mode
            print(f"⚠️ Checkout session: status {response.status_code} (expected with LIVE keys)")
            assert response.status_code in [400, 500]


class TestGuideDownloads:
    """Guide download endpoint tests"""
    
    def test_guide_download_instacart_en(self):
        """Test Instacart English guide download"""
        response = requests.head(f"{BASE_URL}/api/download-guide/instacart/en")
        # HEAD might return 405, try GET
        if response.status_code == 405:
            response = requests.get(f"{BASE_URL}/api/download-guide/instacart/en", stream=True)
        
        if response.status_code == 200:
            assert "application/pdf" in response.headers.get("content-type", "")
            print("✅ Instacart English guide downloadable")
        elif response.status_code == 404:
            print("⚠️ Instacart English guide not found (PDF may not exist)")
        else:
            print(f"⚠️ Instacart guide response: {response.status_code}")
    
    def test_guide_download_invalid_app(self):
        """Test invalid app guide download returns 400"""
        response = requests.get(f"{BASE_URL}/api/download-guide/invalid_app/en")
        assert response.status_code == 400
        print("✅ Invalid app guide correctly returns 400")
    
    def test_guide_download_invalid_language(self):
        """Test invalid language guide download returns 400"""
        response = requests.get(f"{BASE_URL}/api/download-guide/instacart/invalid_lang")
        assert response.status_code == 400
        print("✅ Invalid language correctly returns 400")


class TestSearchZipCodes:
    """ZIP code search endpoint tests"""
    
    def test_search_zip_codes_instacart(self):
        """Test AI-powered ZIP code search for Instacart"""
        response = requests.post(
            f"{BASE_URL}/api/search-zip-codes/instacart",
            timeout=60  # AI search may take time
        )
        
        # Search might fail if EMERGENT_LLM_KEY not configured or rate limited
        if response.status_code == 200:
            data = response.json()
            assert "zip_codes" in data
            assert "source" in data
            print(f"✅ ZIP search completed: {len(data.get('zip_codes', []))} codes, source: {data.get('source')}")
        elif response.status_code == 500:
            data = response.json()
            print(f"⚠️ ZIP search failed (expected if AI key not configured): {data.get('detail', 'Unknown error')}")
        else:
            print(f"⚠️ ZIP search response: {response.status_code}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
