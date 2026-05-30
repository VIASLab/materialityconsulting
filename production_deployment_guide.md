# Guía de Producción - Materiality Consulting 2.0

## 1. Uso del Content Manager (Admin)

Accede a `/pages/admin.html` en tu navegador.

### Flujo de Trabajo

1. **Cargar datos actuales:** Arrastra tu archivo `external-sources.json` sobre la zona de subida (Drag & Drop), o haz clic para buscarlo.
2. **Agregar recurso:** Completa el formulario (Título, URL, Descripción, Formato) y haz clic en **"Add to List"**.
3. **Editar:** Haz clic en **Edit** en cualquier tarjeta. El formulario se actualiza automáticamente.
4. **Eliminar:** Haz clic en **Delete** y confirma.
5. **Exportar:** Haz clic en **"Export & Download JSON"**. Se descarga un archivo `external-sources.json`.
6. **Publicar:** Sube el archivo descargado a `assets/data/external-sources.json` en tu hosting.

> **Nota:** En modo local (`file://`) el JSON no carga por restricciones del navegador. En tu hosting (HTTP) cargará automáticamente.

---

## 2. Archivos para Producción

**Subir:**
```
index.html
style.css
script.js
assets/data/external-sources.json
assets/images/ (logo.webp, favicon.webp, carlos.jpg, charts, credential)
pages/admin.html
pages/recursos.html
pages/transparencia.html
```

**NO subir:**
- `*.zip` (respaldos WordPress)
- `extracted/`
- `.agents/`
- `skills-lock.json`
- `settings.rtf`
- `production_deployment_guide.md`

---

## 3. Subir al Hosting

1. Selecciona SOLO los archivos de producción y comprímelos en un ZIP.
2. Accede a **File Manager** de tu hosting (cPanel / hPanel).
3. Navega a `public_html`.
4. Sube el ZIP y haz clic en **Extract**.
5. Verifica abriendo tu dominio en el navegador.

---

## 4. Mantenimiento

- **Textos:** Editar directamente en `index.html`.
- **Recursos:** Usar el Content Manager (`admin.html`), exportar JSON y subirlo.
- **Colores:** Modificar variables CSS en `:root` dentro de `style.css`.
- **Imágenes:** Colocar en `assets/images/` (preferiblemente `.webp`).
