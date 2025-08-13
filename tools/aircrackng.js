const aircrackNgModule = {
    html: `
        <h2>Aircrackng - Generador de Comandos</h2>
        <p>Herramienta para crackear claves WEP y WPA/WPA2 de redes inalámbricas.</p>

        <label for="captureFile">Archivo de Captura (Obligatorio):</label>
        <input type="text" id="captureFile" placeholder="Ej: captura.cap">

        <label for="bssid">BSSID del Punto de Acceso (Obligatorio):</label>
        <input type="text" id="bssid" placeholder="Ej: 00:11:22:33:44:55">

        <div class="checkbox-group">
            <h3>Tipo de Ataque</h3>
            <input type="radio" id="wepAttack" name="attackType" value="wep" checked>
            <label for="wepAttack">Ataque WEP</label><br>

            <input type="radio" id="wpaAttack" name="attackType" value="wpa">
            <label for="wpaAttack">Ataque WPA/WPA2</label><br>
        </div>

        <div id="wpaOptions" style="display: none;">
            <label for="wordlist">Lista de Palabras (-w, Obligatorio para WPA):</label>
            <input type="text" id="wordlist" placeholder="Ej: /usr/share/wordlists/rockyou.txt">
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">aircrack-ng</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const captureFile = document.getElementById('captureFile').value.trim();
        const bssid = document.getElementById('bssid').value.trim();
        const attackType = document.querySelector('input[name="attackType"]:checked').value;
        const wordlist = document.getElementById('wordlist').value.trim();

        // Validación de campos obligatorios
        if (!captureFile || !bssid) {
            alert("El archivo de captura y el BSSID son campos obligatorios.");
            return;
        }

        let command = `aircrack-ng`;

        if (attackType === 'wpa') {
            if (!wordlist) {
                alert("Para el ataque WPA/WPA2, la lista de palabras es obligatoria.");
                return;
            }
            command += ` -w ${wordlist}`;
        }

        command += ` -b ${bssid} ${captureFile}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.aircrackng = aircrackNgModule;