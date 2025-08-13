const ettercapModule = {
    html: `
        <h2>Ettercap - Generador de Comandos</h2>
        <p>Herramienta para ataques de hombre en el medio (MITM).</p>

        <label for="interface">Interfaz de Red (Obligatorio):</label>
        <input type="text" id="interface" placeholder="Ej: eth0, wlan0">

        <div class="checkbox-group">
            <h3>Modo de Operación</h3>
            <input type="radio" id="scanMode" name="opMode" value="scan" checked>
            <label for="scanMode">Modo de Escaneo de Hosts (-T -s)</label><br>

            <input type="radio" id="mitmMode" name="opMode" value="mitm">
            <label for="mitmMode">Ataque de envenenamiento de ARP (-T -q -i)</label><br>
        </div>

        <div id="mitmOptions" style="display: none;">
            <label for="target1">Target 1 (Host a atacar):</label>
            <input type="text" id="target1" placeholder="Ej: /192.168.1.10/">

            <label for="target2">Target 2 (Gateway):</label>
            <input type="text" id="target2" placeholder="Ej: /192.168.1.1/">
        </div>

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">ettercap</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const interfaceName = document.getElementById('interface').value.trim();
        const opMode = document.querySelector('input[name="opMode"]:checked').value;
        const target1 = document.getElementById('target1').value.trim();
        const target2 = document.getElementById('target2').value.trim();
        
        // Validación del campo obligatorio
        if (!interfaceName) {
            alert("La interfaz de red es un campo obligatorio.");
            return;
        }

        let command = `ettercap`;

        if (opMode === 'scan') {
            command += ` -T -s -i ${interfaceName}`;
        } else if (opMode === 'mitm') {
            if (!target1 || !target2) {
                alert("Para el ataque MITM, debes especificar ambos targets.");
                return;
            }
            command += ` -T -q -i ${interfaceName} -M arp:remote /${target1}// /${target2}//`;
        }

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.ettercap = ettercapModule;