from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Sample endpoint for scanning social media profile
@app.route('/scan', methods=['POST'])
def scan_profile():
    data = request.json
    profile_url = data.get("url")
    platform = data.get("platform")  # Get platform

    # Perform web scraping based on the platform selected
    try:
        if platform == "facebook":
            profile_data = scrape_facebook(profile_url)
        elif platform == "instagram":
            profile_data = scrape_instagram(profile_url)
        elif platform == "twitter":
            profile_data = scrape_twitter(profile_url)
        elif platform == "linkedin":
            profile_data = scrape_linkedin(profile_url)
        else:
            raise ValueError("Invalid platform")

        return jsonify({"success": True, "profile_data": profile_data})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Function to scrape Facebook profile
def scrape_facebook(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Example parsing for Facebook (adjust based on actual HTML structure)
    profile_data = {
        "name": soup.find('h1').text,
        "bio": soup.find('p', class_='bio').text,
    }
    return profile_data

# Function to scrape Instagram profile
def scrape_instagram(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Example parsing for Instagram (adjust based on actual HTML structure)
    profile_data = {
        "name": soup.find('h1').text,
        "bio": soup.find('p', class_='bio').text,
    }
    return profile_data

# Function to scrape Twitter profile
def scrape_twitter(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Example parsing for Twitter (adjust based on actual HTML structure)
    profile_data = {
        "name": soup.find('h1').text,
        "bio": soup.find('p', class_='bio').text,
    }
    return profile_data

# Function to scrape LinkedIn profile
def scrape_linkedin(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Example parsing for LinkedIn (adjust based on actual HTML structure)
    profile_data = {
        "name": soup.find('h1').text,
        "bio": soup.find('p', class_='bio').text,
    }
    return profile_data

if __name__ == '__main__':
    app.run(debug=True)
