# SAN AGUSTÍN

![San Agustín Logo](img/logo.svg)

## Especificación técnica para `San Agustín` — Ecommerce de alto rendimiento

### 1. Arquitectura de Información

Mapa del sitio y jerarquía de páginas:

- Home
  - Hero / Promociones
  - Búsqueda rápida
  - Categorías destacadas
  - Productos recomendados
  - Ventajas del envío y pago
- Categorías
  - Listado de categorías principales
  - Filtros por precio, marca, estado, stock
- Detalle de producto
  - Imágenes del producto
  - Descripción y atributos
  - Precio y stock
  - Acciones: añadir al carrito, comprar ahora, recomendaciones
- Carrito
  - Resumen de productos seleccionados
  - Cantidad y subtotal
  - Sugerencias cruzadas
- Checkout
  - Datos del cliente
  - Dirección de envío
  - Método de pago
  - Revisión final y confirmación
- Búsqueda interna
  - Resultados instantáneos
  - Corrección de términos y sugerencias de productos
- Sobre nosotros / Contacto
  - Misión, soporte y políticas

### 2. User Journey

Ruta 1: Navegación desde Home hacia compra directa

1. Usuario abre Home desde navegador tradicional.
2. Encuentra categoría y producto destacado.
3. Navega a `Detalle de producto`.
4. Añade al carrito.
5. Finaliza en `Checkout`.

Ruta 2: Búsqueda rápida y conversión en producto específico

1. Usuario usa el buscador interno.
2. Visualiza resultados ordenados por relevancia.
3. Selecciona producto con disponibilidad inmediata.
4. Revisa detalles, añade cantidad.
5. Completa el pago.

Ruta 3: Renovación de inventario + oferta personalizada

1. Backend Python actualiza stock y contenido.
2. UI muestra badge de stock renovado.
3. Usuario recibe recomendaciones basadas en historial.
4. Toca el producto recomendado.
5. Compra con `Buy Now`.

### 3. Arquitectura de Datos

Entidades clave:

- `Category`
  - id
  - slug
  - nombre
  - descripción
  - icono
- `Product`
  - id
  - nombre
  - slug
  - categoría_id
  - descripción
  - precio
  - oferta
  - stock
  - sku
  - imágenes
  - atributos
  - rating
  - tags
- `InventoryRecord`
  - product_id
  - cantidad
  - actualizado_en
  - proveedor
- `Order`
  - id
  - items
  - total
  - estado
  - cliente
  - direccion
  - pago
  - creado_en
- `Customer`
  - id
  - nombre
  - email
  - telefono
  - direccion
- `Recommendation`
  - product_id
  - score
  - motivo

Modelo relacional simplificado:

- Category 1:N Product
- Product 1:1 InventoryRecord
- Customer 1:N Order
- Order 1:N Product (a través de items)

### 4. Superficie de API y Automatización

Endpoints públicos / JSON:

- `GET /api/categories`
- `GET /api/products`
- `GET /api/product?id=`
- `GET /api/search?q=`
- `GET /api/recommendations?product_id=`
- `POST /api/cart` (simulación de carrito local)
- `POST /api/orders`
- `POST /api/stock-sync` (automatización interna)

Autenticación básica:

- Cabecera `X-Api-Key: <API_KEY>` para endpoints de modificación.
- Tokens temporales para `POST /api/orders` y `POST /api/stock-sync`.
- Validación simple con `python/api/auth.py`.

Automatización real con Python:

- `python/automation/stock_sync.py`
  - lee `python/data/products.json`
  - simula actualización de inventario desde proveedor externo
  - actualiza timestamps y stock real
- `python/automation/content_sync.py`
  - genera títulos, descripciones y valores de tags
  - prepara datos que luego consume el frontend
- `python/api/server.py`
  - sirve la superficie REST sin frameworks complejos
  - retorna JSON para catálogo, búsquedas y recomendaciones

### 5. Integración de IA

Propuesta técnica de IA real:

- Recomendaciones de productos:
  - `GET /api/recommendations?product_id=` devuelve productos relacionados.
  - Python usa modelo simple de similitud sobre tags, categorías y stock.
  - Integración opcional con API externa si se desea, usando `python/automation/content_sync.py`.
- Atención al cliente asistida:
  - Widget JS incorpora conversación básica y FAQ.
  - Expone endpoint `POST /api/assistant` para consultas de decisión.
  - Python puede orquestar prompt templates y API de IA externa.

### 6. Inventario de Componentes UI

El proyecto incluye un inventario detallado de componentes HTML/CSS en `templates/ui-components.html`.

- Topbar fijo
- Barra de navegación principal
- Botón de menú móvil
- Campo de búsqueda global
- Tarjeta de categoría
- Tarjeta de producto
- Badge de precio
- Badge de descuento
- Indicador de stock
- Breadcrumbs
- Carrusel de imágenes
- Galería de producto
- Selector de cantidad
- Botón de añadir al carrito
- Panel flotante de carrito
- Resumen de carrito
- Formulario checkout
- Input de dirección
- Radio de método de pago
- Botón de envío seguro
- Lista de recomendaciones
- Tarjeta de reseña
- Aviso de envío gratis
- Sección de ventajas
- Footer con enlaces
- Footer de redes sociales
- Notificación tipo toast
- Componente loading spinner
- Banner de promoción
- Sección FAQ
- Caja de alerta de disponibilidad

### 7. Planos de Páginas (Blueprints)

- Home
  - Header + buscador + hero
  - carrusel de categorías
  - secciones de productos por oferta
  - footer con accesos rápidos.
- Categoría
  - filtro lateral + listado de productos
  - vista en cuadrícula adaptable.
- Detalle de producto
  - imagen principal + galería
  - información de precio, stock, atributos
  - CTA `Añadir al carrito`.
- Carrito
  - lista de items + totales
  - recomendados debajo
  - CTA `Continuar a pago`.
- Checkout
  - formulario de envío + pago
  - resumen de orden + confirmación.

### 8. Stack tecnológico y despliegue

Tecnologías permitidas:

- Frontend: HTML5, CSS3, JavaScript puro
- Backend / automatización: Python
- Hosting recomendado: Google Cloud Storage + Firebase Hosting o Cloud Run
- Almacenamiento de datos: archivos JSON para prototipo / Google Firestore para producción
- CDN: Cloudflare o Firebase Hosting integrado

Despliegue optimizado para Google:

- `firebase deploy` para frontend estático
- `gcloud run deploy` para servicio Python si se usa backend dinámico
- Build simple con `python -m http.server` para pruebas locales

Compatibilidad:

- Navegadores: Chrome, Edge, Firefox, Safari
- Mobile-first y desktop-first
- PRPL / lazy-loading de imágenes

### 9. Benchmarks de rendimiento

Objetivos de carga:

- First Contentful Paint < 1.2 s
- Largest Contentful Paint < 2.5 s
- Time to Interactive < 3.0 s
- Total Blocking Time < 150 ms
- Cumulative Layout Shift < 0.1

Estrategias:

- CSS crítico en línea para la primera pintura
- JavaScript diferido
- Imágenes optimizadas y `loading="lazy"`
- Minificación de recursos

### 10. Framework de SEO

Convenciones de URL:

- `/` — Home
- `/categoria/<slug>` — Categoría
- `/producto/<slug>` — Detalle de producto
- `/carrito` — Carrito
- `/checkout` — Pago
- `/buscar?q=termino` — Resultados de búsqueda

Metaestructura SEO:

- `title` claro y único por página
- `meta description` con palabras clave naturales
- `link rel="canonical"`
- Open Graph y JSON-LD

Schema markup para ecommerce:

- `Product` con `name`, `description`, `sku`, `offers`, `availability`, `priceCurrency`, `price`
- `BreadcrumbList` en categoría y detalle
- `ItemList` para listados de productos
- `AggregateRating` opcional para reviews

---

## Estructura de Carpetas

- `templates/` — páginas HTML base y componentes UI
- `styles/style.css` — hoja de estilos principal
- `scripts/app.js` — funcionalidad y consumo de API
- `python/api/` — servidor REST y lógica de modelos
- `python/automation/` — scripts de sincronización de stock y contenido
- `python/data/` — esquemas y datos semilla
- `img/` — logo y activos gráficos

## Implementación directa en Figma

- Utilizar las secciones descritas como frames.
- Cada componente listado se traduce a una variante de UI.
- Usar la estructura de página para definir layout y responsive.
- Mantener colores, tipografía y botones consistentes para aceleración de diseño.

## Vista local

- Abre `index.html` directamente desde la raíz si solo quieres revisar HTML/CSS.
- Para un modo más confiable con datos dinámicos y API, ejecuta `run-local-server.bat` y visita `http://127.0.0.1:8080`.
- El sitio carga datos embebidos desde `scripts/data.js` para no depender de APIs cuando se abre localmente.
