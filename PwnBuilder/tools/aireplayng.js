const aireplayNgModule = {
    html: `
        <h2>Aireplay-ng - Generador de Comandos</h2>
        <p>Herramienta para inyección y ataque de paquetes de redes inalámbricas.</p>

        <label for="interface">Interfaz de Red en modo monitor (Obligatorio):</label>
        <input type="text" id="interface" placeholder="Ej: wlan0mon">
        
        <div class="checkbox-group">
            <h3>Tipo de Ataque</h3>
            <input type="radio" id="deauthAttack" name="attackType" value="deauth" checked>
            <label for="deauthAttack">Ataque de Desautenticación (-0)</label><br>

            <input type="radio" id="arpAttack" name="attackType" value="arp">
            <label for="arpAttack">Ataque de Inyección ARP (-3)</label><br>
        </div>

        <div id="deauthOptions">
            <label for="deauthCount">Número de paquetes de desautenticación (opcional):</label>
            <input type="number" id="deauthCount" value="0" placeholder="0 para ilimitado">
        </div>

        <label for="bssid">BSSID del Punto de Acceso (Obligatorio):</label>
        <input type="text" id="bssid" placeholder="Ej: 00:11:22:33:44:55">

        <label for="clientMac">MAC del Cliente (opcional, para desautenticación específica):</label>
        <input type="text" id="clientMac" placeholder="Ej: AA:BB:CC:DD:EE:FF">
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">aireplay-ng</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const interfaceName = document.getElementById('interface').value.trim();
        const attackType = document.querySelector('input[name="attackType"]:checked').value;
        const deauthCount = document.getElementById('deauthCount').value.trim();
        const bssid = document.getElementById('bssid').value.trim();
        const clientMac = document.getElementById('clientMac').value.trim();

        // Validación de campos obligatorios
        if (!interfaceName || !bssid) {
            alert("La interfaz de red y el BSSID del punto de acceso son campos obligatorios.");
            return;
        }

        let command = `aireplay-ng`;

        if (attackType === 'deauth') {
            command += ` -0`;
            if (deauthCount && deauthCount !== '0') {
                command += ` ${deauthCount}`;
            } else {
                command += ` 0`; // '0' significa ilimitado
            }
            command += ` -a ${bssid}`;
            if (clientMac) {
                command += ` -c ${clientMac}`;
            }
        } else if (attackType === 'arp') {
            command += ` -3 -b ${bssid}`;
        }
        
        command += ` ${interfaceName}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.aireplayng = aireplayNgModule;