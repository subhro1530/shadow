import http.client
import streamlit as st
import json

# Function to get LinkedIn profile data using RapidAPI
def get_linkedin_profile(linkedin_url):
    conn = http.client.HTTPSConnection("linkedin-data-api.p.rapidapi.com")
    
    headers = {
        'x-rapidapi-key': "f33cddcc18mshf14c15ae56c57c3p19bb74jsn0b73d28bfc84",
        'x-rapidapi-host': "linkedin-data-api.p.rapidapi.com"
    }
    
    encoded_url = linkedin_url.replace("/", "%2F").replace(":", "%3A")  # Encode URL
    endpoint = f"/get-profile-data-by-url?url={encoded_url}"
    
    conn.request("GET", endpoint, headers=headers)
    
    res = conn.getresponse()
    data = res.read()
    return data.decode("utf-8")

# Streamlit app interface
st.title("LinkedIn Profile Data Fetcher")

# User input for LinkedIn URL
linkedin_url = st.text_input("Enter LinkedIn Profile URL", 
                             "https://www.linkedin.com/in/shaswata-saha-74b209251/")

# Fetch data when the button is clicked
if st.button("Get Profile Data"):
    if linkedin_url:
        with st.spinner("Fetching LinkedIn data..."):
            try:
                profile_data = get_linkedin_profile(linkedin_url)
                parsed_data = json.loads(profile_data)
                
                # Display the fetched profile data
                st.subheader("Profile Data:")
                st.json(parsed_data)  # Display JSON data in readable format
            except Exception as e:
                st.error(f"An error occurred: {e}")
    else:
        st.error("Please provide a valid LinkedIn profile URL.")
