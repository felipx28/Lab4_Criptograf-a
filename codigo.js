// ==UserScript==
// @name         Get UpperCaseLetter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cripto.tiiny.site/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tiiny.site
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Obtener el texto de la página
    const textoPagina = document.body.textContent;

    // Obtener la llave a partir de las mayúsculas en el texto
    const llave = obtenerLlaveDesdeMayusculas(textoPagina);

    if (llave) {
        // Mostrar la llave en la consola
        console.log('La llave es:', llave);
        
        agregarDiv('b5XKFxSah5Y=', 'M7');
        agregarDiv('ipd8XWom8BM=', 'M8');
        agregarDiv('gmylSIHIc8yTe/Jci7K24w==', 'M9');

        // Obtener todos los elementos <div> en la página
        const divs = document.querySelectorAll('div');

        // Obtener la cantidad de mensajes cifrados (cantidad de divs)
        const cantMensajesCifrados = divs.length;
        console.log('La cantidad de mensajes cifrados es:', cantMensajesCifrados);

        // Crear un elemento para mostrar los mensajes descifrados en la página
        const mensajesDescifradosDiv = document.createElement('div');
        mensajesDescifradosDiv.style.marginTop = '20px'; // Espacio superior para separar los mensajes

        // Iterar a través de los divs y descifrar los mensajes cifrados
        for (const div of divs) {
            // Obtener el ID del div
            const divId = div.id;

            // Obtener el mensaje cifrado en Base64 (asumiendo que se encuentra en el atributo "id")
            const mensajeCifradoBase64 = divId;

            // Descifrar el mensaje cifrado
            const mensajeDescifradoBytes = descifrarMensajeCifrado(llave, mensajeCifradoBase64);

            // Convertir el mensaje descifrado a texto plano
            const mensajeDescifradoTexto = mensajeDescifradoBytes.toString(CryptoJS.enc.Utf8);

            // Crear un elemento de párrafo para mostrar el mensaje descifrado en la página
            const mensajeDescifradoParrafo = document.createElement('p');
            mensajeDescifradoParrafo.textContent = `${mensajeDescifradoTexto}`;
            mensajesDescifradosDiv.appendChild(mensajeDescifradoParrafo);

            // Mostrar el mensaje cifrado y el mensaje descifrado en la consola
            console.log(mensajeCifradoBase64, mensajeDescifradoTexto);
        }



         // Agregar el contenedor de mensajes descifrados al final de la página
        document.body.appendChild(mensajesDescifradosDiv);

    } else {
        console.log('No se encontraron mayúsculas en la página.');
    }

    // Función para obtener la llave a partir de las mayúsculas en el texto
    function obtenerLlaveDesdeMayusculas(texto) {
        const mayúsculas = texto.match(/[A-Z]/g);
        if (mayúsculas) {
            const llave = mayúsculas.join("");
            return llave;
        } else {
            console.error("No se encontraron letras mayúsculas en el texto.");
            return null;
        }
    }

    // Función para descifrar un mensaje cifrado con 3DES en modo ECB
    function descifrarMensajeCifrado(llave, mensajeCifradoBase64) {
        // Convierte la llave de texto a un objeto WordArray
        const llaveWordArray = CryptoJS.enc.Utf8.parse(llave);

        // Decodificar el mensaje cifrado de Base64 a un objeto WordArray
        const mensajeCifradoWordArray = CryptoJS.enc.Base64.parse(mensajeCifradoBase64);

        // Realizar el descifrado
        const mensajeDescifradoWordArray = CryptoJS.TripleDES.decrypt(
            {
                ciphertext: mensajeCifradoWordArray,
            },
            llaveWordArray,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }
        );

        return mensajeDescifradoWordArray;
    }

    function agregarDiv(id, className) {
        // Crear un nuevo div
        const nuevoDiv = document.createElement('div');

        // Asignar el ID y la clase al div
        nuevoDiv.id = id;
        nuevoDiv.className = className;

        // Agregar el div al final de la página
        document.body.appendChild(nuevoDiv);

    }
})();

