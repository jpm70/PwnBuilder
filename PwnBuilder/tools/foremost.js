const foremostModule = {
    html: `
        <h2>Foremost - Generador de Comandos</h2>
        <p>Herramienta para recuperar archivos de imágenes de disco o particiones.</p>

        <label for="imageFile">Archivo o Partición (Obligatorio):</label>
        <input type="text" id="imageFile" placeholder="Ej: imagen.dd o /dev/sda1">
        
        <label for="outputDirectory">Directorio de Salida (-o, Obligatorio):</label>
        <input type="text" id="outputDirectory" placeholder="Ej: /home/user/recovered_files">

        <label for="fileTypes">Tipos de Archivo (-t, opcional):</label>
        <input type="text" id="fileTypes" placeholder="Ej: jpg,pdf,zip">
        
        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-v)</label><br>

            <input type="checkbox" id="writeAll">
            <label for="writeAll">Escribir todos los archivos (-a)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">foremost</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const imageFile = document.getElementById('imageFile').value.trim();
        const outputDirectory = document.getElementById('outputDirectory').value.trim();
        const fileTypes = document.getElementById('fileTypes').value.trim();
        const verboseOutput = document.getElementById('verboseOutput').checked;
        const writeAll = document.getElementById('writeAll').checked;
        
        // Validación de campos obligatorios
        if (!imageFile || !outputDirectory) {
            alert("El archivo de imagen/partición y el directorio de salida son campos obligatorios.");
            return;
        }

        let command = `foremost -i ${imageFile} -o ${outputDirectory}`;

        // Agregar las opciones
        if (fileTypes) command += ` -t ${fileTypes}`;
        if (verboseOutput) command += ` -v`;
        if (writeAll) command += ` -a`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.foremost = foremostModule;