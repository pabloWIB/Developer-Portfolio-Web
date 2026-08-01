/**
 * main.js — interacciones de la página.
 *
 * Reemplaza los 16 bloques de jQuery del script original. Las dos interacciones
 * del diseño (el guiño del retrato y el nivel de cada skill) son lo mismo:
 * alternar un atributo ARIA booleano en un botón. Se resuelven con delegación,
 * un único listener para toda la página.
 *
 * Script clásico con `defer` en lugar de módulo ES: así la página también
 * funciona abierta directamente como archivo, sin servidor.
 */

(function () {
  "use strict";

  /* Cada entrada asocia un selector de botón con el atributo que alterna. */
  var TOGGLES = [
    { selector: ".avatar", attribute: "aria-pressed" },
    { selector: ".skill", attribute: "aria-expanded" }
  ];

  /**
   * Devuelve la configuración cuyo selector coincide con el botón pulsado,
   * o null si el clic no venía de ninguno de ellos.
   */
  function matchToggle(target) {
    for (var i = 0; i < TOGGLES.length; i += 1) {
      var button = target.closest(TOGGLES[i].selector);

      if (button) {
        return { button: button, attribute: TOGGLES[i].attribute };
      }
    }

    return null;
  }

  function handleClick(event) {
    if (!(event.target instanceof Element)) {
      return;
    }

    var match = matchToggle(event.target);

    if (!match) {
      return;
    }

    var isOn = match.button.getAttribute(match.attribute) === "true";
    match.button.setAttribute(match.attribute, isOn ? "false" : "true");
  }

  document.addEventListener("click", handleClick);
})();
