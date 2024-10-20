from flask import Flask, request, jsonify
import socket

app = Flask(__name__)

def port_scan(domain):
    # Your port scanning logic (returns list of open ports)
    return [80, 443]  # Example: replace with actual scan results

def dir_enum(domain):
    try:
        # Read directories from wordlist
        with open("public/wordlist.txt", "r") as file:
            directories = [line.strip() for line in file.readlines()]

        valid_directories = []
        for dir in directories:
            # Logic to check if the directory exists (simplified)
            response = requests.get(f"http://{domain}/{dir}")
            if response.status_code == 200:
                valid_directories.append(dir)

        return valid_directories
    except Exception as e:
        raise Exception(f"Error during directory enumeration: {str(e)}")

@app.route('/scan', methods=['POST'])
def scan():
    data = request.get_json()
    domain = data.get('url')

    if not domain:
        return jsonify({"error": "Domain is required"}), 400

    try:
        ip_address = socket.gethostbyname(domain)
        open_ports = port_scan(domain)
        valid_directories = dir_enum(domain)

        result = {
            "domain": domain,
            "ip_address": ip_address,
            "open_ports": open_ports,
            "valid_directories": valid_directories
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
