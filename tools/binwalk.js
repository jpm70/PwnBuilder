const binwalkModule = {
    html: `
        <h2>Binwalk - Generador de Comandos</h2>
        <p>Herramienta para analizar y extraer archivos de imágenes de firmware.</p>

        <label for="firmwareFile">Archivo de Firmware (Obligatorio):</label>
        <input type="text" id="firmwareFile" placeholder="Ej: firmware.bin">
        
        <div class="checkbox-group">
            <h3>Modos de Operación</h3>
            <input type="radio" id="defaultScan" name="opMode" value="default" checked>
            <label for="defaultScan">Escaneo por Defecto</label><br>

            <input type="radio" id="extractFiles" name="opMode" value="extract">
            <label for="extractFiles">Extraer Archivos (-e)</label><br>
        </div>

        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-v)</label><br>

            <input type="checkbox" id="fileSignature">
            <label for="fileSignature">Mostrar firmas de archivos (-B)</label><br>
            
            <input type="checkbox" id="entropyScan">
            <label for="entropyScan">Escaneo de entropía (-E)</label><br>

            <label for="threadCount">Número de Hilos (-j, opcional):</label>
            <input type="number" id="threadCount" placeholder="Ej: 4">
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">binwalk</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const firmwareFile = document.getElementById('firmwareFile').value.trim();
        const opMode = document.querySelector('input[name="opMode"]:checked').value;
        const verboseOutput = document.getElementById('verboseOutput').checked;
        const fileSignature = document.getElementById('fileSignature').checked;
        const entropyScan = document.getElementById('entropyScan').checked;
        const threadCount = document.getElementById('threadCount').value.trim();

        // Validación del campo obligatorio
        if (!firmwareFile) {
            alert("El archivo de firmware es un campo obligatorio.");
            return;
        }

        let command = `binwalk`;

        if (opMode === 'extract') command += ` -e`;
        if (verboseOutput) command += ` -v`;
        if (fileSignature) command += ` -B`;
        if (entropyScan) command += ` -E`;
        if (threadCount) command += ` -j ${threadCount}`;

        command += ` ${firmwareFile}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.binwalk = binwalkModule;