python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python app.py# Armado TV - Tienda de televisores

Proyecto de tienda web para vender TVs con carrito interactivo, registro, login y métodos de pago.

## Estructura del proyecto

- `app.py` - servidor Flask con rutas para inicio, productos, carrito, checkout, registro, login y contacto.
- `templates/` - plantillas Jinja2 para el frontend.
- `static/css/style.css` - estilos principales.
- `static/js/main.js` - carrusel automático y scripts de interfaz.
- `data/users.json` - usuarios registrados.
- `data/orders.json` - pedidos generados.
- `requirements.txt` - dependencias de Python.

## Cómo iniciar el proyecto

1. Abre una terminal en `c:\Users\Nicolas\Desktop\armado tv pagina web`.
2. Crea un entorno virtual (opcional pero recomendado):
   - `python -m venv venv`
3. Activa el entorno virtual:
   - Windows: `venv\Scripts\activate`
4. Instala Flask:
   - `pip install -r requirements.txt`
5. Ejecuta la aplicación:
   - `python app.py`
6. Abre el navegador en `http://127.0.0.1:5000`

## Características incluidas

- Catálogo dividido en 3 secciones: `Gama Alta`, `Gama Media` y `Gama Baja`.
- Carrito de compra con controles para sumar, restar y eliminar productos.
- Checkout con campos de nombre, apellido, email, teléfono, dirección y método de pago.
- Registro e inicio de sesión con almacenamiento local de usuario.
- Formulario de contacto y enlace directo a WhatsApp en `3644369163`.
- Diseño responsivo y moderno con CSS personalizado.

## Notas

- Para entorno de producción, cambia `app.secret_key` por una clave segura.
- Este proyecto usa almacenamiento local en JSON para facilitar la demostración.
- En producción se recomienda usar base de datos real y HTTPS.
