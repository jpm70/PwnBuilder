// El objeto global donde cada herramienta se registrará a sí misma
const toolForms = {};

// Esta función carga el formulario de la herramienta seleccionada
function loadToolForm() {
    const selector = document.getElementById('toolSelector');
    const toolName = selector.value;
    const container = document.getElementById('toolFormContainer');

    container.innerHTML = '';

    if (toolName && toolForms[toolName]) {
        // Inyecta el HTML del formulario
        container.innerHTML = toolForms[toolName].html;
        
        // Asocia la función de generación de comando al botón
        if (toolForms[toolName].generateCommand) {
            window.generateCommand = toolForms[toolName].generateCommand;
            const button = container.querySelector('button');
            if (button) {
                button.onclick = window.generateCommand;
            }
        }
    }
}