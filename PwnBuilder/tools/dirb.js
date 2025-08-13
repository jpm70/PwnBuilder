const dirbModule = {
    html: `
        <h2>Dirb - Generador de Comandos</h2>
        <p>Realiza escaneos de directorios y archivos ocultos en servidores web.</p>

        <label for="targetUrl">URL de Destino (Obligatorio):</label>
        <input type="text" id="targetUrl" placeholder="Ej: http://ejemplo.com">

        <label for="wordlist">Lista de Palabras (-w, opcional):</label>
        <input type="text" id="wordlist" placeholder="Ej: /usr/share/wordlists/dirb/common.txt">

        <label for="extensions">Extensiones de Archivo (-X, opcional):</label>
        <input type="text" id="extensions" placeholder="Ej: .php,.html,.zip">

        <label for="proxy">Proxy (opcional):</label>
        <input type="text" id="proxy" placeholder="Ej: http://127.0.0.1:8080">

        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="recursiveScan">
            <label for="recursiveScan">Escaneo Recursivo (-r)</label><br>

            <input type="checkbox" id="caseInsensitive">
            <label for="caseInsensitive">No distinguir mayúsculas/minúsculas (-i)</label><br>
            
            <label for="threads">Número de Hilos (-t, opcional):</label>
            <input type="number" id="threads" value="10" min="1" max="100">
            
            <label for="delay">Retraso entre Peticiones (-d, opcional, en ms):</label>
            <input type="number" id="delay" value="0">
        </div>

        <label for="outputFile">Archivo de Salida (-o, opcional):</label>
        <input type="text" id="outputFile" placeholder="Ej: dirb_results.txt">

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">dirb</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de todos los campos
        const targetUrl = document.getElementById('targetUrl').value.trim();
        const wordlist = document.getElementById('wordlist').value.trim();
        const extensions = document.getElementById('extensions').value.trim();
        const proxy = document.getElementById('proxy').value.trim();
        const recursiveScan = document.getElementById('recursiveScan').checked;
        const caseInsensitive = document.getElementById('caseInsensitive').checked;
        const threads = document.getElementById('threads').value.trim();
        const delay = document.getElementById('delay').value.trim();
        const outputFile = document.getElementById('outputFile').value.trim();

        // Validación del campo obligatorio
        if (!targetUrl) {
            alert("La URL de destino es un campo obligatorio.");
            return;
        }
        
        let command = "dirb";

        // Agregar opciones con valores
        if (wordlist) command += ` ${wordlist}`;
        if (extensions) command += ` -X ${extensions}`;
        if (proxy) command += ` -p ${proxy}`;
        
        // Agregar opciones de escaneo
        if (recursiveScan) command += ` -r`;
        if (caseInsensitive) command += ` -i`;
        if (threads) command += ` -t ${threads}`;
        if (delay) command += ` -d ${delay}`;

        // Agregar el archivo de salida
        if (outputFile) command += ` -o ${outputFile}`;
        
        // Agregar la URL de destino al final
        command += ` ${targetUrl}`;
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.dirb = dirbModule;