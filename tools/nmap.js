const nmapModule = {
    html: `
        <h2>Nmap - Generador de Comandos Avanzado</h2>
        <p>Construye tu comando de escaneo de Nmap con una amplia gama de opciones.</p>

        <label for="ipTarget">Dirección IP o Rango (Obligatorio):</label>
        <input type="text" id="ipTarget" placeholder="Ej: 192.168.1.1 o 192.168.1.0/24">

        <label for="ports">Puertos (Opcional):</label>
        <input type="text" id="ports" placeholder="Ej: 80,443,22-100">

        <div class="checkbox-group">
            <h3>Opciones de Escaneo</h3>
            <input type="checkbox" id="synScan">
            <label for="synScan">Escaneo SYN (-sS)</label><br>
            <input type="checkbox" id="versionDetection">
            <label for="versionDetection">Detección de Versión (-sV)</label><br>
            <input type="checkbox" id="osDetection">
            <label for="osDetection">Detección de Sistema Operativo (-O)</label><br>
            <input type="checkbox" id="aggressiveScan">
            <label for="aggressiveScan">Escaneo Agresivo (-A)</label><br>
            <input type="checkbox" id="scanServiceAndOS">
            <label for="scanServiceAndOS">Escaneo de Servicios y SO (-sC -sV)</label><br>
        </div>

        <div class="checkbox-group">
            <h3>Otras Opciones Útiles</h3>
            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-v)</label><br>
            <input type="checkbox" id="quietOutput">
            <label for="quietOutput">Modo Silencioso (-q)</label><br>
            <input type="checkbox" id="disablePing">
            <label for="disablePing">No hacer ping (-Pn)</label><br>
            <input type="checkbox" id="fastScan">
            <label for="fastScan">Escaneo rápido (-F)</label><br>
        </div>

        <label for="minRate">Tasa Mínima de Paquetes (opcional, en pps):</label>
        <input type="number" id="minRate" placeholder="Ej: 1000">

        <label for="timeout">Tiempo de Espera de Conexión (en ms):</label>
        <input type="number" id="timeout" placeholder="Ej: 500">

        <label for="outputFile">Archivo de Salida (opcional):</label>
        <input type="text" id="outputFile" placeholder="Ej: resultados.txt">

        <label for="script">Script NSE (opcional):</label>
        <input type="text" id="script" placeholder="Ej: http-enum, vulners">

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">nmap</p>
        </div>
    `,
    generateCommand: () => {
        // Recopilar todos los valores de los nuevos campos
        const ipTarget = document.getElementById('ipTarget').value.trim();
        const ports = document.getElementById('ports').value.trim();
        const synScan = document.getElementById('synScan').checked;
        const versionDetection = document.getElementById('versionDetection').checked;
        const osDetection = document.getElementById('osDetection').checked;
        const aggressiveScan = document.getElementById('aggressiveScan').checked;
        const scanServiceAndOS = document.getElementById('scanServiceAndOS').checked;
        const verboseOutput = document.getElementById('verboseOutput').checked;
        const quietOutput = document.getElementById('quietOutput').checked;
        const disablePing = document.getElementById('disablePing').checked;
        const fastScan = document.getElementById('fastScan').checked;
        const minRate = document.getElementById('minRate').value.trim();
        const timeout = document.getElementById('timeout').value.trim();
        const outputFile = document.getElementById('outputFile').value.trim();
        const script = document.getElementById('script').value.trim();

        if (!ipTarget) {
            alert("La dirección IP o rango es un campo obligatorio.");
            return;
        }

        let command = "nmap";

        // Agregar las opciones de escaneo
        if (synScan) command += " -sS";
        if (versionDetection) command += " -sV";
        if (osDetection) command += " -O";
        if (aggressiveScan) command += " -A";
        if (scanServiceAndOS) command += " -sC -sV";

        // Agregar otras opciones
        if (verboseOutput) command += " -v";
        if (quietOutput) command += " -q";
        if (disablePing) command += " -Pn";
        if (fastScan) command += " -F";

        // Agregar opciones con valores
        if (ports) command += ` -p ${ports}`;
        if (minRate) command += ` --min-rate ${minRate}`;
        if (timeout) command += ` --host-timeout ${timeout}ms`;
        if (outputFile) command += ` -oN ${outputFile}`;
        if (script) command += ` --script ${script}`;

        command += ` ${ipTarget}`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.nmap = nmapModule;