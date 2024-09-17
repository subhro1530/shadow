import http.client
import streamlit as st
import json

# Function to get Instagram profile data using RapidAPI
def get_instagram_profile(username):
    conn = http.client.HTTPSConnection("instagram-profile1.p.rapidapi.com")
    
    headers = {
        'x-rapidapi-key': "f33cddcc18mshf14c15ae56c57c3p19bb74jsn0b73d28bfc84",
        'x-rapidapi-host': "instagram-profile1.p.rapidapi.com"
    }
    
    endpoint = f"/getprofile/{username}"
    
    conn.request("GET", endpoint, headers=headers)
    
    res = conn.getresponse()
    data = res.read()
    
    return data.decode("utf-8")

# Streamlit app interface
st.title("Instagram Profile Data Fetcher")

# User input for Instagram username
username = st.text_input("Enter Instagram Username", "subhro1530")

# Fetch data when the button is clicked
if st.button("Get Profile Data"):
    if username:
        with st.spinner("Fetching Instagram data..."):
            try:
                profile_data = get_instagram_profile(username)
                parsed_data = json.loads(profile_data)
                
                # Display the fetched profile data
                st.subheader("Instagram Profile Data:")
                st.json(parsed_data)  # Display JSON data in readable format
            except Exception as e:
                st.error(f"An error occurred: {e}")
    else:
        st.error("Please provide a valid Instagram username.")
