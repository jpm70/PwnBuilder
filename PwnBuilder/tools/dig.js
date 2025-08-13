const digModule = {
    html: `
        <h2>dig - Generador de Comandos</h2>
        <p>Herramienta flexible para interrogar servidores de nombres de DNS.</p>

        <label for="domain">Dominio (Obligatorio):</label>
        <input type="text" id="domain" placeholder="Ej: ejemplo.com">

        <label for="recordType">Tipo de Registro (opcional):</label>
        <input type="text" id="recordType" placeholder="Ej: A, MX, NS, TXT">

        <label for="dnsServer">Servidor DNS (@, opcional):</label>
        <input type="text" id="dnsServer" placeholder="Ej: 8.8.8.8">
        
        <div class="checkbox-group">
            <h3>Opciones de Salida</h3>
            <input type="checkbox" id="shortOutput">
            <label for="shortOutput">Salida corta (+short)</label><br>

            <input type="checkbox" id="traceOutput">
            <label for="traceOutput">Trazar delegación (+trace)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">dig</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const domain = document.getElementById('domain').value.trim();
        const recordType = document.getElementById('recordType').value.trim();
        const dnsServer = document.getElementById('dnsServer').value.trim();
        const shortOutput = document.getElementById('shortOutput').checked;
        const traceOutput = document.getElementById('traceOutput').checked;

        // Validación del campo obligatorio
        if (!domain) {
            alert("El dominio es un campo obligatorio.");
            return;
        }

        let command = "dig";

        // Agregar el servidor DNS si se especifica
        if (dnsServer) command += ` @${dnsServer}`;

        // Agregar el dominio y el tipo de registro
        command += ` ${domain}`;
        if (recordType) command += ` ${recordType}`;

        // Agregar las opciones de salida
        if (shortOutput) command += ` +short`;
        if (traceOutput) command += ` +trace`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.dig = digModule;