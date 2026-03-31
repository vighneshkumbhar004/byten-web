import requests
import sys
import json
from datetime import datetime

class BytenLandingAPITester:
    def __init__(self, base_url="https://yellow-cta-pro.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_health_check(self):
        """Test health check endpoint"""
        try:
            response = requests.get(f"{self.api_url}/health", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Response: {data}"
            self.log_test("Health Check", success, details)
            return success
        except Exception as e:
            self.log_test("Health Check", False, str(e))
            return False

    def test_root_endpoint(self):
        """Test root API endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Message: {data.get('message', 'N/A')}"
            self.log_test("Root Endpoint", success, details)
            return success
        except Exception as e:
            self.log_test("Root Endpoint", False, str(e))
            return False

    def test_demo_request(self):
        """Test demo request endpoint"""
        test_data = {
            "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
            "source": "navbar"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/demo/request",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Demo ID: {data.get('id', 'N/A')}"
            else:
                details += f", Error: {response.text}"
            self.log_test("Demo Request", success, details)
            return success, response.json() if success else {}
        except Exception as e:
            self.log_test("Demo Request", False, str(e))
            return False, {}

    def test_demo_request_hero_source(self):
        """Test demo request with hero source"""
        test_data = {
            "email": f"hero_test_{datetime.now().strftime('%H%M%S')}@example.com",
            "source": "hero"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/demo/request",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Demo ID: {data.get('id', 'N/A')}, Source: {data.get('source', 'N/A')}"
            else:
                details += f", Error: {response.text}"
            self.log_test("Demo Request (Hero Source)", success, details)
            return success
        except Exception as e:
            self.log_test("Demo Request (Hero Source)", False, str(e))
            return False

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": f"contact_test_{datetime.now().strftime('%H%M%S')}@example.com",
            "company": "Test Company Inc.",
            "phone": "+1-555-0123",
            "message": "This is a test message for contact form submission.",
            "submission_type": "contact"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact/submit",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Contact ID: {data.get('id', 'N/A')}"
            else:
                details += f", Error: {response.text}"
            self.log_test("Contact Form Submission", success, details)
            return success, response.json() if success else {}
        except Exception as e:
            self.log_test("Contact Form Submission", False, str(e))
            return False, {}

    def test_get_stats(self):
        """Test stats endpoint"""
        try:
            response = requests.get(f"{self.api_url}/stats", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Stats: {data}"
            else:
                details += f", Error: {response.text}"
            self.log_test("Get Stats", success, details)
            return success
        except Exception as e:
            self.log_test("Get Stats", False, str(e))
            return False

    def test_get_demo_requests(self):
        """Test get all demo requests endpoint"""
        try:
            response = requests.get(f"{self.api_url}/demo/requests", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Count: {len(data)} requests"
            else:
                details += f", Error: {response.text}"
            self.log_test("Get Demo Requests", success, details)
            return success
        except Exception as e:
            self.log_test("Get Demo Requests", False, str(e))
            return False

    def test_get_contact_submissions(self):
        """Test get all contact submissions endpoint"""
        try:
            response = requests.get(f"{self.api_url}/contact/submissions", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Count: {len(data)} submissions"
            else:
                details += f", Error: {response.text}"
            self.log_test("Get Contact Submissions", success, details)
            return success
        except Exception as e:
            self.log_test("Get Contact Submissions", False, str(e))
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Byten Geomapping API Tests...")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)

        # Basic connectivity tests
        self.test_health_check()
        self.test_root_endpoint()
        
        # Core functionality tests
        self.test_demo_request()
        self.test_demo_request_hero_source()
        self.test_contact_form_submission()
        
        # Admin/stats endpoints
        self.test_get_stats()
        self.test_get_demo_requests()
        self.test_get_contact_submissions()

        # Print summary
        print("=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return 1

def main():
    tester = BytenLandingAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())