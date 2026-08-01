# Auditoría inicial

Estado del repositorio antes de la reorganización. Documento de trabajo interno.

## 1. Qué es el proyecto

Implementación en HTML/CSS/JS de un brief de diseño de [devChallenges](https://devchallenges.io):
una página única de portafolio de desarrollador front-end. La identidad que aparece en pantalla
—**Billy Pearson**— es el personaje ficticio del brief, no una persona real.

Sitio estático, una sola página, sin build, sin dependencias npm.

## 2. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real |
|---|---|---|---|
| `index.html` | `Portafolio` | `Billy Pearson` | Única página del sitio |

No existía `404.html`.

## 3. Hojas de estilo

| Archivo | Peso | ¿Se carga? | Observaciones |
|---|---|---|---|
| `CSS/normalize.css` | 2.3 KB | Sí | Normalize minificado en 1 línea + reglas de scrollbar propias mezcladas al final |
| `CSS/styles.css` | 15.5 KB | Sí | 705 líneas. Todo el layout, componentes y media queries en un solo archivo |
| `CSS/fonts.css` | 561 B | Sí | 2 `@import` activos + 2 comentados. Se carga en tercer lugar, después de usar las fuentes |

## 4. JavaScript

| Archivo | Peso | ¿Se carga? | Observaciones |
|---|---|---|---|
| `JS/script.js` | 2.4 KB | Sí | 117 líneas, **16 bloques `$(function(){...})` separados**, todos con la misma estructura copiada |
| jQuery slim (CDN) | ~24 KB | Sí | `3.0.0-beta1` — versión **beta de 2016**, cargada desde cdnjs |

`script.js` se carga **sin `defer`** y **antes** de que exista el DOM que manipula. Funciona solo
porque todo va envuelto en `$(function(){})`.

## 5. Imágenes

| Archivo | Dimensiones | Peso | ¿Se usaba? | Contenido real |
|---|---|---|---|---|
| `icon.png` | 1024×1024 | 1297 KB | Sí (favicon) | Un OVNI. Sin relación con el sitio |
| `profile-closed.png` | 1111×1111 | 1252 KB | Sí | Avatar dibujado a mano, ojos abiertos |
| `profile-open.png` | 1111×1111 | 1153 KB | Sí | El mismo avatar guiñando un ojo |
| `photo1.png` | 1024×1024 | 1352 KB | Sí (blog) | Portátil y café vistos desde arriba |
| `photo2.png` | 480×180 | 116 KB | Sí | Mando de videojuegos |
| `photo3.png` | 480×180 | 118 KB | Sí | Utensilios de cocina de madera |
| `photo4.png` | 480×180 | 136 KB | Sí | Manos en el manillar de una bicicleta |
| `photo5.png` | 250×250 | 15 KB | Sí (experiencia) | Logo **falso «addoas»**, parodia de Adidas |
| `photo6.png` | 1024×1024 | 1043 KB | Sí (experiencia) | Logo de **H&M**, marca real |
| `photo7.png` | 2952×2202 | 297 KB | Sí | Captura de una **página 404** |
| `photo8.png` | 2952×2202 | 991 KB | Sí | Captura de una landing de **interiorismo** |
| `photo10.png` | 2952×2202 | 1338 KB | **No** | Captura de un **blog de recetas** (cheesecake) |
| `photo11.png` | 2952×2202 | 1415 KB | **No** | Captura de una **galería de perfil** (Rodney Cotton) |
| `photo12.png` | 2952×2202 | 725 KB | Sí | Captura de una página de **checkout** |
| `photo13.png` | 2952×2202 | 2414 KB | **No** | Captura de la landing de agencia **Edie** |
| `mail.svg` | 48×48 | 244 B | Sí | Icono de sobre cerrado |
| `mail-open.svg` | 48×48 | 279 B | Sí | Icono de sobre abierto |
| `phone.svg` | 48×48 | 413 B | Sí | Icono de teléfono |
| `phone-open.svg` | 48×48 | 632 B | Sí | Icono de teléfono con ondas |

**Peso total de imágenes: 13.4 MB.** Ninguna imagen llevaba `width`/`height` ni `loading`.

## 6. Dependencias externas

| Dependencia | Origen | Uso real |
|---|---|---|
| jQuery slim 3.0.0-beta1 | cdnjs.cloudflare.com | Solo `$()`, `.click()` y `.toggleClass()` |
| Montserrat | fonts.googleapis.com (`@import`) | Fuente base del sitio |
| Playfair Display SC | fonts.googleapis.com (`@import`) | **Importada dos veces, nunca usada en ninguna regla** |

Sin `preconnect`. Los `@import` bloquean el render en cascada.

## 7. Archivos basura

Ninguno. No había `.bak`, `node_modules`, `.DS_Store`, `Thumbs.db` ni copias versionadas.
Tampoco existía `.gitignore`.

## 8. Enlaces y rutas rotas

| Elemento | Problema |
|---|---|
| 6 × `<a href="">` (botones Demo y Code) | `href` vacío: **recarga la propia página** |
| 3 × `<a href="#">` (filtros React / Vue / Responsive) | No hay filtro implementado. No hacen nada |
| 7 × `<button>` de paginación (`< 1 2 3 … 10 >`) | Sin `href`, sin JS. Decorativos |
| `<a target="blank" href="…devchallenges.io/portfolio/pabloDYEL">` | Texto del enlace dice **«dev.to»**, apunta a devchallenges.io. `target="blank"` en vez de `_blank`, y sin `rel="noopener"` |

No había `<link>` ni `<script>` apuntando a archivos inexistentes.

## 9. Imágenes mal asignadas

Este es el defecto de contenido más grave: **dos de las tres tarjetas de proyecto mostraban una
captura que no corresponde a su título.**

| Tarjeta | Imagen que usaba | Lo que muestra esa imagen | Imagen correcta |
|---|---|---|---|
| Recipe Blog | `photo8.png` | Landing de interiorismo | `photo10.png` |
| My Gallery | `photo7.png` | Página 404 | `photo11.png` |
| Checkout | `photo12.png` | Página de checkout | correcta |

Las tres capturas «sin usar» (`photo10`, `photo11`, `photo13`) eran en realidad las buenas.
En total el repositorio contenía **seis** capturas de proyecto reales, no tres.

## 10. Contenido de relleno del template

| Ubicación | Texto |
|---|---|
| Intro del header | `Donec aliquam est dui, vel vestibulum diam sollicitudin id. Quisque feugiat malesuada molestie.` |
| Hobbies × 3 | `Quisque feugiat malesuada molestie.` |
| Blog | `In this article I tell the story about Proin eu justo sit amet lacus bibendum tincidunt…` |
| Experiencia × 2 | `Donec aliquam est dui, vel vestibulum diam sollicitudin id. Quisque feugiat malesuada molestie.` |
| Proyectos × 3 | `This page is similiar with a page. The design is from devchallenge.io` (con erratas) |

## 11. Datos ficticios o de terceros

| Dato | Problema |
|---|---|
| `billy@devplex.com` | Correo inventado |
| `(+413) 782 956 210` | Teléfono inventado (prefijo inexistente) |
| Logo «addoas» | Marca falsa que imita a Adidas |
| Logo H&M | Marca real presentada como empleador de una persona ficticia |
| `Feb 2017 - Current`, `Aug 2016 - Feb 2018` | Fechas de empleo inventadas y solapadas |
| `65.6 %`, `84 %`, `92.4 %` | Porcentajes repetidos exactamente en dos tríos de skills |

## 12. Problemas de CSS

| Problema | Detalle |
|---|---|
| Duplicación masiva | `.progress-container-1..6` son **6 reglas idénticas**. `.progess-number-1..6` son **6 reglas idénticas**. ~180 líneas duplicadas |
| Errata propagada | `progess-number` (falta la `r`) en CSS, HTML y JS |
| `all: unset` en selectores sueltos | `nav a, button` y `.section-1 a, button` aplican `all: unset` a **todos los `<button>` del documento**, no solo a los del contenedor |
| Selectores de elemento globales | `.grand-child-2 div, h2, h3` y `.text h4, p` afectan a **todos** los `h2`, `h3`, `h4` y `p` de la página |
| Regla vacía | `.grand-child-2 h2{}` |
| Valores mágicos | `translate3d(-267px, -1.5px, 0)`, `margin-left: 170px`, `margin-right: -31px`, `max-width: 452.4px`, `height: 12.5px` |
| Sin variables | Cada color repetido literal: `rgba(79,79,79,1)` aparece 11 veces, `rgba(47,128,237,1)` 12 veces |
| Media queries | 8 breakpoints con `max-width` (desktop-first): 1066, 1053, 1030, 600, 550, 530, 430, 365, 290 px |
| Barras de progreso | `position: absolute` + `margin-left` fijo: se descolocan a anchos intermedios |
| Nombres sin significado | `grand-child-1`, `child-main-2`, `grandchild-header-1`, `.proflie-class` (errata) |

## 13. Problemas de JavaScript

| Problema | Detalle |
|---|---|
| 16 IIFE de jQuery separadas | Un `$(function(){})` por cada listener |
| Duplicación | 12 de los 16 bloques son el mismo patrón cambiando solo un número |
| jQuery innecesario | Solo se usa para seleccionar y alternar clases |
| `e.preventDefault()` sin sentido | Se llama en `<div>` y `<h3>`, elementos sin comportamiento por defecto |
| Sin comprobación de existencia | Si un selector no encuentra nada, falla en silencio |
| Accesibilidad | Los toggles van sobre `<div>` y `<h3>`: **no accesibles por teclado**, sin `role`, sin `aria-expanded` |

## 14. Accesibilidad y semántica

| Problema | Detalle |
|---|---|
| `<meta viewport>` duplicado | Dos veces idéntico |
| Jerarquía de encabezados rota | `<h1>` seguido de `<h2>`, luego `<h2>` de sección, `<h3>` como texto de párrafo y `<h4>` como fecha |
| `<h3>` usados como texto | En hobbies y en proyectos, los `<h3>` son descripciones, no títulos |
| `<nav>` sin navegación | El elemento `<nav>` contiene el título «Projects (3)» y tres botones de filtro que no filtran |
| `<section>` sin nombre accesible | La sección de proyectos no tiene encabezado propio |
| `alt` genéricos | `alt="Profile"` ×2, `alt="Web page"` ×3, `alt=""` en un icono informativo |
| `alt` incorrectos | `alt="Adidas"` sobre un logo que dice «addoas» |
| Sin foco visible | `all: unset` en botones elimina el `outline` por defecto |
| `<br><br><br><br>` | Cuatro saltos de línea después de `</footer>` como espaciador |
| Contraste | `rgba(130,130,130,1)` sobre `#F2F2F2` ≈ **2.9:1** — por debajo del mínimo 4.5:1 |
| `rgba(224,224,224,1)` sobre blanco | Título «Blog» ≈ **1.4:1** — prácticamente ilegible |

## 15. SEO

| Elemento | Estado |
|---|---|
| `<title>` | `Portafolio` — español en una página en inglés, 10 caracteres |
| `<meta name="description">` | **No existe** |
| Open Graph | **No existe** |
| `<link rel="canonical">` | **No existe** |
| `robots.txt` | **No existe** |
| `sitemap.xml` | **No existe** |
| `lang` | `en` — correcto |

## 16. Rendimiento

| Métrica | Valor inicial |
|---|---|
| Peso de imágenes en la primera carga | ~9.5 MB (solo las referenciadas) |
| Favicon | 1297 KB para mostrarse a 16×16 px |
| Peticiones bloqueantes | 3 CSS + 1 JS + 1 jQuery CDN + 2 `@import` de fuentes |
| `defer` / `async` | Ninguno |
| `font-display` | `swap` presente en la URL de Google Fonts |
| `preconnect` | Ausente |

## 17. Credenciales

**Ninguna.** No hay tokens, claves de API ni credenciales en el código.

---

## Resumen en cinco líneas

1. Es la implementación de un brief de diseño de devChallenges: un portafolio de una sola página con una persona ficticia, Billy Pearson.
2. Funciona y se ve razonablemente bien, pero está construido con copiar-pegar: 180 líneas de CSS duplicado y 16 bloques de jQuery casi idénticos.
3. **Lo más grave es de contenido: dos de las tres tarjetas de proyecto mostraban la captura equivocada**, y las tres capturas correctas estaban en el repositorio sin usar.
4. Le sigue el peso: 13.4 MB de imágenes, con un favicon de 1.3 MB y capturas de 2952 px mostradas a 300 px.
5. Y luego el relleno: Lorem ipsum en cinco sitios, un correo y un teléfono inventados, un logo falso de Adidas, el logo real de H&M como empleador ficticio, y trece enlaces y botones que no llevan a ninguna parte.
