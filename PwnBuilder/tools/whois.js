const whoisModule = {
    html: `
        <h2>Whois - Generador de Comandos</h2>
        <p>Herramienta para consultar registros de dominios y obtener información del propietario y la registradora.</p>

        <label for="domain">Dominio (Obligatorio):</label>
        <input type="text" id="domain" placeholder="Ej: ejemplo.com">

        <div class="checkbox-group">
            <h3>Opciones de Salida</h3>
            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-v)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">whois</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const domain = document.getElementById('domain').value.trim();
        const verboseOutput = document.getElementById('verboseOutput').checked;

        // Validación del campo obligatorio
        if (!domain) {
            alert("El dominio es un campo obligatorio.");
            return;
        }

        let command = "whois";

        // Agregar las opciones
        if (verboseOutput) command += ` -v`;

        // Agregar el dominio al final
        command += ` ${domain}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.whois = whoisModule;