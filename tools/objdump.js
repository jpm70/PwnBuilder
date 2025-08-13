const objdumpModule = {
    html: `
        <h2>Objdump - Generador de Comandos</h2>
        <p>Muestra información de archivos objeto o binarios.</p>

        <label for="binaryFile">Archivo Binario (Obligatorio):</label>
        <input type="text" id="binaryFile" placeholder="Ej: /usr/bin/ls">
        
        <div class="checkbox-group">
            <h3>Modos de Operación</h3>
            <input type="radio" id="disassembleAll" name="opMode" value="disassemble" checked>
            <label for="disassembleAll">Desensamblar todo (-d)</label><br>

            <input type="radio" id="showHeaders" name="opMode" value="headers">
            <label for="showHeaders">Mostrar cabeceras de secciones (-h)</label><br>

            <input type="radio" id="showSymbols" name="opMode" value="symbols">
            <label for="showSymbols">Mostrar símbolos (-t)</label><br>
        </div>

        <div class="checkbox-group">
            <h3>Opciones de Arquitectura</h3>
            <input type="checkbox" id="demangle">
            <label for="demangle">Demangle (desofuscar nombres de C++) (-C)</label><br>

            <label for="architecture">Arquitectura (--arch, opcional):</label>
            <input type="text" id="architecture" placeholder="Ej: i386, x86-64">
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">objdump</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const binaryFile = document.getElementById('binaryFile').value.trim();
        const opMode = document.querySelector('input[name="opMode"]:checked').value;
        const demangle = document.getElementById('demangle').checked;
        const architecture = document.getElementById('architecture').value.trim();
        
        // Validación del campo obligatorio
        if (!binaryFile) {
            alert("El archivo binario es un campo obligatorio.");
            return;
        }

        let command = `objdump`;

        // Agregar la opción de modo de operación
        if (opMode === 'disassemble') command += ` -d`;
        if (opMode === 'headers') command += ` -h`;
        if (opMode === 'symbols') command += ` -t`;
        
        // Agregar las opciones adicionales
        if (demangle) command += ` -C`;
        if (architecture) command += ` --arch=${architecture}`;

        // Agregar el archivo binario al final
        command += ` ${binaryFile}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.objdump = objdumpModule;