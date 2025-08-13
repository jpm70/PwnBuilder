const wpscanModule = {
    html: `
        <h2>WPScan - Generador de Comandos</h2>
        <p>Escáner de vulnerabilidades de seguridad de WordPress.</p>

        <label for="targetUrl">URL del Sitio (Obligatorio):</label>
        <input type="text" id="targetUrl" placeholder="Ej: http://ejemplo.com">

        <div class="checkbox-group">
            <h3>Opciones de Escaneo</h3>
            <input type="checkbox" id="enumeratePlugins">
            <label for="enumeratePlugins">Enumerar Plugins (--enumerate p)</label><br>

            <input type="checkbox" id="enumerateThemes">
            <label for="enumerateThemes">Enumerar Temas (--enumerate t)</label><br>

            <input type="checkbox" id="enumerateUsers">
            <label for="enumerateUsers">Enumerar Usuarios (--enumerate u)</label><br>

            <input type="checkbox" id="updateDatabase">
            <label for="updateDatabase">Actualizar Base de Datos de Vulnerabilidades (--update)</label><br>

            <input type="checkbox" id="forceScan">
            <label for="forceScan">Forzar el Escaneo (--force)</label><br>
        </div>

        <label for="proxy">Proxy (opcional):</label>
        <input type="text" id="proxy" placeholder="Ej: socks5://127.0.0.1:9050">
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">wpscan</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const targetUrl = document.getElementById('targetUrl').value.trim();
        const enumeratePlugins = document.getElementById('enumeratePlugins').checked;
        const enumerateThemes = document.getElementById('enumerateThemes').checked;
        const enumerateUsers = document.getElementById('enumerateUsers').checked;
        const updateDatabase = document.getElementById('updateDatabase').checked;
        const forceScan = document.getElementById('forceScan').checked;
        const proxy = document.getElementById('proxy').value.trim();

        // Validación del campo obligatorio
        if (!targetUrl) {
            alert("La URL del sitio es un campo obligatorio.");
            return;
        }

        let command = `wpscan --url ${targetUrl}`;

        // Agregar las opciones de escaneo
        let enumerateOptions = [];
        if (enumeratePlugins) enumerateOptions.push('p');
        if (enumerateThemes) enumerateOptions.push('t');
        if (enumerateUsers) enumerateOptions.push('u');
        
        if (enumerateOptions.length > 0) {
            command += ` --enumerate ${enumerateOptions.join(',')}`;
        }
        
        // Agregar otras opciones
        if (updateDatabase) command += ` --update`;
        if (forceScan) command += ` --force`;
        if (proxy) command += ` --proxy ${proxy}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.wpscan = wpscanModule;