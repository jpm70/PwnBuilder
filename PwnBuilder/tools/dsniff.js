const dsniffModule = {
    html: `
        <h2>Dsniff - Generador de Comandos</h2>
        <p>Sniffer de contraseñas para redes no cifradas.</p>

        <label for="interface">Interfaz de Red (Obligatorio):</label>
        <input type="text" id="interface" placeholder="Ej: eth0, wlan0">
        
        <div class="checkbox-group">
            <h3>Herramientas del Paquete dsniff</h3>
            <input type="radio" id="dsniffTool" name="dsniffTool" value="dsniff" checked>
            <label for="dsniffTool">Dsniff (Sniffer de Contraseñas)</label><br>

            <input type="radio" id="filesnarfTool" name="dsniffTool" value="filesnarf">
            <label for="filesnarfTool">Filesnarf (Sniffer de Archivos)</label><br>

            <input type="radio" id="mailsnarfTool" name="dsniffTool" value="mailsnarf">
            <label for="mailsnarfTool">Mailsnarf (Sniffer de Correo)</label><br>

            <input type="radio" id="urlsnarfTool" name="dsniffTool" value="urlsnarf">
            <label for="urlsnarfTool">URLsnarf (Sniffer de URLs)</label><br>
        </div>

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">dsniff</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const interfaceName = document.getElementById('interface').value.trim();
        const selectedTool = document.querySelector('input[name="dsniffTool"]:checked').value;
        
        // Validación del campo obligatorio
        if (!interfaceName) {
            alert("La interfaz de red es un campo obligatorio.");
            return;
        }

        let command = `${selectedTool} -i ${interfaceName}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.dsniff = dsniffModule;