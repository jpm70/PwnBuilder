const airodumpNgModule = {
    html: `
        <h2>Airodump-ng - Generador de Comandos</h2>
        <p>Captura de paquetes de red inalámbrica para auditorías de seguridad.</p>

        <label for="interface">Interfaz de Red en modo monitor (Obligatorio):</label>
        <input type="text" id="interface" placeholder="Ej: wlan0mon">

        <label for="channel">Canal a escanear (-c, opcional):</label>
        <input type="number" id="channel" placeholder="Ej: 6">

        <label for="bssid">Filtrar por BSSID (--bssid, opcional):</label>
        <input type="text" id="bssid" placeholder="Ej: 00:11:22:33:44:55">

        <label for="outputFile">Archivo de Salida (-w, opcional):</label>
        <input type="text" id="outputFile" placeholder="Ej: captura-wifi">

        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="showClients">
            <label for="showClients">Mostrar solo clientes conectados (-a)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">airodump-ng</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const interfaceName = document.getElementById('interface').value.trim();
        const channel = document.getElementById('channel').value.trim();
        const bssid = document.getElementById('bssid').value.trim();
        const outputFile = document.getElementById('outputFile').value.trim();
        const showClients = document.getElementById('showClients').checked;

        // Validación del campo obligatorio
        if (!interfaceName) {
            alert("La interfaz de red en modo monitor es un campo obligatorio.");
            return;
        }

        let command = `airodump-ng ${interfaceName}`;

        // Agregar las opciones
        if (channel) command += ` -c ${channel}`;
        if (bssid) command += ` --bssid ${bssid}`;
        if (outputFile) command += ` -w ${outputFile}`;
        if (showClients) command += ` -a`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.airodumpng = airodumpNgModule;