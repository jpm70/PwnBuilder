const searchsploitModule = {
    html: `
        <h2>Searchsploit - Generador de Comandos</h2>
        <p>Busca exploits y shellcodes en la base de datos de Exploit-DB.</p>

        <label for="keyword">Palabra Clave de Búsqueda (Obligatorio):</label>
        <input type="text" id="keyword" placeholder="Ej: samba 4.3">

        <label for="osFilter">Filtro por Sistema Operativo (opcional):</label>
        <input type="text" id="osFilter" placeholder="Ej: windows, linux">

        <div class="checkbox-group">
            <h3>Opciones de Salida</h3>
            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-v)</label><br>

            <input type="checkbox" id="jsonOutput">
            <label for="jsonOutput">Salida en formato JSON (-j)</label><br>
        </div>

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">searchsploit</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const keyword = document.getElementById('keyword').value.trim();
        const osFilter = document.getElementById('osFilter').value.trim();
        const verboseOutput = document.getElementById('verboseOutput').checked;
        const jsonOutput = document.getElementById('jsonOutput').checked;
        
        // Validación del campo obligatorio
        if (!keyword) {
            alert("La palabra clave de búsqueda es un campo obligatorio.");
            return;
        }

        let command = `searchsploit`;
        
        // Agregar opciones
        if (verboseOutput) command += ` -v`;
        if (jsonOutput) command += ` -j`;

        // Agregar la palabra clave de búsqueda y los filtros
        command += ` "${keyword}"`;
        if (osFilter) command += ` ${osFilter}`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.searchsploit = searchsploitModule;