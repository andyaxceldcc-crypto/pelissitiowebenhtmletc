// ======================================================
// BUSCADOR DE PELÍCULAS
// Busca directamente los títulos y descripciones del HTML
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const buscador = document.getElementById("buscador");
    const resultados = document.getElementById("resultados");

    // Comprobar que existen los elementos necesarios
    if (!buscador) {
        console.error("No existe #buscador en el HTML");
        return;
    }

    if (!resultados) {
        console.error("No existe #resultados en el HTML");
        return;
    }

    // ==================================================
    // OBTENER TODAS LAS PELÍCULAS DEL HTML
    // ==================================================

    const peliculas = document.querySelectorAll(".pelicula");

    // ==================================================
    // FUNCIÓN PARA BUSCAR
    // ==================================================

    function buscar() {

        const texto = buscador.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

        let cantidad = 0;

        peliculas.forEach((pelicula) => {

            const tituloElemento =
                pelicula.querySelector(".titulo");

            const descripcionElemento =
                pelicula.querySelector(".descripcion");

            const titulo =
                tituloElemento
                    ? tituloElemento.textContent
                    : "";

            const descripcion =
                descripcionElemento
                    ? descripcionElemento.textContent
                    : "";

            const textoTitulo = titulo
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            const textoDescripcion = descripcion
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            // ==========================================
            // BUSCAR TÍTULO O DESCRIPCIÓN
            // ==========================================

            const encontrado =
                texto === "" ||
                textoTitulo.includes(texto) ||
                textoDescripcion.includes(texto);

            if (encontrado) {

                pelicula.style.display = "";

                cantidad++;

            } else {

                pelicula.style.display = "none";

            }

        });

        // ==============================================
        // MENSAJE SI NO HAY RESULTADOS
        // ==============================================

        if (texto !== "" && cantidad === 0) {

            resultados.innerHTML = `
                <div class="sin-resultados">
                    <p>No se encontraron películas para:</p>
                    <strong>${escaparHTML(buscador.value)}</strong>
                </div>
            `;

        } else {

            resultados.innerHTML = "";

        }

    }

    // ==================================================
    // EVITAR HTML INYECTADO EN EL MENSAJE
    // ==================================================

    function escaparHTML(texto) {

        return texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

    // ==================================================
    // BUSCAR MIENTRAS ESCRIBES
    // ==================================================

    buscador.addEventListener("input", buscar);

    // ==================================================
    // BUSCAR AL CARGAR
    // ==================================================

    buscar();

});
