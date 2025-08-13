const fierceModule = {
    html: `
        <h2>Fierce - Generador de Comandos</h2>
        <p>Escáner de DNS que encuentra subdominios asociados a un objetivo.</p>

        <label for="domain">Dominio (Obligatorio):</label>
        <input type="text" id="domain" placeholder="Ej: ejemplo.com">

        <label for="wordlist">Lista de Palabras (-f, opcional):</label>
        <input type="text" id="wordlist" placeholder="Ej: /usr/share/wordlists/dns.txt">
        
        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-v)</label><br>

            <input type="checkbox" id="outputFile">
            <label for="outputFile">Archivo de Salida (-o, opcional)</label>
            <input type="text" id="outputFileName" placeholder="Ej: fierce_results.txt">
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">fierce</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const domain = document.getElementById('domain').value.trim();
        const wordlist = document.getElementById('wordlist').value.trim();
        const verboseOutput = document.getElementById('verboseOutput').checked;
        const outputFile = document.getElementById('outputFile').checked;
        const outputFileName = document.getElementById('outputFileName').value.trim();

        // Validación del campo obligatorio
        if (!domain) {
            alert("El dominio es un campo obligatorio.");
            return;
        }

        let command = `fierce -dns ${domain}`;

        // Agregar las opciones de escaneo
        if (wordlist) command += ` -f ${wordlist}`;
        if (verboseOutput) command += ` -v`;
        if (outputFile && outputFileName) command += ` -o ${outputFileName}`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.fierce = fierceModule;