# test_settings.py
import os
import tempfile
from app.core.config import Settings


def test_settings():
    # Test with different CORS_ORIGINS formats

    # Test 1: Comma-separated string
    env_content = """
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000
SECRET_KEY=test-secret-key-123456789012345678901234567890
POSTGRES_SERVER=localhost
POSTGRES_USER=test
POSTGRES_PASSWORD=test
POSTGRES_DB=test
POSTGRES_PORT=5432
"""

    # Create temporary .env file
    with tempfile.NamedTemporaryFile(mode="w", suffix=".env", delete=False) as f:
        f.write(env_content)
        env_file = f.name

    try:
        # Test settings loading
        settings = Settings(_env_file=env_file)
        print("✅ Settings loaded successfully!")
        print(f"CORS_ORIGINS: {settings.CORS_ORIGINS}")
        print(f"Type: {type(settings.CORS_ORIGINS)}")

    except Exception as e:
        print(f"❌ Error loading settings: {e}")
    finally:
        # Clean up
        os.unlink(env_file)


if __name__ == "__main__":
    test_settings()
