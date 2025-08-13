const wfuzzModule = {
    html: `
        <h2>Wfuzz - Generador de Comandos</h2>
        <p>Herramienta para fuzzing de aplicaciones web.</p>

        <label for="targetUrl">URL de Destino (Obligatorio, usa FUZZ):</label>
        <input type="text" id="targetUrl" placeholder="Ej: http://ejemplo.com/FUZZ">

        <label for="wordlist">Lista de Palabras (Obligatorio):</label>
        <input type="text" id="wordlist" placeholder="Ej: /usr/share/wordlists/dirb/common.txt">
        
        <div class="checkbox-group">
            <h3>Filtros y Opciones</h3>
            <label for="hideCodes">Ocultar Códigos de Estado (opcional):</label>
            <input type="text" id="hideCodes" placeholder="Ej: 404,403">

            <label for="hideChars">Ocultar por número de caracteres (opcional):</label>
            <input type="number" id="hideChars" placeholder="Ej: 200">
            
            <label for="threads">Número de Hilos (-t, opcional):</label>
            <input type="number" id="threads" value="10" min="1" max="100">

            <label for="delay">Retraso entre Peticiones (-s, opcional, en segundos):</label>
            <input type="number" id="delay" value="0">
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">wfuzz</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const targetUrl = document.getElementById('targetUrl').value.trim();
        const wordlist = document.getElementById('wordlist').value.trim();
        const hideCodes = document.getElementById('hideCodes').value.trim();
        const hideChars = document.getElementById('hideChars').value.trim();
        const threads = document.getElementById('threads').value.trim();
        const delay = document.getElementById('delay').value.trim();

        // Validación de campos obligatorios
        if (!targetUrl || !wordlist) {
            alert("La URL de destino y la lista de palabras son campos obligatorios.");
            return;
        }
        
        let command = "wfuzz";

        // Agregar opciones de filtrado
        if (hideCodes) command += ` -hc ${hideCodes}`;
        if (hideChars) command += ` -hh ${hideChars}`;
        
        // Agregar opciones de rendimiento
        if (threads) command += ` -t ${threads}`;
        if (delay) command += ` -s ${delay}`;

        // Agregar la lista de palabras y la URL de destino al final
        command += ` -z file,${wordlist} ${targetUrl}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.wfuzz = wfuzzModule;