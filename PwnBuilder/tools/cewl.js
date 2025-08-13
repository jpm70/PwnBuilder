const cewlModule = {
    html: `
        <h2>CeWL - Generador de Comandos</h2>
        <p>Extrae una lista de palabras de una URL, ideal para ataques de fuerza bruta.</p>

        <label for="targetUrl">URL de Destino (Obligatorio):</label>
        <input type="text" id="targetUrl" placeholder="Ej: http://ejemplo.com">
        
        <label for="depth">Profundidad del Escaneo (-d, opcional):</label>
        <input type="number" id="depth" value="2" min="1">
        
        <label for="minLength">Longitud Mínima de la Palabra (-m, opcional):</label>
        <input type="number" id="minLength" value="3" min="1">
        
        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="emailHarvest">
            <label for="emailHarvest">Recopilar Direcciones de Correo (-e)</label><br>

            <input type="checkbox" id="withNumbers">
            <label for="withNumbers">Incluir Números en las Palabras (-n)</label><br>
        </div>

        <label for="outputFile">Archivo de Salida (-w, opcional):</label>
        <input type="text" id="outputFile" placeholder="Ej: wordlist.txt">
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">cewl</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const targetUrl = document.getElementById('targetUrl').value.trim();
        const depth = document.getElementById('depth').value.trim();
        const minLength = document.getElementById('minLength').value.trim();
        const emailHarvest = document.getElementById('emailHarvest').checked;
        const withNumbers = document.getElementById('withNumbers').checked;
        const outputFile = document.getElementById('outputFile').value.trim();

        // Validación del campo obligatorio
        if (!targetUrl) {
            alert("La URL de destino es un campo obligatorio.");
            return;
        }

        let command = `cewl ${targetUrl}`;

        // Agregar las opciones
        if (depth) command += ` -d ${depth}`;
        if (minLength) command += ` -m ${minLength}`;
        if (emailHarvest) command += ` -e`;
        if (withNumbers) command += ` -n`;
        if (outputFile) command += ` -w ${outputFile}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.cewl = cewlModule;