const hashcatModule = {
    html: `
        <h2>Hashcat - Generador de Comandos</h2>
        <p>Herramienta avanzada para crackear contraseñas.</p>

        <label for="hashFile">Archivo de Hashes (Obligatorio):</label>
        <input type="text" id="hashFile" placeholder="Ej: hashes.txt">

        <label for="hashType">Tipo de Hash (-m, Obligatorio):</label>
        <input type="number" id="hashType" placeholder="Ej: 0 para MD5">
        
        <div class="checkbox-group">
            <h3>Modos de Ataque (-a)</h3>
            <input type="radio" id="dictionaryAttack" name="attackMode" value="0" checked>
            <label for="dictionaryAttack">Ataque de Diccionario (0)</label><br>

            <input type="radio" id="bruteForceAttack" name="attackMode" value="3">
            <label for="bruteForceAttack">Ataque de Máscara/Fuerza Bruta (3)</label><br>
        </div>

        <div id="dictionaryOptions">
            <label for="wordlistFile">Lista de Palabras:</label>
            <input type="text" id="wordlistFile" placeholder="Ej: /usr/share/wordlists/rockyou.txt">

            <input type="checkbox" id="rulesFile">
            <label for="rulesFile">Usar Reglas (-r)</label>
            <input type="text" id="rulesPath" placeholder="Ej: /usr/share/hashcat/rules/best64.rule">
        </div>
        
        <div id="bruteForceOptions" style="display: none;">
            <label for="mask">Máscara de Ataque:</label>
            <input type="text" id="mask" placeholder="Ej: ?d?d?d?d?d?d">
        </div>

        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="showCracked">
            <label for="showCracked">Mostrar contraseñas crackeadas (--show)</label><br>

            <input type="checkbox" id="removeCracked">
            <label for="removeCracked">Eliminar contraseñas crackeadas (--remove)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">hashcat</p>
        </div>
    `,
    generateCommand: () => {
        const hashFile = document.getElementById('hashFile').value.trim();
        const hashType = document.getElementById('hashType').value.trim();
        const attackMode = document.querySelector('input[name="attackMode"]:checked').value;
        const wordlistFile = document.getElementById('wordlistFile').value.trim();
        const rulesFile = document.getElementById('rulesFile').checked;
        const rulesPath = document.getElementById('rulesPath').value.trim();
        const mask = document.getElementById('mask').value.trim();
        const showCracked = document.getElementById('showCracked').checked;
        const removeCracked = document.getElementById('removeCracked').checked;

        if (!hashFile || !hashType) {
            alert("El archivo de hashes y el tipo de hash son campos obligatorios.");
            return;
        }

        let command = `hashcat -m ${hashType} -a ${attackMode}`;

        if (attackMode === "0") { // Ataque de diccionario
            if (!wordlistFile) {
                alert("Para el ataque de diccionario, debes especificar un archivo de lista de palabras.");
                return;
            }
            command += ` ${hashFile} ${wordlistFile}`;
            if (rulesFile && rulesPath) {
                command += ` -r ${rulesPath}`;
            }
        } else if (attackMode === "3") { // Ataque de fuerza bruta
            if (!mask) {
                alert("Para el ataque de fuerza bruta, debes especificar una máscara.");
                return;
            }
            command += ` ${hashFile} ${mask}`;
        }
        
        if (showCracked) {
            command += ` --show`;
        }
        if (removeCracked) {
            command += ` --remove`;
        }

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.hashcat = hashcatModule;