const msfconsoleModule = {
    html: `
        <h2>Msfconsole - Generador de Comandos</h2>
        <p>Genera comandos para el uso de exploits, payloads y módulos auxiliares en Metasploit.</p>

        <div class="form-section">
            <h3>Exploit y Payload</h3>
            <label for="exploitName">Exploit a Usar (Obligatorio):</label>
            <input type="text" id="exploitName" placeholder="Ej: exploit/multi/handler">
            
            <label for="payloadName">Payload a Usar (Obligatorio):</label>
            <input type="text" id="payloadName" placeholder="Ej: windows/meterpreter/reverse_tcp">

            <label for="lhost">LHOST (Obligatorio):</label>
            <input type="text" id="lhost" placeholder="Ej: 192.168.1.5">

            <label for="lport">LPORT (Obligatorio):</label>
            <input type="number" id="lport" placeholder="Ej: 4444">

            <label for="rhost">RHOST (opcional):</label>
            <input type="text" id="rhost" placeholder="Ej: 192.168.1.10">

            <label for="rport">RPORT (opcional):</label>
            <input type="number" id="rport" placeholder="Ej: 8080">

            <button onclick="msfconsoleModule.generateExploitCommand()">Generar Exploit</button>
        </div>

        <div class="form-section">
            <h3>Módulo Auxiliar</h3>
            <label for="auxiliaryName">Módulo Auxiliar a Usar (Obligatorio):</label>
            <input type="text" id="auxiliaryName" placeholder="Ej: auxiliary/scanner/smb/smb_login">
            
            <label for="auxRhosts">RHOSTS (Obligatorio):</label>
            <input type="text" id="auxRhosts" placeholder="Ej: 192.168.1.0/24">
            
            <button onclick="msfconsoleModule.generateAuxiliaryCommand()">Generar Auxiliar</button>
        </div>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">msfconsole</p>
        </div>
    `,
    
    // Funciones para generar los comandos
    generateExploitCommand: () => {
        const exploitName = document.getElementById('exploitName').value.trim();
        const payloadName = document.getElementById('payloadName').value.trim();
        const lhost = document.getElementById('lhost').value.trim();
        const lport = document.getElementById('lport').value.trim();
        const rhost = document.getElementById('rhost').value.trim();
        const rport = document.getElementById('rport').value.trim();
        
        if (!exploitName || !payloadName || !lhost || !lport) {
            alert("Los campos de exploit, payload, LHOST y LPORT son obligatorios.");
            return;
        }

        let command = `msfconsole -x "use ${exploitName}; set payload ${payloadName}; set LHOST ${lhost}; set LPORT ${lport};`;
        if (rhost) command += ` set RHOSTS ${rhost};`;
        if (rport) command += ` set RPORT ${rport};`;
        command += ` exploit"`;
        
        document.getElementById('outputCommand').textContent = command;
    },

    generateAuxiliaryCommand: () => {
        const auxiliaryName = document.getElementById('auxiliaryName').value.trim();
        const auxRhosts = document.getElementById('auxRhosts').value.trim();

        if (!auxiliaryName || !auxRhosts) {
            alert("El nombre del módulo auxiliar y RHOSTS son obligatorios.");
            return;
        }

        const command = `msfconsole -x "use ${auxiliaryName}; set RHOSTS ${auxRhosts}; run"`;
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.msfconsole = msfconsoleModule;