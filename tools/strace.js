const straceModule = {
    html: `
        <h2>Strace - Generador de Comandos</h2>
        <p>Traza las llamadas al sistema y las señales de un proceso.</p>

        <div class="form-section">
            <h3>Trazar un Nuevo Proceso</h3>
            <label for="commandToTrace">Comando a Trazar (Obligatorio):</label>
            <input type="text" id="commandToTrace" placeholder="Ej: ls -l /tmp">
            <button onclick="straceModule.generateTraceCommand()">Generar Comando</button>
        </div>

        <div class="form-section">
            <h3>Opciones de Salida</h3>
            <label for="outputFile">Archivo de Salida (-o, opcional):</label>
            <input type="text" id="outputFile" placeholder="Ej: strace_output.txt">
            <label for="timeOutput">Formato de tiempo (-t, opcional):</label>
            <input type="checkbox" id="timeOutput">
            <label for="timeOutput">Incluir tiempo en cada llamada</label>
            
        </div>
        
        <div class="form-section">
            <h3>Filtros</h3>
            <label for="syscallsFilter">Filtrar llamadas al sistema (-e, opcional):</label>
            <input type="text" id="syscallsFilter" placeholder="Ej: open,close,read,write">
        </div>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">strace</p>
        </div>
    `,
    
    // Funciones para generar los comandos
    generateTraceCommand: () => {
        const commandToTrace = document.getElementById('commandToTrace').value.trim();
        const outputFile = document.getElementById('outputFile').value.trim();
        const timeOutput = document.getElementById('timeOutput').checked;
        const syscallsFilter = document.getElementById('syscallsFilter').value.trim();

        if (!commandToTrace) {
            alert("El comando a trazar es obligatorio.");
            return;
        }

        let command = `strace`;

        if (outputFile) command += ` -o ${outputFile}`;
        if (timeOutput) command += ` -t`;
        if (syscallsFilter) command += ` -e trace=${syscallsFilter}`;

        command += ` ${commandToTrace}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.strace = straceModule;