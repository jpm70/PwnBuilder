const stringsModule = {
    html: `
        <h2>Strings - Generador de Comandos</h2>
        <p>Extrae cadenas de caracteres imprimibles de archivos binarios.</p>

        <div class="form-section">
            <h3>Opciones Básicas</h3>
            <label for="inputFile">Archivo de Entrada (Obligatorio):</label>
            <input type="text" id="inputFile" placeholder="Ej: /usr/bin/ls">
            <button onclick="stringsModule.generateBasicCommand()">Generar Comando Básico</button>
        </div>

        <div class="form-section">
            <h3>Opciones Adicionales</h3>
            <label for="minLength">Longitud Mínima de la Cadena (-n, opcional):</label>
            <input type="number" id="minLength" value="4" min="1">

            <label for="offset">Desplazamiento (-o, opcional):</label>
            <input type="number" id="offset" placeholder="Ej: 16">

            <label for="outputFile">Archivo de Salida (-t, opcional):</label>
            <input type="text" id="outputFile" placeholder="Ej: strings_results.txt">

            <button onclick="stringsModule.generateAdvancedCommand()">Generar Comando Avanzado</button>
        </div>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">strings</p>
        </div>
    `,
    
    generateBasicCommand: () => {
        const inputFile = document.getElementById('inputFile').value.trim();

        if (!inputFile) {
            alert("El archivo de entrada es obligatorio.");
            return;
        }

        const command = `strings ${inputFile}`;
        document.getElementById('outputCommand').textContent = command;
    },

    generateAdvancedCommand: () => {
        const inputFile = document.getElementById('inputFile').value.trim();
        const minLength = document.getElementById('minLength').value.trim();
        const offset = document.getElementById('offset').value.trim();
        const outputFile = document.getElementById('outputFile').value.trim();

        if (!inputFile) {
            alert("El archivo de entrada es obligatorio.");
            return;
        }

        let command = `strings`;

        if (minLength) command += ` -n ${minLength}`;
        if (offset) command += ` -o ${offset}`;
        if (outputFile) command += ` > ${outputFile}`;
        
        command += ` ${inputFile}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.strings = stringsModule;