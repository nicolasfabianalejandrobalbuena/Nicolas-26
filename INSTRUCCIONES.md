# 📋 INSTRUCCIONES DE USO - Abogados SP

## 🎯 Bienvenida

¡Hola! Esta es tu página web profesional para servicios legales en Presidencia Roque Sáenz Peña, Chaco. Aquí encontrarás todo lo que necesitas para comenzar.

---

## 📁 Estructura de Carpetas Creada

```
abogados sp pagina web/
├── index.html              (Página principal - NO TOQUES)
├── css/
│   └── style.css          (Estilos de la página)
├── js/
│   └── script.js          (Funcionalidad interactiva)
├── img/                   (Carpeta para imágenes)
│   ├── lawyer1.jpg        (Foto de abogado 1)
│   ├── lawyer2.jpg        (Foto de abogado 2)
│   └── lawyer3.jpg        (Foto de abogado 3)
├── db/                    (Carpeta de base de datos)
│   ├── database.sql       (Estructura de BD)
│   ├── conexion_config.php (Configuración de conexión)
│   └── README.md          (Guía de BD)
└── INSTRUCCIONES.md       (Este archivo)
```

---

## 🚀 PASO 1: Agregar Imágenes

### ¿Qué imágenes necesitas?

1. **Fotos de abogados** (6 imágenes profesionales):
   - Guarda en: `img/lawyer1.jpg` - Dr. Carlos Rodríguez
   - Guarda en: `img/lawyer2.jpg` - Dra. María López
   - Guarda en: `img/lawyer3.jpg` - Dr. Juan Pérez
   - Guarda en: `img/lawyer4.jpg` - Dra. Claudia Fernández
   - Guarda en: `img/lawyer5.jpg` - Dr. Andrés Gómez
   - Guarda en: `img/lawyer6.jpg` - Lic. Valentina Torres
   - Tamaño recomendado: 300x300 píxeles (cuadrado)
   - Formato: JPG o PNG

### ¿Cómo agregar las imágenes?

1. Busca fotos profesionales de abogados o personas
2. Cópialas a la carpeta `img`
3. Asegúrate que se llamen exactamente como se menciona arriba

**Alternativa:** Si no tienes fotos, busca en:
- Unsplash.com (fotos gratuitas)
- Pexels.com (más fotos gratuitas)
- Descendload imágenes de "abogados profesionales"

---

## 🔧 PASO 2: Configurar el Formulario (IMPORTANTE)

Sin este paso, los clientes no podrán contactarte.

### Opción A: Usar Formspree (RECOMENDADO - Gratis)

**¿Qué es Formspree?** Una herramienta que envía los datos del formulario directo a tu email.

**Pasos:**

1. Ve a: https://formspree.io/
2. Haz clic en "Sign Up" (Registrarse)
3. Usa tu correo: `contacto@abogadosp.com`
4. Crea una contraseña
5. Submete tu email para verificación
6. En el panel, crea un nuevo proyecto: "Abogados SP"
7. Obtendrás un ID de formulario (ej: `xyzabc123`)
8. **IMPORTANTE**: Copias este ID y lo pegas en `index.html`

### Dónde pegar el ID en index.html:

Busca esta línea en `index.html`:

```html
<form id="contactForm" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Reemplaza `YOUR_FORM_ID` con tu ID real. Ejemplo:

```html
<form id="contactForm" class="contact-form" action="https://formspree.io/f/xyzabc123" method="POST">
```

**¡Listo!** Cuando un cliente envíe el formulario, recibirás un email con sus datos.

### Opción B: Enviar a WhatsApp

Si prefieres recibir consultas por WhatsApp, los datos se envían directamente a:
**+54 3644-369163**

(El formulario tiene integración con WhatsApp)

---

## 📞 PASO 3: Personalizar Datos de Contacto

### Busca y reemplaza en `index.html`:

```html
3644369163  → Reemplaza con tu número de WhatsApp/Teléfono
```

Busca todas las menciones de este número:
- En sección de contacto
- En tarjetas de abogados
- En pie de página
- En botones de WhatsApp

### Busca y reemplaza correos:

```
contacto@abogadosp.com → Tu correo real
```

---

## 👨‍⚖️ PASO 4: Personalizar Información de Abogados

En `index.html`, busca la sección `<!-- Sección de Abogados -->` y modifica:

```html
<h3>Dr. Carlos Rodríguez</h3>
<p class="specialty">Especialista en Derecho Civil</p>
<p class="experience">+15 años de experiencia</p>
```

**Reemplaza:**
- Nombres y apellidos de abogados reales
- Especialidades/áreas de práctica
- Años de experiencia
- Fotos correctas

---

## 🎨 PASO 5: Personalizar Colores (Opcional)

Si quieres cambiar colores, abre `css/style.css` y busca:

```css
:root {
    --color-primary: #1a3a52;      /* Azul oscuro */
    --color-accent: #d4af37;       /* Dorado */
    ...
}
```

**Colores populares para abogados:**
- Azul oscuro: `#1a3a52`
- Dorado: `#d4af37`
- Verde: `#2d5016`
- Gris profesional: `#34495e`

---

## 💾 PASO 6: Configurar Base de Datos (Opcional pero Recomendado)

Si deseas almacenar datos de clientes en una base de datos:

### Necesitas:

1. Un servidor con MySQL
2. Acceso FTP/Panel de control

### Pasos:

1. Abre el archivo: `db/database.sql`
2. Copia TODO el contenido
3. En tu panel de control (cPanel, Plesk, etc.):
   - Ve a "phpMyAdmin"
   - Crea una nueva base de datos: `abogados_sp`
   - Clic en "Importar"
   - Pega el contenido y ejecuta

4. Después, usa `db/conexion_config.php` para conectarte desde tu aplicación

---

## 🌐 PASO 7: Subir a Internet

### Opciones:

**A) Hosting Gratuito (para empezar):**
- Netlify.com (Drag & drop gratuito)
- Vercel.com
- GitHub Pages

**B) Hosting Profesional (recomendado):**
- Bluehost ($2.95/mes)
- SiteGround ($2.99/mes)
- Hostinger ($1.99/mes)

### Paso a paso con Netlify (recomendado):

1. Ve a: https://netlify.com
2. Clic en "Sign up"
3. Usa tu Gmail
4. Arrastra la carpeta `abogados sp pagina web` a Netlify
5. ¡Tu página estará en línea en 30 segundos!

---

## ✅ CHECKLIST: ¿Está todo listo?

- [ ] ✅ Agregué 3 fotos de abogados en `img/`
- [ ] ✅ Cambié los números de teléfono
- [ ] ✅ Cambié los correos de contacto
- [ ] ✅ Actualicé nombres de abogados en HTML
- [ ] ✅ Configuré Formspree para recibir emails
- [ ] ✅ Personalicé colores si lo deseaba
- [ ] ✅ Probé el formulario localmente (abre `index.html` en navegador)
- [ ] ✅ Subí la página a internet

---

## 🧪 Pruebas Locales

Antes de subir a internet, prueba localmente:

1. Abre el navegador
2. Arrastra el archivo `index.html` a la ventana del navegador
3. O escribe: `file:///ruta/a/tu/carpeta/index.html`
4. Prueba:
   - Botones de contacto
   - Links de navegación
   - Formulario (no se enviará, es solo visualizar)
   - Resize de ventana para ver si es "responsive" (se adapta a móvil)

---

## 📱 Ver en Celular

Para probar en celular antes de subir a internet:

1. Coloca toda la carpeta en Google Drive o Dropbox
2. Abre el `index.html` desde el celular
3. Comprueba que todo se ve bien

O usa las herramientas de desarrollador:
- Abre `index.html` en navegador
- Presiona `F12` (Abre herramientas)
- Clic en icono de celular (esquina arriba a la izq)
- Selecciona "Mobile View"

---

## 🛠️ Problemas Comunes

### ❌ "Problema: Las imágenes no aparecen"
**Solución:** Verifica que:
1. Las fotos estén en carpeta `img/`
2. Se llamen exactamente: `lawyer1.jpg`, `lawyer2.jpg`, `lawyer3.jpg`
3. Sean JPG o PNG

### ❌ "Problema: El formulario no envía"
**Solución:**
1. Verifica que configuraste Formspree correctamente
2. Abriste la URL: `https://formspree.io/f/TU_ID_AQUI`
3. Completaste todos los campos (son obligatorios)

### ❌ "Problema: No se ve bien en celular"
**Solución:**
1. El CSS está configurado para responsive
2. Prueba en navegador con herramientas de desarrollador
3. O prueba directamente en celular

### ❌ "Problema: Los colores no son los que quería"
**Solución:**
1. Ve a `css/style.css`
2. Busca `:root {`
3. Cambia los valores HEX
4. Guarda y recarga la página

---

## 📞 Soporte

Si necesitas ayuda:

- **WhatsApp:** +54 3644-369163
- **Email:** contacto@abogadosp.com
- **Web:** https://abogadosp.com

---

## 📚 Recursos Útiles

### Herramientas Gratuitas:

- **Fotos:** Unsplash.com, Pexels.com, Pixabay.com
- **Colores:** Coolors.co
- **Icons:** FontAwesome.com
- **Hosting:** Netlify.com, Vercel.com
- **Dominio:** Namecheap.com, GoDaddy.com

### Documento importante:

Ver `db/README.md` para más info sobre la base de datos.

---

## 🎓 Aprende Más

- **HTML:** W3Schools.com/html
- **CSS:** W3Schools.com/css
- **JavaScript:** W3Schools.com/js
- **Formspree:** Formspree.io/docs

---

## 📝 Notas Importantes

1. **Backup:** Guarda tus archivos en Google Drive o Dropbox
2. **Actualizaciones:** Revisa periódicamente los testimonios
3. **SEO:** Agrega palabras clave en el contenido
4. **Seguridad:** No publiques contraseñas en el código
5. **Contacto:** Responde rápido a consultas por Formspree/WhatsApp

---

## ✨ ¡Felicidades!

**Tu página web está lista.** Ahora solo falta:

1. ✅ Agregar fotos
2. ✅ Configurar Formspree
3. ✅ Subir a internet
4. ✅ Compartir con clientes

---

**Última actualización:** 15 de abril de 2026

**¿Preguntas?** Contacta al equipo de soporte.
