// Función para habilitar o deshabilitar el campo de texto según la selección
function toggleInput(inputId) {
    const selectElement = document.getElementById(inputId.replace('-input', '-select'));
    const inputElement = document.getElementById(inputId);

    if (selectElement.value === "Escribir") {
        inputElement.disabled = false;
        permitirSaltosDeLinea(inputId);
    } else {
        inputElement.disabled = true;
        inputElement.value = ""; // Limpiar el campo si se deshabilita
    }
}

// Función para habilitar los campos de llamadas si se selecciona "Diferencia de Llamadas"
function toggleSmartapInputs() {
    const smartapSelect = document.getElementById("smartap-select");
    const llamadasAInput = document.getElementById("llamadas-a-input");
    const llamadasBInput = document.getElementById("llamadas-b-input");

    if (smartapSelect.value === "2") { // "Diferencia de Llamadas"
        llamadasAInput.disabled = false;
        llamadasBInput.disabled = false;
    } else {
        llamadasAInput.disabled = true;
        llamadasBInput.disabled = true;
        llamadasAInput.value = ""; // Limpiar el campo si se deshabilita
        llamadasBInput.value = ""; // Limpiar el campo si se deshabilita
    }
}



// Función para enviar el mensaje
function enviarMensaje() {
    const practicante = document.getElementById("practicante-input").value;
    const importante = document.getElementById("importante-select").value;
    const importanteInput = document.getElementById("importante-input").value;
    const pendientes = document.getElementById("pendientes-select").value;
    const pendientesInput = document.getElementById("pendientes-input").value;
    const creaciones = document.getElementById("creaciones-input").value;
    const pazSalvo = document.getElementById("paz-salvo-input").value;
    const reasignaciones = document.getElementById("reasignaciones-input").value;
    const desbloqueos = document.getElementById("desbloqueos-input").value;
    const actividades = document.getElementById("actividades-input").value;
    const serviceManager = document.getElementById("service-manager-input").value;
    const smartap = document.getElementById("smartap-select").value;
    const llamadasA = document.getElementById("llamadas-a-input").value;
    const llamadasB = document.getElementById("llamadas-b-input").value;

    // Validar que todos los campos obligatorios estén llenos
    if (!practicante || !importante || (importante === "Escribir" && !importanteInput) ||
        !pendientes || (pendientes === "Escribir" && !pendientesInput) ||
        !creaciones || !pazSalvo || !reasignaciones || !desbloqueos || !actividades || !serviceManager) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    // Validar smartap solo si se selecciona "Diferencia de Llamadas"
    if (smartap === "2" && (!llamadasA || !llamadasB)) {
        alert("Por favor, complete los campos de llamadas A y B para Smartap.");
        return;
    }

    // Obtener la fecha actual
    const fechaActual = new Date().toLocaleDateString('es-CO');

    // Construir el mensaje con formato organizado
    let mensaje = `ENTREGA DIARIA PARA APRENDICES\n\n`;
    mensaje += `Practicante: ${practicante}\n\n`;
    mensaje += `IMPORTANTE:\n- ${importante === 'Escribir' ? importanteInput : importante}\n\n`;
    mensaje += `PENDIENTES:\n- ${pendientes === 'Escribir' ? pendientesInput : pendientes}\n\n`;
    mensaje += `Creaciones realizadas: ${creaciones}\n`;
    mensaje += `Paz y salvo realizados: ${pazSalvo}\n`;
    mensaje += `Reasignaciones realizadas: ${reasignaciones}\n`;
    mensaje += `Desbloqueos realizados: ${desbloqueos}\n`;
    mensaje += `Actividades manuales: ${actividades}\n`;
    mensaje += `Service manager realizados: ${serviceManager}\n\n`;

     // Añadir mensaje de SmartAP
    if (smartap === "2") {
        mensaje += `Se realiza el monitoreo de SMARTAP del dia ${fechaActual} Se presentó una diferencia de llamadas del link A con ${llamadasA} llamadas y en el link B con ${llamadasB} llamadas.\n`;
    } else if (smartap === "1") {
        mensaje += `Se realiza el monitoreo de SMARTAP del dia ${fechaActual} no se presentó ninguna novedad.\n`;
    }

    // Enviar el mensaje a Telegram
    const botToken = '7812417782:AAE_koGAy-QrC11udOTies4naL8Yc06qq1U'; // Reemplaza con tu token
    const chatId = '-1002294962984'; // Reemplaza con el ID del grupo

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: mensaje,
            parse_mode: 'Markdown',
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Solo se muestra el mensaje de éxito si 'ok' es verdadero
        if (data.ok) {
            console.log('Mensaje enviado:', data);
            alert('Mensaje enviado al grupo');
            clearForm(); // Llamar a la función para limpiar el formulario
        } else {
            // Si la respuesta no es 'ok', mostrar el error
            console.error('Error en la respuesta de Telegram:', data);
            alert('Error al enviar el mensaje');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert('Error al enviar el mensaje: ' + error.message, "danger");
    });
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById("practicante-input").value = "";
    document.getElementById("importante-select").value = "";
    document.getElementById("importante-input").value = "";
    document.getElementById("pendientes-select").value = "";
    document.getElementById("pendientes-input").value = "";
    document.getElementById("creaciones-input").value = "";
    document.getElementById("paz-salvo-input").value = "";
    document.getElementById("reasignaciones-input").value = "";
    document.getElementById("desbloqueos-input").value = "";
    document.getElementById("actividades-input").value = "";
    document.getElementById("service-manager-input").value = "";
    document.getElementById("smartap-select").value = "0"; // Restablecer al valor por defecto
    document.getElementById("llamadas-a-input").value = "";
    document.getElementById("llamadas-b-input").value = "";
}


// Función para permitir saltos de línea con Enter en los campos de texto
function permitirSaltosDeLinea(id) {
    const inputElement = document.getElementById(id);

    inputElement.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita que se envíe el formulario o cambie de campo
            inputElement.value += "\n-"; // Agrega un salto de línea
        }
    });
}

// Aplicar la función a los campos de IMPORTANTE y PENDIENTES
permitirSaltosDeLinea("importante-select")
permitirSaltosDeLinea("pendientes-select")



