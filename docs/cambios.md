# Registro de cambios

Reorganización completa del proyecto, agrupada por fase. Ningún comando de Git
fue ejecutado: todos los cambios son locales sobre el sistema de archivos.

---

## Fase 1 — Auditoría

Se recorrió el proyecto entero y se documentó en `docs/auditoria.md`: inventario de
archivos con peso y dimensiones, dependencias, enlaces rotos, duplicación de CSS y JS,
relleno de plantilla, y problemas de accesibilidad, SEO y rendimiento.

Hallazgo principal: **dos de las tres tarjetas de proyecto mostraban una captura que no
correspondía a su título**, y las tres capturas correctas estaban en el repositorio sin
referenciar. El repositorio contenía seis capturas reales, no tres.

---

## Fase 2 — Estructura

| Antes | Después |
|---|---|
| `CSS/normalize.css`, `CSS/styles.css`, `CSS/fonts.css` | `assets/css/base.css`, `assets/css/layout.css`, `assets/css/components.css` |
| `JS/script.js` | `assets/js/main.js` |
| `IMG/*.png`, `IMG/*.svg` | `assets/img/brand/`, `assets/img/content/`, `assets/img/projects/` |
| — | `docs/`, `404.html`, `robots.txt`, `sitemap.xml`, `.gitignore`, `favicon.ico` |

Todos los nombres pasaron a minúsculas con guiones, sin números de versión, sin tildes
y sin espacios. Todas las rutas de HTML, CSS y JS se actualizaron y se verificaron una
a una contra el servidor: las 18 devuelven HTTP 200.

No se creó `assets/js/modules/`. La estructura propuesta permite adaptarla cuando el
proyecto es más simple, y aquí lo es: hay una sola pieza de lógica. Un directorio de
módulos habría quedado con un único archivo, o vacío.

---

## Fase 3 — Higiene

**Eliminado** (tras comprobar con `grep`, archivo por archivo, que nadie los referencia):

| Archivo | Motivo |
|---|---|
| `IMG/icon.png` | Favicon de 1297 KB con un OVNI, sin relación con el sitio. Sustituido por un SVG propio |
| `IMG/photo1.png` | Ilustraba la sección de blog, eliminada por ser relleno |
| `IMG/photo5.png` | Logo falso «addoas», imitación de Adidas |
| `IMG/photo6.png` | Logo de H&M presentado como empleador de una persona ficticia |
| `IMG/mail.svg`, `IMG/mail-open.svg` | Iconos del bloque de correo, eliminado por ser un correo inventado |
| `IMG/phone.svg`, `IMG/phone-open.svg` | Iconos del bloque de teléfono, eliminado por ser un teléfono inventado |
| `CSS/normalize.css` | Normalize completo para un sitio que usa una fracción. Sustituido por un reset propio |
| `CSS/fonts.css` | Dos `@import` bloqueantes, uno de ellos duplicado y de una fuente que ninguna regla usaba |
| `CSS/styles.css` | Reescrito en tres archivos |
| `JS/script.js` | Reescrito sin jQuery |
| jQuery slim 3.0.0-beta1 (CDN) | Se usaba solo para seleccionar y alternar clases |

Se creó `.gitignore` con `node_modules/`, `.env`, `*.log`, `.DS_Store`, `Thumbs.db`,
`desktop.ini` y carpetas de editor.

**Credenciales: ninguna.** No había tokens, claves de API ni secretos en el código, ni
antes ni después.

Formato normalizado en todos los archivos: indentación de 2 espacios, comillas dobles
en HTML, punto y coma en JS, salto de línea final.

---

## Fase 4 — Imágenes

Todas convertidas a WebP y redimensionadas a lo que realmente se muestra:

| Origen | Destino | Antes | Después |
|---|---|---|---|
| `profile-closed.png` 1111 px | `content/avatar.webp` 500 px | 1252 KB | 9.3 KB |
| `profile-open.png` 1111 px | `content/avatar-wink.webp` 500 px | 1153 KB | 9.5 KB |
| `photo2.png` | `content/hobby-gaming.webp` | 116 KB | 11.5 KB |
| `photo3.png` | `content/hobby-cooking.webp` | 118 KB | 12.6 KB |
| `photo4.png` | `content/hobby-biking.webp` | 136 KB | 19.9 KB |
| `photo10.png` 2952 px | `projects/recipe-blog.webp` 800 px | 1338 KB | 19.9 KB |
| `photo11.png` 2952 px | `projects/profile-gallery.webp` 800 px | 1415 KB | 16.8 KB |
| `photo12.png` 2952 px | `projects/checkout.webp` 800 px | 725 KB | 16.1 KB |
| `photo7.png` 2952 px | `projects/not-found-page.webp` 800 px | 297 KB | 13.1 KB |
| `photo8.png` 2952 px | `projects/interior-landing.webp` 800 px | 991 KB | 17.3 KB |
| `photo13.png` 2952 px | `projects/agency-landing.webp` 800 px | 2414 KB | 33.0 KB |

- Cada `<img>` lleva `width` y `height` reales, para que no haya desplazamiento de layout.
- `loading="lazy"` en las nueve imágenes bajo el fold; los dos avatares se cargan de inmediato.
- `alt` reescrito en las once, describiendo lo que se ve tras abrir cada archivo. El
  anterior `alt="Adidas"` describía un logo que en realidad dice «addoas»; los tres
  `alt="Web page"` describían capturas distintas entre sí.
- Favicon nuevo: `assets/img/brand/favicon.svg` (437 B), dibujado a mano en el azul de
  marca, más `favicon.ico` y `apple-touch-icon.png` generados a partir de él.

No se descargó ni se inventó ninguna imagen. Las once que quedan salen todas del
repositorio original.

---

## Fase 5 — HTML, SEO y accesibilidad

**Estructura.** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, un solo `<h1>`
y jerarquía sin saltos. Antes los `<h3>` se usaban como párrafos y los `<h4>` como fechas.
El `<nav>` contenía el título «Projects (3)» y tres botones de filtro que no filtraban;
ahora contiene tres enlaces a secciones que existen.

**`<head>`.** Se eliminó el `<meta viewport>` duplicado. Se añadieron:

| Elemento | Antes | Después |
|---|---|---|
| `<title>` | `Portafolio` (10 car., en español) | 50 car. en `index.html`, 50 en `404.html`, únicos |
| `<meta description>` | No existía | 150 car. y 154 car., únicas |
| Open Graph | No existía | `og:type`, `og:title`, `og:description`, `og:locale` |
| Favicon | PNG de 1297 KB | SVG + ICO + apple-touch-icon |
| `preconnect` | No existía | A `fonts.googleapis.com` y `fonts.gstatic.com` |

Sin `og:url` ni `<link rel="canonical">`: ambos exigen la URL absoluta y el proyecto se
preparó sin dominio de publicación fijado. Quedan anotados en el README.

**Datos estructurados.** JSON-LD con un `CreativeWork` cuyo `author` es Pablo Nieto Pérez,
en lugar de un `Person` suelto. Un `Person` en la raíz habría declarado que la página trata
sobre Pablo, cuando su `<h1>` es una persona ficticia; anidarlo como autor es lo que
realmente describe el documento.

**Accesibilidad.**

- Enlace «Skip to content» como primer elemento tabulable.
- Los toggles pasaron de `<div>` y `<h3>` a `<button>` con `aria-pressed` y `aria-expanded`.
  Antes eran inalcanzables por teclado.
- Contraste: los grises del diseño original daban 2.9:1 y el título «Blog» 1.4:1. Ahora el
  texto más flojo mide 5.97:1 y ninguno baja de 4.5:1.
- Anillo de foco de 3 px en los 14 elementos tabulables. El `all: unset` original lo eliminaba.
- El porcentaje de cada skill está en el nombre accesible del botón aunque no se vea, de
  modo que un lector de pantalla nunca depende de la animación.

**Relleno eliminado.** Lorem ipsum en cinco ubicaciones, el texto de plantilla repetido en
las tres tarjetas de proyecto («This page is similiar with a page», con erratas incluidas)
y los cuatro `<br>` que hacían de espaciador tras el `</footer>`.

`robots.txt` y `sitemap.xml` creados. El sitemap usa `<loc>` relativos por no haber dominio,
lo que el protocolo no admite; el propio archivo y el README explican qué falta.

---

## Fase 6 — CSS y sistema de diseño

De 705 líneas en un archivo a tres archivos ordenados: variables → reset → base → layout →
componentes → utilidades → media queries.

- **Variables en `:root`**: 9 colores, escala de espaciado de 8 pasos, 7 tamaños de texto,
  4 radios, 2 sombras y 2 transiciones. La paleta se derivó de la que ya usaba el sitio;
  solo se oscurecieron los grises de texto para alcanzar el contraste mínimo.
- **Duplicación eliminada**: `.progress-container-1..6` eran seis reglas idénticas y
  `.progess-number-1..6` otras seis. Ahora es una regla por componente más tres modificadores
  de anchura. Son unas 180 líneas menos.
- **Errata corregida**: `progess-number` → `skill__value`.
- **Selectores peligrosos eliminados**: `nav a, button` y `.section-1 a, button` aplicaban
  `all: unset` a todos los `<button>` del documento; `.grand-child-2 div, h2, h3` y
  `.text h4, p` afectaban a todos los `h2`, `h3`, `h4` y `p` de la página.
- **Valores mágicos eliminados**: `translate3d(-267px, -1.5px, 0)`, `margin-left: 170px`,
  `margin-right: -31px`, `max-width: 452.4px`. Las barras de nivel ya no se posicionan con
  `position: absolute` y márgenes fijos, sino con una rejilla de dos columnas.
- **Nombres**: `grand-child-1`, `child-main-2`, `.proflie-class` → `skill-list`, `project`,
  `avatar`, `site-header`.
- Regla vacía `.grand-child-2 h2{}` eliminada. Cero `!important`, cero estilos inline,
  ningún selector de más de tres niveles.

---

## Fase 7 — Responsive

Se pasó de 9 breakpoints `max-width` (desktop-first) a 3 `min-width` (mobile-first):
480, 768 y 1024. El de 1440 no hizo falta: el contenedor tiene un máximo de 1020 px y a
partir de 1024 el layout ya no cambia.

Verificado con `document.documentElement.scrollWidth > window.innerWidth` en las dos
páginas y los cuatro anchos exigidos:

| Ancho | index.html | 404.html |
|---|---|---|
| 360 px | sin scroll horizontal | sin scroll horizontal |
| 768 px | sin scroll horizontal | sin scroll horizontal |
| 1024 px | sin scroll horizontal | sin scroll horizontal |
| 1440 px | sin scroll horizontal | sin scroll horizontal |

Áreas táctiles: ningún elemento interactivo baja de 44×44 px, comprobado midiendo el
rectángulo de los 14 enlaces y botones.

**No se añadió menú hamburguesa.** El sitio tiene una página y tres anclas; un menú
desplegable habría sido complejidad inventada. La navegación es una lista que se ajusta
por `flex-wrap` y funciona con teclado en cualquier ancho.

---

## Fase 8 — UX / UI

- Estados completos en todo elemento interactivo: `default`, `hover`, `focus-visible` y
  `active`, con transiciones de 150–200 ms.
- Espaciado consistente a partir de la escala; se eliminó el `margin-top: 37px` y similares.
- Ancho de línea limitado a 68 caracteres mediante `--measure`.
- `prefers-reduced-motion` respetado.
- **Sin formularios**: el sitio no tenía ninguno y no se añadió, porque no hay servicio al
  que enviarlos.
- Un único destino real y visible en la sección de proyectos: el perfil de devChallenges
  donde viven las seis soluciones. Antes ese enlace decía «dev.to» y apuntaba a
  devchallenges.io, con `target="blank"` (sin guion bajo) y sin `rel="noopener"`.

---

## Fase 9 — JavaScript

De 117 líneas con jQuery a 55 sin dependencias.

| Antes | Después |
|---|---|
| 16 bloques `$(function(){...})`, 12 de ellos idénticos salvo un número | 1 listener delegado en `document` |
| jQuery slim 3.0.0-beta1 desde CDN | Ninguna dependencia |
| `e.preventDefault()` sobre `<div>` y `<h3>` | Innecesario: los `<button>` no navegan |
| Sin comprobación de existencia | `closest()` devuelve `null` y la función sale |
| Toggles inaccesibles por teclado | `<button>` nativos: `Enter` y `Space` verificados |

Script clásico con `defer` en lugar de módulo ES, a propósito: así la página también
funciona abierta como archivo local, cosa que un módulo impide por CORS.

Cero errores y cero avisos en consola en las dos páginas.

---

## Fase 10 — Rendimiento

| Métrica | Antes | Después |
|---|---|---|
| Peso de la primera carga | ~9.5 MB | **166 KB** |
| Peticiones | 8 + 9 imágenes | 14 |
| Favicon | 1297 KB | 437 B |
| JavaScript | 2.4 KB + ~24 KB de jQuery | 1.7 KB |
| CSS | 3 archivos, 18.4 KB, uno con `@import` anidados | 3 archivos, 15.3 KB, sin `@import` |

- Fuentes con `preconnect` a los dos orígenes y `display=swap`.
- Los `@import` de fuentes, que bloqueaban el render en cascada, pasaron a `<link>`.
- Una sola familia tipográfica, con los tres pesos que se usan (400, 500, 600). Antes se
  importaban dos familias y una no la usaba ninguna regla.
- Script con `defer`.

---

## Fase 11 — QA

Verificado en Chrome sin interfaz, controlado por CDP. Resultados sobre `index.html` y
`404.html`:

| Comprobación | Resultado |
|---|---|
| Enlaces del menú y del pie llevan a algo que existe | 7 enlaces, todos resuelven |
| Cada ruta de imagen corresponde a un archivo real | 11 de 11, 0 rotas |
| Cada `<link>` y `<script>` apunta a un archivo que existe | 18 rutas locales, todas HTTP 200 |
| Errores en consola | 0 errores, 0 avisos, 0 excepciones, 0 peticiones fallidas |
| Scroll horizontal a 360 / 768 / 1024 / 1440 | Ninguno |
| Interacciones en ambos sentidos | Avatar y skills: `false → true → false` |
| Activación con teclado | `Enter` y `Space` verificados sobre `.skill` |
| Foco visible | 3 px en los 14 elementos tabulables |
| Relleno de plantilla | 0 coincidencias de Lorem ipsum, TODO, TBD ni texto heredado |
| `title` y `description` únicos | 50/150 y 50/154 caracteres |
| `404.html` con enlace de vuelta | Presente |
| Credenciales en el código | Ninguna |
| Áreas táctiles bajo 44 px | Ninguna |

Se corrigieron dos defectos detectados durante el QA:

1. Los enlaces del pie daban **4.42:1** de contraste, por debajo del mínimo. El color de
   enlace pasó de `--color-accent` a `--color-accent-strong`: ahora 6.81:1.
2. A partir de 1024 px la tarjeta de skills terminaba antes que la de hobbies y dejaba un
   hueco en la página. Las dos comparten altura.

También se comprobó la apertura directa con `file://`: CSS aplicado, JavaScript operativo,
11 imágenes cargadas, 0 errores.

---

## Fase 12 — Documentación

- `docs/auditoria.md`: estado del repositorio antes de tocarlo.
- `docs/cambios.md`: este archivo.
- `README.md`: actualizado. Se eliminaron tres afirmaciones que el repositorio no
  respaldaba —un filtro de proyectos por tecnología, un contador derivado del filtro y
  código fuente Sass— porque no existía ninguna de las tres. Se eliminó la sección
  «Known issues», ya resuelta. Se actualizaron rutas, comandos y stack.

---

## Fase 13 — Deploy

- Verificado abriendo `index.html` directamente y sirviéndolo por HTTP.
- Ninguna ruta absoluta de la máquina local en el código publicable.
- Todas las rutas internas relativas y en minúsculas.
- **No se creó configuración de hosting.** El destino de despliegue no se especificó, así
  que no hay `vercel.json`, `_redirects` ni `.htaccess`.
- No se ejecutó ningún despliegue.

---

## Fase 14 — Promoción

- Bloque «Hire me» al final del `README.md`, con los enlaces de Fiverr y wib.digital.
- Insignia de Fiverr bajo el título del README.
- Firma en el pie del sitio, dentro del `<footer>` existente, sin crear uno segundo.
- Datos estructurados JSON-LD en el `<head>` de `index.html`.
- Sin cifras de reseñas, valoraciones ni nivel de vendedor en ningún archivo.

---

## Contenido eliminado por no poder completarse con información real

| Sección | Motivo |
|---|---|
| Correo `billy@devplex.com` y teléfono `(+413) 782 956 210` | Inventados. Un `mailto` a esa dirección no llega a ninguna parte |
| Sección «Experiences» (dos entradas) | Descripciones en Lorem ipsum, logo falso de Adidas, logo real de H&M como empleador de una persona ficticia, y fechas de empleo solapadas |
| Sección «Blog» | Un artículo que no existe, con párrafo en Lorem ipsum y un enlace mal etiquetado |
| Filtros «React / Vue / Responsive» | Eran `href="#"` sin filtro detrás. Además, las seis soluciones son HTML y CSS: los filtros de React y Vue no habrían encontrado nada |
| Paginación del pie (`< 1 2 3 … 10 >`) | Siete botones sin destino ni JavaScript, para un contenido que cabe en una página |
| Botones «Demo» y «Code» de cada tarjeta | Doce `<a href="">` que recargaban la propia página. No hay URLs reales de demo ni de repositorio por proyecto |
| Descripciones de los hobbies | Las tres eran la misma frase en Lorem ipsum. Las secciones se conservan con foto y nombre, que sí son reales |
