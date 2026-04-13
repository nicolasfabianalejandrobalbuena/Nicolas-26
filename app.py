from flask import Flask, jsonify, render_template
import os

template_path = os.path.join(os.path.dirname(__file__), 'templates')
app = Flask(__name__, template_folder=template_path)


@app.route('/', methods=['GET'])
def home():
    try:
        return render_template('index.html')
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/hola', methods=['GET'])
def hola_json():
    return jsonify({
        "status": "success",
        "mensaje": "¡Hola Mundo desde el Backend!",
        "clase": "Diseño Web II"
    }), 200


@app.route('/mi-perfil', methods=['GET'])
def mi_perfil():
    return jsonify({
        "nombre": "Nicolás",
        "edad": 20,
        "redes_sociales": ["Instagram", "Twitter", "TikTok"]
    }), 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Ruta no encontrada"}), 404


@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Error del servidor"}), 500


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000, threaded=True)
