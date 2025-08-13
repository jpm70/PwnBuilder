const airmonNgModule = {
    html: `
        <h2>Airmon-ng - Generador de Comandos</h2>
        <p>Habilita el modo monitor en una interfaz de red inalámbrica.</p>

        <label for="interface">Interfaz de Red (Obligatorio):</label>
        <input type="text" id="interface" placeholder="Ej: wlan0">
        
        <div class="checkbox-group">
            <h3>Acción</h3>
            <input type="radio" id="startMode" name="actionMode" value="start" checked>
            <label for="startMode">Iniciar Modo Monitor (start)</label><br>

            <input type="radio" id="stopMode" name="actionMode" value="stop">
            <label for="stopMode">Detener Modo Monitor (stop)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">airmon-ng</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const interfaceName = document.getElementById('interface').value.trim();
        const action = document.querySelector('input[name="actionMode"]:checked').value;

        // Validación del campo obligatorio
        if (!interfaceName) {
            alert("La interfaz de red es un campo obligatorio.");
            return;
        }

        let command = `airmon-ng ${action} ${interfaceName}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.airmonng = airmonNgModule;