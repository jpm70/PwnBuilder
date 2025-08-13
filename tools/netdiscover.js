const netdiscoverModule = {
    html: `
        <h2>Netdiscover - Generador de Comandos</h2>
        <p>Herramienta para el descubrimiento de hosts activos en redes inalámbricas o cableadas.</p>

        <label for="interface">Interfaz de Red (Obligatorio):</label>
        <input type="text" id="interface" placeholder="Ej: eth0, wlan0">

        <label for="range">Rango de la Red (-r, opcional):</label>
        <input type="text" id="range" placeholder="Ej: 192.168.1.0/24">

        <div class="checkbox-group">
            <h3>Modo de Escaneo</h3>
            <input type="radio" id="passiveScan" name="scanMode" value="passive" checked>
            <label for="passiveScan">Escaneo Pasivo (-p)</label><br>

            <input type="radio" id="activeScan" name="scanMode" value="active">
            <label for="activeScan">Escaneo Activo</label><br>
        </div>

        <div class="checkbox-group">
            <h3>Otras Opciones</h3>
            <input type="checkbox" id="fastScan">
            <label for="fastScan">Escaneo Rápido (-f)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">netdiscover</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const interfaceName = document.getElementById('interface').value.trim();
        const range = document.getElementById('range').value.trim();
        const scanMode = document.querySelector('input[name="scanMode"]:checked').value;
        const fastScan = document.getElementById('fastScan').checked;

        // Validación del campo obligatorio
        if (!interfaceName) {
            alert("La interfaz de red es un campo obligatorio.");
            return;
        }

        let command = `netdiscover -i ${interfaceName}`;

        // Agregar las opciones
        if (range) command += ` -r ${range}`;
        if (scanMode === 'passive') command += ` -p`;
        if (fastScan) command += ` -f`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.netdiscover = netdiscoverModule;