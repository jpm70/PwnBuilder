const netcatModule = {
    html: `
        <h2>Netcat (nc) - Generador de Comandos</h2>
        <p>Herramienta para leer y escribir datos a través de conexiones de red.</p>

        <label for="ipTarget">Dirección IP de Destino (Obligatorio):</label>
        <input type="text" id="ipTarget" placeholder="Ej: 192.168.1.100">

        <label for="port">Puerto (Obligatorio):</label>
        <input type="number" id="port" placeholder="Ej: 4444">

        <div class="checkbox-group">
            <h3>Modo de Operación</h3>
            <input type="radio" id="clientMode" name="mode" value="client" checked>
            <label for="clientMode">Modo Cliente (Establecer una conexión)</label><br>

            <input type="radio" id="listenMode" name="mode" value="listen">
            <label for="listenMode">Modo Servidor (Ponerse a la escucha)</label><br>
        </div>
        
        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="verbose">
            <label for="verbose">Modo Verbose (-v)</label><br>
            
            <input type="checkbox" id="keepOpen">
            <label for="keepOpen">Mantener la conexión abierta (-k)</label><br>
            
            <input type="checkbox" id="zeroIo">
            <label for="zeroIo">Escaneo de puertos sin enviar datos (-z)</label><br>
            
            <label for="shell">Ejecutar Shell (-e):</label>
            <input type="text" id="shell" placeholder="Ej: /bin/sh">
        </div>

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">nc</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const ipTarget = document.getElementById('ipTarget').value.trim();
        const port = document.getElementById('port').value.trim();
        const clientMode = document.getElementById('clientMode').checked;
        const listenMode = document.getElementById('listenMode').checked;
        const verbose = document.getElementById('verbose').checked;
        const keepOpen = document.getElementById('keepOpen').checked;
        const zeroIo = document.getElementById('zeroIo').checked;
        const shell = document.getElementById('shell').value.trim();

        // Validación del campo obligatorio
        if (!ipTarget || !port) {
            alert("La dirección IP y el puerto son campos obligatorios.");
            return;
        }
        
        let command = "nc";

        // Agregar opciones
        if (verbose) command += ` -v`;
        if (keepOpen) command += ` -k`;
        if (zeroIo) command += ` -z`;
        if (shell) command += ` -e ${shell}`;

        // Agregar el modo de operación
        if (listenMode) {
            command += ` -l -p ${port}`;
        } else { // Modo cliente
            command += ` ${ipTarget} ${port}`;
        }
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.netcat = netcatModule;