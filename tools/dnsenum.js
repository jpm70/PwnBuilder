const dnsenumModule = {
    html: `
        <h2>dnsenum - Generador de Comandos</h2>
        <p>Herramienta para enumerar información de DNS y encontrar subdominios.</p>

        <label for="domain">Dominio (Obligatorio):</label>
        <input type="text" id="domain" placeholder="Ej: ejemplo.com">

        <label for="wordlist">Lista de Palabras para Brute-force (opcional):</label>
        <input type="text" id="wordlist" placeholder="Ej: /usr/share/wordlists/dns.txt">
        
        <div class="checkbox-group">
            <h3>Opciones de Enumeración</h3>
            <input type="checkbox" id="enumerateAll">
            <label for="enumerateAll">Enumerar todo (--enum)</label><br>

            <input type="checkbox" id="bruteForce">
            <label for="bruteForce">Fuerza bruta de subdominios (-f)</label><br>
            
            <input type="checkbox" id="recursion">
            <label for="recursion">Búsqueda recursiva (-r)</label><br>

            <input type="checkbox" id="outputFile">
            <label for="outputFile">Archivo de Salida (-o, opcional)</label>
            <input type="text" id="outputFileName" placeholder="Ej: dnsenum_results.xml">
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">dnsenum</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const domain = document.getElementById('domain').value.trim();
        const wordlist = document.getElementById('wordlist').value.trim();
        const enumerateAll = document.getElementById('enumerateAll').checked;
        const bruteForce = document.getElementById('bruteForce').checked;
        const recursion = document.getElementById('recursion').checked;
        const outputFile = document.getElementById('outputFile').checked;
        const outputFileName = document.getElementById('outputFileName').value.trim();

        // Validación del campo obligatorio
        if (!domain) {
            alert("El dominio es un campo obligatorio.");
            return;
        }

        let command = `dnsenum ${domain}`;

        // Agregar las opciones de escaneo
        if (wordlist) command += ` -f ${wordlist}`;
        if (enumerateAll) command += ` --enum`;
        if (bruteForce) command += ` -f ${wordlist || '`wordlist`'}`; // `wordlist` para dar un ejemplo si no se especifica
        if (recursion) command += ` -r`;
        if (outputFile && outputFileName) command += ` -o ${outputFileName}`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.dnsenum = dnsenumModule;