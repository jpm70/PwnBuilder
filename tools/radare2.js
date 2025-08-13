const radare2Module = {
    html: `
        <h2>Radare2 - Generador de Comandos</h2>
        <p>Genera comandos para el framework de ingeniería inversa Radare2.</p>

        <label for="binaryFile">Archivo Binario (Obligatorio):</label>
        <input type="text" id="binaryFile" placeholder="Ej: /usr/bin/ls">
        
        <div class="checkbox-group">
            <h3>Comandos de Análisis</h3>
            <input type="checkbox" id="analyzeAll">
            <label for="analyzeAll">Analizar todo (aa)</label><br>

            <input type="checkbox" id="analyzeStrings">
            <label for="analyzeStrings">Analizar strings (aast)</label><br>
        </div>

        <div class="checkbox-group">
            <h3>Visualización</h3>
            <input type="checkbox" id="visualMode">
            <label for="visualMode">Modo visual (V)</label><br>
        </div>
        
        <label for="seekAddress">Dirección o Función a Analizar (opcional):</label>
        <input type="text" id="seekAddress" placeholder="Ej: main, 0x401122">

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">radare2</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const binaryFile = document.getElementById('binaryFile').value.trim();
        const analyzeAll = document.getElementById('analyzeAll').checked;
        const analyzeStrings = document.getElementById('analyzeStrings').checked;
        const visualMode = document.getElementById('visualMode').checked;
        const seekAddress = document.getElementById('seekAddress').value.trim();
        
        // Validación del campo obligatorio
        if (!binaryFile) {
            alert("El archivo binario es un campo obligatorio.");
            return;
        }

        let command = `r2 ${binaryFile}`;

        // Construir el script para ejecutar comandos dentro de r2
        let r2Commands = [];
        if (analyzeAll) r2Commands.push('aa');
        if (analyzeStrings) r2Commands.push('aast');
        if (seekAddress) r2Commands.push(`s ${seekAddress}`);
        if (visualMode) r2Commands.push('V');
        
        if (r2Commands.length > 0) {
            command += ` -c "${r2Commands.join(';')}"`;
        }
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.radare2 = radare2Module;