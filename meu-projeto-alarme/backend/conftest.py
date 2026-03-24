# backend/conftest.py
import sys
import pathlib

# Allow `import backend.app.xxx` from project root
sys.path.insert(0, str(pathlib.Path(__file__).parent.parent))
