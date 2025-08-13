const commixModule = {
    html: `
        <h2>Commix - Generador de Comandos</h2>
        <p>Herramienta automática para explotar vulnerabilidades de inyección de comandos.</p>

        <label for="targetUrl">URL de Destino (Obligatorio):</label>
        <input type="text" id="targetUrl" placeholder="Ej: http://ejemplo.com/page.php?cmd=ls">
        
        <label for="injectionParameter">Parámetro de Inyección (opcional):</label>
        <input type="text" id="injectionParameter" placeholder="Ej: cmd">

        <label for="dataPost">Datos POST (opcional):</label>
        <input type="text" id="dataPost" placeholder="Ej: cmd=ls">

        <div class="checkbox-group">
            <h3>Nivel de Riesgo y Técnica</h3>
            <label for="riskLevel">Nivel de Riesgo (--risk, opcional):</label>
            <input type="number" id="riskLevel" value="1" min="1" max="3">
            
            <label for="technique">Técnica de Inyección (--technique, opcional):</label>
            <input type="text" id="technique" placeholder="Ej: B,E,T">
        </div>

        <div class="checkbox-group">
            <h3>Otras Opciones</h3>
            <input type="checkbox" id="shellAccess">
            <label for="shellAccess">Acceso a la Shell (--shell)</label><br>

            <input type="checkbox" id="blindInjection">
            <label for="blindInjection">Inyección a ciegas (--blind)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">commix</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const targetUrl = document.getElementById('targetUrl').value.trim();
        const injectionParameter = document.getElementById('injectionParameter').value.trim();
        const dataPost = document.getElementById('dataPost').value.trim();
        const riskLevel = document.getElementById('riskLevel').value.trim();
        const technique = document.getElementById('technique').value.trim();
        const shellAccess = document.getElementById('shellAccess').checked;
        const blindInjection = document.getElementById('blindInjection').checked;

        // Validación del campo obligatorio
        if (!targetUrl) {
            alert("La URL de destino es un campo obligatorio.");
            return;
        }

        let command = `commix -u "${targetUrl}"`;

        // Agregar las opciones
        if (injectionParameter) command += ` --param=${injectionParameter}`;
        if (dataPost) command += ` --data="${dataPost}"`;
        if (riskLevel) command += ` --risk=${riskLevel}`;
        if (technique) command += ` --technique=${technique}`;
        if (shellAccess) command += ` --shell`;
        if (blindInjection) command += ` --blind`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.commix = commixModule;