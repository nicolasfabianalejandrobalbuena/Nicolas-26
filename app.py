from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os

app = Flask(__name__)
app.secret_key = "cambia_esta_clave_a_una_segura_1234"

DATA_FOLDER = os.path.join(app.root_path, "data")
USERS_FILE = os.path.join(DATA_FOLDER, "users.json")
ORDERS_FILE = os.path.join(DATA_FOLDER, "orders.json")

if not os.path.exists(DATA_FOLDER):
    os.makedirs(DATA_FOLDER)

for path, default in [(USERS_FILE, []), (ORDERS_FILE, [])]:
    if not os.path.exists(path):
        with open(path, "w", encoding="utf-8") as f:
            json.dump(default, f, indent=2, ensure_ascii=False)

PRODUCTS = [
    {
        "id": 1,
        "nombre": "Samsung Crystal UHD CU7095",
        "precio": 129999,
        "categoria": "Gama Alta",
        "descripcion": "Televisor UHD con cristal claro, colores intensos y diseño moderno.",
        "disponible": True,
        "imagen": "/static/img/samsung-crystal-uhd-cu7095.jfif"
    },
    {
        "id": 2,
        "nombre": "Samsung QD-OLED S95F",
        "precio": 219999,
        "categoria": "Gama Alta",
        "descripcion": "OLED QD con brillo superior y contraste perfecto para cine y juegos.",
        "disponible": True,
        "imagen": "/static/img/samsung-qd-oled-s95f.jfif"
    },
    {
        "id": 3,
        "nombre": "Sony Bravia 9",
        "precio": 199999,
        "categoria": "Gama Alta",
        "descripcion": "Smart TV premium con imagen nítida y sonido envolvente integrado.",
        "disponible": True,
        "imagen": "/static/img/sony-bravia-9.jfif"
    },
    {
        "id": 4,
        "nombre": "TCL Q7C",
        "precio": 89999,
        "categoria": "Gama Media",
        "descripcion": "TV QLED con buen brillo, menú inteligente y control sencillo.",
        "disponible": True,
        "imagen": "/static/img/tcl-q7c.jfif"
    },
    {
        "id": 5,
        "nombre": "Xiaomi TV A Pro QLED",
        "precio": 84999,
        "categoria": "Gama Media",
        "descripcion": "QLED con funciones Smart, buena conectividad y estilo moderno.",
        "disponible": True,
        "imagen": "/static/img/xiaomi-a-pro-qled.jfif"
    },
    {
        "id": 6,
        "nombre": "Xiaomi TV A Pro QLED 55''",
        "precio": 77999,
        "categoria": "Gama Media",
        "descripcion": "Diseño fino y calidad de imagen clara para entretenimiento diario.",
        "disponible": True,
        "imagen": "/static/img/xiaomi-a-pro-qled-2.jfif"
    },
    {
        "id": 7,
        "nombre": "Hisense U7NQ",
        "precio": 69999,
        "categoria": "Gama Baja",
        "descripcion": "Buena opción económica con resolución nítida y funciones Smart.",
        "disponible": True,
        "imagen": "/static/img/hisense-u7nq.jfif"
    },
    {
        "id": 8,
        "nombre": "LG OLED C5",
        "precio": 159999,
        "categoria": "Gama Alta",
        "descripcion": "OLED compacta con negros profundos y excelente contraste.",
        "disponible": True,
        "imagen": "/static/img/lg-oled-c5.jfif"
    },
    {
        "id": 9,
        "nombre": "LG OLED evo G6 Series",
        "precio": 179999,
        "categoria": "Gama Alta",
        "descripcion": "OLED evo con rendimiento avanzado y experiencia premium de visualización.",
        "disponible": True,
        "imagen": "/static/img/lg-oled-evo-g6-series.jfif"
    }
]


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_cart():
    return session.get("cart", {})


def save_cart(cart):
    session["cart"] = cart
    session.modified = True


def find_product(product_id):
    return next((p for p in PRODUCTS if p["id"] == product_id), None)


def authenticated_user():
    email = session.get("user_email")
    if not email:
        return None
    users = load_json(USERS_FILE)
    return next((user for user in users if user["email"] == email), None)


@app.route("/")
def home():
    return render_template("index.html", titulo="Inicio", productos=PRODUCTS, usuario=authenticated_user())


@app.route("/servicios")
def servicios():
    return render_template("servicios.html", titulo="Servicios", productos=PRODUCTS, usuario=authenticated_user())


@app.route("/productos")
def productos():
    return render_template("productos.html", titulo="Televisores", productos=PRODUCTS, usuario=authenticated_user())


@app.route("/carrito")
def carrito():
    cart = get_cart()
    items = []
    total = 0
    for product_id, cantidad in cart.items():
        product = find_product(int(product_id))
        if product:
            subtotal = product["precio"] * cantidad
            items.append({"producto": product, "cantidad": cantidad, "subtotal": subtotal})
            total += subtotal
    return render_template("carrito.html", titulo="Mi Carrito", items=items, total=total, usuario=authenticated_user())


@app.route("/agregar/<int:product_id>")
def agregar(product_id):
    product = find_product(product_id)
    if product is None:
        return redirect(url_for("productos"))
    cart = get_cart()
    cart[str(product_id)] = cart.get(str(product_id), 0) + 1
    save_cart(cart)
    return redirect(url_for("carrito"))


@app.route("/actualizar-carrito", methods=["POST"])
def actualizar_carrito():
    cart = get_cart()
    action = request.form.get("action")
    product_id = request.form.get("product_id")
    quantity = request.form.get("quantity")

    if product_id and product_id in cart:
        if action == "remove":
            cart.pop(product_id, None)
        elif action in ["increment", "decrement"]:
            current = cart.get(product_id, 0)
            if action == "increment":
                cart[product_id] = current + 1
            else:
                if current > 1:
                    cart[product_id] = current - 1
                else:
                    cart.pop(product_id, None)
        elif quantity is not None:
            try:
                qty = int(quantity)
                if qty > 0:
                    cart[product_id] = qty
                else:
                    cart.pop(product_id, None)
            except ValueError:
                pass

    save_cart(cart)
    return redirect(url_for("carrito"))


@app.route("/checkout", methods=["GET", "POST"])
def checkout():
    cart = get_cart()
    if not cart:
        return redirect(url_for("carrito"))

    items = []
    total = 0
    for product_id, cantidad in cart.items():
        product = find_product(int(product_id))
        if product:
            subtotal = product["precio"] * cantidad
            items.append({"producto": product, "cantidad": cantidad, "subtotal": subtotal})
            total += subtotal

    mensaje_error = None
    mensaje_exito = None

    if request.method == "POST":
        nombre = request.form.get("nombre")
        apellido = request.form.get("apellido")
        email = request.form.get("email")
        telefono = request.form.get("telefono")
        direccion = request.form.get("direccion")
        metodo_pago = request.form.get("metodo_pago")
        comentarios = request.form.get("comentarios")

        if not nombre or not apellido or not email or not telefono or not direccion:
            mensaje_error = "Completa todos los datos de envío antes de finalizar la compra."
        elif "@" not in email or "." not in email:
            mensaje_error = "El correo electrónico no tiene un formato válido."
        elif not telefono.isdigit() or len(telefono) < 7:
            mensaje_error = "Ingresa un teléfono válido con solo números."
        else:
            order = {
                "nombre": nombre,
                "apellido": apellido,
                "email": email,
                "telefono": telefono,
                "direccion": direccion,
                "metodo_pago": metodo_pago,
                "comentarios": comentarios,
                "total": total,
                "items": [{"nombre": item["producto"]["nombre"], "cantidad": item["cantidad"], "subtotal": item["subtotal"]} for item in items]
            }
            orders = load_json(ORDERS_FILE)
            orders.append(order)
            save_json(ORDERS_FILE, orders)
            session.pop("cart", None)
            mensaje_exito = "¡Pedido recibido! Revisa tu WhatsApp para confirmar la compra."

    return render_template(
        "checkout.html",
        titulo="Finalizar Compra",
        items=items,
        total=total,
        usuario=authenticated_user(),
        error=mensaje_error,
        exito=mensaje_exito,
    )


@app.route("/registro", methods=["GET", "POST"])
def registro():
    error = None
    success = None
    if request.method == "POST":
        nombre = request.form.get("nombre")
        apellido = request.form.get("apellido")
        email = request.form.get("email")
        direccion = request.form.get("direccion")
        password = request.form.get("password")

        if not nombre or not apellido or not email or not direccion or not password:
            error = "Completa todos los campos para registrarte."
        elif "@" not in email or "." not in email:
            error = "El correo electrónico no tiene un formato válido."
        else:
            users = load_json(USERS_FILE)
            if any(user["email"] == email for user in users):
                error = "Ya existe un usuario con ese correo. Usa otro o inicia sesión."
            else:
                users.append({
                    "nombre": nombre,
                    "apellido": apellido,
                    "email": email,
                    "direccion": direccion,
                    "password_hash": generate_password_hash(password)
                })
                save_json(USERS_FILE, users)
                success = "Registro completo. Ya puedes iniciar sesión."

    return render_template("registro.html", titulo="Registro", error=error, success=success, usuario=authenticated_user())


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        users = load_json(USERS_FILE)
        user = next((u for u in users if u["email"] == email), None)
        if user is None or not check_password_hash(user["password_hash"], password):
            error = "Correo o contraseña incorrecta."
        else:
            session["user_email"] = email
            return redirect(url_for("perfil"))

    return render_template("login.html", titulo="Iniciar Sesión", error=error, usuario=authenticated_user())


@app.route("/logout")
def logout():
    session.pop("user_email", None)
    return redirect(url_for("home"))


@app.route("/perfil")
def perfil():
    user = authenticated_user()
    if not user:
        return redirect(url_for("login"))
    return render_template("perfil.html", titulo="Mi Cuenta", usuario=user)


@app.route("/contacto", methods=["GET", "POST"])
def contacto():
    error = None
    success = None
    if request.method == "POST":
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        telefono = request.form.get("telefono")
        mensaje = request.form.get("mensaje")
        if not nombre or not email or not telefono:
            error = "Nombre, correo y teléfono son obligatorios."
        elif "@" not in email or "." not in email:
            error = "El correo no es válido."
        elif not telefono.isdigit() or len(telefono) < 7:
            error = "Ingresa un teléfono válido."
        else:
            success = f"Gracias {nombre}, tu mensaje fue recibido. Te responderemos pronto."
    return render_template("contacto.html", titulo="Contacto", error=error, success=success, usuario=authenticated_user())


if __name__ == "__main__":
    app.run(debug=True)
