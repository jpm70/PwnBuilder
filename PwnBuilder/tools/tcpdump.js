const tcpdumpModule = {
    html: `
        <h2>tcpdump - Generador de Comandos</h2>
        <p>Analizador de paquetes de red que imprime descripciones de los paquetes en la línea de comandos.</p>

        <label for="interface">Interfaz de Red (-i, opcional):</label>
        <input type="text" id="interface" placeholder="Ej: eth0, wlan0">

        <label for="hostFilter">Filtro por Host (opcional):</label>
        <input type="text" id="hostFilter" placeholder="Ej: 192.168.1.10">

        <label for="portFilter">Filtro por Puerto (opcional):</label>
        <input type="number" id="portFilter" placeholder="Ej: 80, 443">

        <div class="checkbox-group">
            <h3>Opciones de Filtro Adicionales</h3>
            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-v)</label><br>

            <input type="checkbox" id="veryVerboseOutput">
            <label for="veryVerboseOutput">Modo Muy Verbose (-vv)</label><br>
            
            <input type="checkbox" id="noResolve">
            <label for="noResolve">No resolver nombres de host (-n)</label><br>
            
            <input type="checkbox" id="noPortResolve">
            <label for="noPortResolve">No resolver puertos (-nn)</label><br>
            
            <label for="count">Número de Paquetes a Capturar (-c, opcional):</label>
            <input type="number" id="count" placeholder="Ej: 10">
        </div>

        <label for="protocolFilter">Filtro por Protocolo (opcional):</label>
        <input type="text" id="protocolFilter" placeholder="Ej: tcp, udp, icmp">

        <label for="outputFile">Archivo de Salida (-w, opcional):</label>
        <input type="text" id="outputFile" placeholder="Ej: captura.pcap">
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">tcpdump</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const interfaceName = document.getElementById('interface').value.trim();
        const hostFilter = document.getElementById('hostFilter').value.trim();
        const portFilter = document.getElementById('portFilter').value.trim();
        const verboseOutput = document.getElementById('verboseOutput').checked;
        const veryVerboseOutput = document.getElementById('veryVerboseOutput').checked;
        const noResolve = document.getElementById('noResolve').checked;
        const noPortResolve = document.getElementById('noPortResolve').checked;
        const count = document.getElementById('count').value.trim();
        const protocolFilter = document.getElementById('protocolFilter').value.trim();
        const outputFile = document.getElementById('outputFile').value.trim();

        let command = "tcpdump";

        // Agregar las opciones
        if (interfaceName) command += ` -i ${interfaceName}`;
        if (count) command += ` -c ${count}`;
        if (verboseOutput) command += ` -v`;
        if (veryVerboseOutput) command += ` -vv`;
        if (noResolve) command += ` -n`;
        if (noPortResolve) command += ` -nn`;
        if (outputFile) command += ` -w ${outputFile}`;
        
        // Agregar los filtros
        let filters = [];
        if (protocolFilter) filters.push(protocolFilter);
        if (hostFilter) filters.push(`host ${hostFilter}`);
        if (portFilter) filters.push(`port ${portFilter}`);

        if (filters.length > 0) {
            command += ` ${filters.join(' and ')}`;
        }

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.tcpdump = tcpdumpModule;