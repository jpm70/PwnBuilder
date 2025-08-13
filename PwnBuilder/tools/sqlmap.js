const sqlmapModule = {
    html: `
        <h2>sqlmap - Generador de Comandos</h2>
        <p>Herramienta automática para detectar y explotar fallas de inyección SQL.</p>

        <label for="targetUrl">URL de Destino (Obligatorio):</label>
        <input type="text" id="targetUrl" placeholder="Ej: http://ejemplo.com/page.php?id=1">
        
        <div class="checkbox-group">
            <h3>Modos de Ataque</h3>
            <input type="radio" id="basicScan" name="attackMode" value="basic" checked>
            <label for="basicScan">Escaneo Básico</label><br>

            <input type="radio" id="dumpData" name="attackMode" value="dump">
            <label for="dumpData">Obtener Datos (Dump)</label><br>
        </div>

        <div id="dumpOptions" style="display: none;">
            <label for="dbName">Base de Datos a Enumerar:</label>
            <input type="text" id="dbName" placeholder="Ej: users_db">

            <label for="tableName">Tabla a Enumerar:</label>
            <input type="text" id="tableName" placeholder="Ej: accounts">

            <label for="columnName">Columna a Enumerar:</label>
            <input type="text" id="columnName" placeholder="Ej: password">

            <input type="checkbox" id="dumpAll">
            <label for="dumpAll">Obtener todas las tablas (--dump-all)</label><br>
        </div>

        <div class="checkbox-group">
            <h3>Otras Opciones</h3>
            <input type="checkbox" id="dbsEnum">
            <label for="dbsEnum">Enumerar bases de datos (--dbs)</label><br>

            <input type="checkbox" id="tablesEnum">
            <label for="tablesEnum">Enumerar tablas (--tables)</label><br>

            <input type="checkbox" id="columnsEnum">
            <label for="columnsEnum">Enumerar columnas (--columns)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">sqlmap -u </p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const targetUrl = document.getElementById('targetUrl').value.trim();
        const attackMode = document.querySelector('input[name="attackMode"]:checked').value;
        const dbName = document.getElementById('dbName').value.trim();
        const tableName = document.getElementById('tableName').value.trim();
        const columnName = document.getElementById('columnName').value.trim();
        const dumpAll = document.getElementById('dumpAll').checked;
        const dbsEnum = document.getElementById('dbsEnum').checked;
        const tablesEnum = document.getElementById('tablesEnum').checked;
        const columnsEnum = document.getElementById('columnsEnum').checked;

        // Validación de campos obligatorios
        if (!targetUrl) {
            alert("La URL de destino es un campo obligatorio.");
            return;
        }

        let command = `sqlmap -u "${targetUrl}"`;

        // Agregar las opciones de enumeración
        if (dbsEnum) command += ` --dbs`;
        if (tablesEnum) command += ` --tables`;
        if (columnsEnum) command += ` --columns`;
        
        // Agregar opciones del modo de ataque
        if (attackMode === "dump") {
            if (dumpAll) {
                command += ` --dump-all`;
            } else if (dbName && tableName && columnName) {
                command += ` -D ${dbName} -T ${tableName} -C ${columnName} --dump`;
            } else if (dbName && tableName) {
                command += ` -D ${dbName} -T ${tableName} --dump`;
            } else if (dbName) {
                command += ` -D ${dbName} --dump`;
            } else {
                 alert("Para obtener datos, debes especificar al menos una base de datos.");
                 return;
            }
        }
        
        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.sqlmap = sqlmapModule;