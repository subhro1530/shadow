from flask import Flask, request, jsonify
from scan import port_scan, dir_enum

app = Flask(__name__)

@app.route('/scan', methods=['POST'])
def scan():
    data = request.get_json()
    domain = data.get('url')

    if not domain:
        return jsonify({"error": "Domain is required"}), 400

    try:
        # Perform port scanning
        open_ports = port_scan(domain)

        # Perform directory enumeration
        valid_directories = dir_enum(domain)

        result = {
            "open_ports": open_ports,
            "valid_directories": valid_directories
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
