const jtrModule = {
    html: `
        <h2>John the Ripper - Generador de Comandos</h2>
        <p>Realiza ataques de cracking de contraseñas con John the Ripper (JTR).</p>

        <label for="hashFile">Archivo de Hashes (Obligatorio):</label>
        <input type="text" id="hashFile" placeholder="Ej: hashes.txt">
        
        <div class="checkbox-group">
            <h3>Modos de Ataque</h3>
            <input type="radio" id="wordlistMode" name="attackMode" value="wordlist" checked>
            <label for="wordlistMode">Modo de Lista de Palabras (--wordlist)</label><br>

            <input type="radio" id="singleMode" name="attackMode" value="single">
            <label for="singleMode">Modo Individual (--single)</label><br>
        </div>

        <div id="wordlistOptions">
            <label for="wordlistFile">Lista de Palabras:</label>
            <input type="text" id="wordlistFile" placeholder="Ej: /usr/share/wordlists/rockyou.txt">

            <label for="rulesFile">Reglas de Ataque:</label>
            <input type="text" id="rulesFile" placeholder="Ej: --rules=jumbo">
        </div>

        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="forkProcesses">
            <label for="forkProcesses">Número de Procesos (--fork, opcional):</label>
            <input type="number" id="forkProcessesValue" value="4" min="1" max="64">
            
            <input type="checkbox" id="format">
            <label for="format">Formato del Hash (--format, opcional):</label>
            <input type="text" id="formatValue" placeholder="Ej: raw-sha256, NT, lm">
        </div>

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">john</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const hashFile = document.getElementById('hashFile').value.trim();
        const wordlistMode = document.getElementById('wordlistMode').checked;
        const singleMode = document.getElementById('singleMode').checked;
        const wordlistFile = document.getElementById('wordlistFile').value.trim();
        const rulesFile = document.getElementById('rulesFile').value.trim();
        const forkProcesses = document.getElementById('forkProcesses').checked;
        const forkProcessesValue = document.getElementById('forkProcessesValue').value.trim();
        const format = document.getElementById('format').checked;
        const formatValue = document.getElementById('formatValue').value.trim();
        
        // Validación del campo obligatorio
        if (!hashFile) {
            alert("El archivo de hashes es un campo obligatorio.");
            return;
        }

        let command = "john";

        // Agregar las opciones de formato
        if (format && formatValue) {
            command += ` --format=${formatValue}`;
        }
        
        // Agregar las opciones de ataque
        if (wordlistMode && wordlistFile) {
            command += ` --wordlist=${wordlistFile}`;
            if (rulesFile) {
                command += ` ${rulesFile}`; // Se usa un espacio ya que --rules es un argumento separado
            }
        } else if (singleMode) {
            command += ` --single`;
        } else {
             alert("Debes seleccionar un modo de ataque y proporcionar una lista de palabras si es necesario.");
             return;
        }

        // Agregar las opciones de rendimiento
        if (forkProcesses && forkProcessesValue) {
            command += ` --fork=${forkProcessesValue}`;
        }

        // Agregar el archivo de hashes al final
        command += ` ${hashFile}`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.jtr = jtrModule;