const crunchModule = {
    html: `
        <h2>Crunch - Generador de Comandos</h2>
        <p>Generador de listas de palabras personalizadas.</p>

        <label for="minLength">Longitud Mínima (Obligatorio):</label>
        <input type="number" id="minLength" placeholder="Ej: 8" min="1">

        <label for="maxLength">Longitud Máxima (Obligatorio):</label>
        <input type="number" id="maxLength" placeholder="Ej: 8" min="1">

        <label for="charList">Conjunto de Caracteres (opcional):</label>
        <input type="text" id="charList" placeholder="Ej: abcde12345!@#">

        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <label for="outputFile">Archivo de Salida (-o, opcional):</label>
            <input type="text" id="outputFile" placeholder="Ej: custom_wordlist.txt">
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">crunch</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const minLength = document.getElementById('minLength').value.trim();
        const maxLength = document.getElementById('maxLength').value.trim();
        const charList = document.getElementById('charList').value.trim();
        const outputFile = document.getElementById('outputFile').value.trim();

        // Validación de campos obligatorios
        if (!minLength || !maxLength) {
            alert("La longitud mínima y máxima son campos obligatorios.");
            return;
        }

        let command = `crunch ${minLength} ${maxLength}`;

        // Agregar la lista de caracteres si se especifica
        if (charList) command += ` "${charList}"`;

        // Agregar el archivo de salida
        if (outputFile) command += ` -o ${outputFile}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.crunch = crunchModule;