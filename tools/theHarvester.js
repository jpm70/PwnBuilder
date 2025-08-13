const theHarvesterModule = {
    html: `
        <h2>theHarvester - Generador de Comandos</h2>
        <p>Herramienta para recopilar información de inteligencia de fuentes abiertas (OSINT).</p>

        <label for="domain">Dominio (Obligatorio):</label>
        <input type="text" id="domain" placeholder="Ej: ejemplo.com">

        <label for="limit">Límite de Resultados (-l, opcional):</label>
        <input type="number" id="limit" placeholder="Ej: 500">

        <label for="sources">Fuentes de Búsqueda (-b, opcional):</label>
        <input type="text" id="sources" placeholder="Ej: google,bing,linkedin">
        
        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="vhost">
            <label for="vhost">Ver Host Virtuales (-v)</label><br>
            
            <input type="checkbox" id="dnsBruteForce">
            <label for="dnsBruteForce">Fuerza bruta de DNS (-c)</label><br>
        </div>

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">theharvester</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const domain = document.getElementById('domain').value.trim();
        const limit = document.getElementById('limit').value.trim();
        const sources = document.getElementById('sources').value.trim();
        const vhost = document.getElementById('vhost').checked;
        const dnsBruteForce = document.getElementById('dnsBruteForce').checked;

        // Validación del campo obligatorio
        if (!domain) {
            alert("El dominio es un campo obligatorio.");
            return;
        }

        let command = `theharvester -d ${domain}`;

        // Agregar las opciones
        if (limit) command += ` -l ${limit}`;
        if (sources) command += ` -b ${sources}`;
        if (vhost) command += ` -v`;
        if (dnsBruteForce) command += ` -c`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.theHarvester = theHarvesterModule;