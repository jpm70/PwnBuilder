const volatilityModule = {
    html: `
        <h2>Volatility - Generador de Comandos</h2>
        <p>Herramienta para analizar volcados de memoria RAM.</p>

        <div class="form-section">
            <h3>Análisis del Perfil</h3>
            <label for="memoryDump">Archivo de volcado de memoria (Obligatorio):</label>
            <input type="text" id="memoryDump" placeholder="Ej: memory.dmp">

            <button onclick="volatilityModule.generateProfileScan()">Obtener Perfiles (imageinfo)</button>
        </div>

        <div class="form-section">
            <h3>Plugins de Análisis</h3>
            <label for="profileName">Perfil del Sistema (Obligatorio):</label>
            <input type="text" id="profileName" placeholder="Ej: Win7SP1x64">

            <label for="pluginName">Plugin a Usar (Obligatorio):</label>
            <select id="pluginName">
                <option value="pslist">pslist (Listar procesos)</option>
                <option value="pstree">pstree (Árbol de procesos)</option>
                <option value="netscan">netscan (Conexiones de red)</option>
                <option value="hivelist">hivelist (Archivos del registro)</option>
                <option value="cmdscan">cmdscan (Historial de comandos)</option>
                <option value="hashdump">hashdump (Hashes de contraseñas)</option>
            </select>
            
            <button onclick="volatilityModule.generatePluginCommand()">Generar Comando de Plugin</button>
        </div>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">volatility</p>
        </div>
    `,
    
    // Funciones para generar los comandos
    generateProfileScan: () => {
        const memoryDump = document.getElementById('memoryDump').value.trim();

        if (!memoryDump) {
            alert("El archivo de volcado de memoria es obligatorio.");
            return;
        }

        const command = `volatility -f ${memoryDump} imageinfo`;
        document.getElementById('outputCommand').textContent = command;
    },

    generatePluginCommand: () => {
        const memoryDump = document.getElementById('memoryDump').value.trim();
        const profileName = document.getElementById('profileName').value.trim();
        const pluginName = document.getElementById('pluginName').value;

        if (!memoryDump || !profileName) {
            alert("El archivo de volcado de memoria y el perfil del sistema son obligatorios.");
            return;
        }

        const command = `volatility -f ${memoryDump} --profile=${profileName} ${pluginName}`;
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.volatility = volatilityModule;