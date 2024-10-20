import socket

@app.route('/scan', methods=['POST'])
def scan():
    data = request.get_json()
    domain = data.get('url')

    if not domain:
        return jsonify({"error": "Domain is required"}), 400

    try:
        # Get IP address of the domain
        ip_address = socket.gethostbyname(domain)

        # Perform port scanning
        open_ports = port_scan(domain)

        # Perform directory enumeration using the wordlist
        with open('/wordlist.txt', 'r') as f:
            wordlist = f.read().splitlines()

        valid_directories = dir_enum(domain, wordlist)

        result = {
            "domain": domain,
            "ip_address": ip_address,
            "open_ports": open_ports,
            "valid_directories": valid_directories
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
