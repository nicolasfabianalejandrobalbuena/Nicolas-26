from flask import Flask, jsonify, render_template
app = Flask(__name__)
# Ruta que devuelve HTML
@app.route('/')
def home():
    return render_template('index.html')
# Ruta que devuelve JSON (Formato de datos para APIs)
@app.route('/api/hola')
def hola_json():
    return jsonify({
"status": "success",
"mensaje": "¡Hola Mundo desde el Backend!",
"clase": "Diseño Web II"
})
if __name__ == '__main__':

app.run(debug=True)
