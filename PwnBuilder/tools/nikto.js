const niktoModule = {
    html: `
        <h2>Nikto - Generador de Comandos</h2>
        <p>Escáner de vulnerabilidades de servidores web de código abierto.</p>

        <label for="ipTarget">Dirección IP o Dominio de Destino (Obligatorio):</label>
        <input type="text" id="ipTarget" placeholder="Ej: 192.168.1.1 o ejemplo.com">

        <div class="checkbox-group">
            <h3>Opciones de Escaneo</h3>
            <label for="port">Puerto (opcional):</label>
            <input type="number" id="port" placeholder="Ej: 8080">
            
            <input type="checkbox" id="sslScan">
            <label for="sslScan">Escaneo SSL (-ssl)</label><br>
            
            <input type="checkbox" id="verbose">
            <label for="verbose">Modo Verbose (-v)</label><br>

            <label for="proxy">Proxy (opcional):</label>
            <input type="text" id="proxy" placeholder="Ej: http://127.0.0.1:8080">

            <label for="tuning">Ajustes de Escaneo (-T, opcional):</label>
            <input type="text" id="tuning" placeholder="Ej: 1,2,5">

            <label for="outputFile">Archivo de Salida (-o, opcional):</label>
            <input type="text" id="outputFile" placeholder="Ej: nikto_results.html">
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">nikto</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const ipTarget = document.getElementById('ipTarget').value.trim();
        const port = document.getElementById('port').value.trim();
        const sslScan = document.getElementById('sslScan').checked;
        const verbose = document.getElementById('verbose').checked;
        const proxy = document.getElementById('proxy').value.trim();
        const tuning = document.getElementById('tuning').value.trim();
        const outputFile = document.getElementById('outputFile').value.trim();

        // Validación del campo obligatorio
        if (!ipTarget) {
            alert("La dirección IP o dominio de destino es un campo obligatorio.");
            return;
        }
        
        let command = "nikto";

        // Agregar las opciones
        command += ` -h ${ipTarget}`;
        
        if (port) command += ` -p ${port}`;
        if (sslScan) command += ` -ssl`;
        if (verbose) command += ` -v`;
        if (proxy) command += ` -useproxy ${proxy}`;
        if (tuning) command += ` -T ${tuning}`;
        if (outputFile) command += ` -o ${outputFile}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.nikto = niktoModule;