const tsharkModule = {
    html: `
        <h2>TShark - Generador de Comandos</h2>
        <p>Captura y analiza tráfico de red desde la línea de comandos.</p>

        <label for="interface">Interfaz de Red (-i, opcional):</label>
        <input type="text" id="interface" placeholder="Ej: eth0, wlan0">

        <label for="filter">Filtro de Captura (opcional):</label>
        <input type="text" id="filter" placeholder="Ej: host 192.168.1.10 and port 80">

        <div class="checkbox-group">
            <h3>Opciones de Salida</h3>
            <label for="count">Número de Paquetes a Capturar (-c, opcional):</label>
            <input type="number" id="count" placeholder="Ej: 100">
            
            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-V)</label><br>
            
            <input type="checkbox" id="noResolve">
            <label for="noResolve">No resolver nombres de host (-n)</label><br>

            <input type="checkbox" id="noPortResolve">
            <label for="noPortResolve">No resolver puertos (-N)</label><br>
            
            <input type="checkbox" id="listInterfaces">
            <label for="listInterfaces">Listar interfaces de red (-D)</label><br>
        </div>

        <label for="outputFile">Archivo de Salida (-w, opcional):</label>
        <input type="text" id="outputFile" placeholder="Ej: captura.pcapng">
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">tshark</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const interfaceName = document.getElementById('interface').value.trim();
        const filter = document.getElementById('filter').value.trim();
        const count = document.getElementById('count').value.trim();
        const verboseOutput = document.getElementById('verboseOutput').checked;
        const noResolve = document.getElementById('noResolve').checked;
        const noPortResolve = document.getElementById('noPortResolve').checked;
        const listInterfaces = document.getElementById('listInterfaces').checked;
        const outputFile = document.getElementById('outputFile').value.trim();

        let command = "tshark";
        
        // Manejar caso especial de la opción -D
        if (listInterfaces) {
            document.getElementById('outputCommand').textContent = "tshark -D";
            return;
        }

        // Agregar opciones
        if (interfaceName) command += ` -i ${interfaceName}`;
        if (count) command += ` -c ${count}`;
        if (verboseOutput) command += ` -V`;
        if (noResolve) command += ` -n`;
        if (noPortResolve) command += ` -N`;
        if (outputFile) command += ` -w ${outputFile}`;
        
        // Agregar el filtro al final
        if (filter) {
            command += ` "${filter}"`;
        }

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.tshark = tsharkModule;