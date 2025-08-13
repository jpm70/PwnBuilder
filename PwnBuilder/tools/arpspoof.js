const arpspoofModule = {
    html: `
        <h2>Arpspoof - Generador de Comandos</h2>
        <p>Realiza suplantación de ARP para redirigir el tráfico de red.</p>

        <label for="interface">Interfaz de Red (Obligatorio):</label>
        <input type="text" id="interface" placeholder="Ej: eth0, wlan0">

        <label for="targetHost">IP del Host a Atacar (Obligatorio):</label>
        <input type="text" id="targetHost" placeholder="Ej: 192.168.1.100">

        <label for="gateway">IP de la Puerta de Enlace (Obligatorio):</label>
        <input type="text" id="gateway" placeholder="Ej: 192.168.1.1">

        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-v)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">arpspoof</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const interfaceName = document.getElementById('interface').value.trim();
        const targetHost = document.getElementById('targetHost').value.trim();
        const gateway = document.getElementById('gateway').value.trim();
        const verboseOutput = document.getElementById('verboseOutput').checked;
        
        // Validación de campos obligatorios
        if (!interfaceName || !targetHost || !gateway) {
            alert("La interfaz de red, el host a atacar y la puerta de enlace son campos obligatorios.");
            return;
        }

        let command = `arpspoof -i ${interfaceName}`;

        // Agrega las opciones de suplantación
        command += ` -t ${targetHost} ${gateway}`;

        // Agregar las opciones adicionales
        if (verboseOutput) command += ` -v`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.arpspoof = arpspoofModule;