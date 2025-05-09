import subprocess
import sys
import os
import time

def install_package(package_name):
    print(f"Installing {package_name}...")
    try:
        subprocess.check_call([
            sys.executable, 
            '-m', 
            'pip', 
            'install', 
            '--upgrade',
            package_name
        ])
        time.sleep(1)  # Add small delay between installations
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error installing {package_name}: {e}")
        return False

def setup_environment():
    print("Setting up the environment...")
    
    # Create necessary directories
    directories = ['model/weights', 'data']
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
    
    # Upgrade pip first
    print("Upgrading pip...")
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '--upgrade', 'pip'])
    
    # List of packages to install
    packages = [
        'flask',
        'numpy',
        'pandas',
        'scikit-learn',
        'torch',
        'transformers',
        'tqdm',
        'requests'
    ]
    
    # Install packages one by one
    failed_packages = []
    for package in packages:
        if not install_package(package):
            failed_packages.append(package)
    
    if failed_packages:
        print("\nFailed to install the following packages:")
        for package in failed_packages:
            print(f"- {package}")
        return False
    
    print("\nSetup completed successfully!")
    return True

if __name__ == '__main__':
    setup_environment() 