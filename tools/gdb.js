const gdbModule = {
    html: `
        <h2>GDB - Generador de Comandos</h2>
        <p>Herramienta para depurar programas en tiempo de ejecución.</p>

        <label for="executableFile">Archivo Ejecutable (Obligatorio):</label>
        <input type="text" id="executableFile" placeholder="Ej: ./a.out">

        <label for="breakPoint">Punto de Interrupción (opcional):</label>
        <input type="text" id="breakPoint" placeholder="Ej: main, 0x401122">

        <div class="checkbox-group">
            <h3>Comandos de Ejecución</h3>
            <input type="checkbox" id="runCommand">
            <label for="runCommand">Ejecutar el programa (run)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">gdb</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const executableFile = document.getElementById('executableFile').value.trim();
        const breakPoint = document.getElementById('breakPoint').value.trim();
        const runCommand = document.getElementById('runCommand').checked;
        
        // Validación del campo obligatorio
        if (!executableFile) {
            alert("El archivo ejecutable es un campo obligatorio.");
            return;
        }

        let command = `gdb -q`; // -q para un modo silencioso

        // Agrega el archivo ejecutable
        command += ` ${executableFile}`;
        
        // Agrega el punto de interrupción y el comando 'run'
        if (breakPoint) {
            command += ` -ex "b ${breakPoint}"`;
        }

        if (runCommand) {
            command += ` -ex "run"`;
        }

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.gdb = gdbModule;