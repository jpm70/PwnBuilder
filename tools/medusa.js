const medusaModule = {
    html: `
        <h2>Medusa - Generador de Comandos</h2>
        <p>Herramienta rápida para ataques de fuerza bruta paralela, modular y de fuerza bruta.</p>

        <label for="ipTarget">Host o IP de Destino (Obligatorio):</label>
        <input type="text" id="ipTarget" placeholder="Ej: 192.168.1.1 o ejemplo.com">

        <label for="protocol">Protocolo/Servicio (-M, Obligatorio):</label>
        <input type="text" id="protocol" placeholder="Ej: ssh, ftp, http, smb">

        <label for="userList">Lista de Usuarios (-U, opcional):</label>
        <input type="text" id="userList" placeholder="Ej: /usr/share/wordlists/users.txt">

        <label for="passList">Lista de Contraseñas (-P, opcional):</label>
        <input type="text" id="passList" placeholder="Ej: /usr/share/wordlists/rockyou.txt">

        <label for="singleUser">Usuario Individual (-u, opcional):</label>
        <input type="text" id="singleUser" placeholder="Ej: admin">

        <label for="singlePass">Contraseña Individual (-p, opcional):</label>
        <input type="text" id="singlePass" placeholder="Ej: password123">

        <label for="threads">Número de Hilos (-t, opcional):</label>
        <input type="number" id="threads" value="4" min="1" max="100">

        <div class="checkbox-group">
            <h3>Opciones Adicionales</h3>
            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-v)</label><br>

            <input type="checkbox" id="nologin">
            <label for="nologin">No mostrar intentos de login fallidos (-n)</label><br>
        </div>
        
        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">medusa</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const ipTarget = document.getElementById('ipTarget').value.trim();
        const protocol = document.getElementById('protocol').value.trim();
        const userList = document.getElementById('userList').value.trim();
        const passList = document.getElementById('passList').value.trim();
        const singleUser = document.getElementById('singleUser').value.trim();
        const singlePass = document.getElementById('singlePass').value.trim();
        const threads = document.getElementById('threads').value.trim();
        const verboseOutput = document.getElementById('verboseOutput').checked;
        const nologin = document.getElementById('nologin').checked;

        // Validación de campos obligatorios
        if (!ipTarget || !protocol) {
            alert("El host y el protocolo son campos obligatorios.");
            return;
        }

        // Validación de listas o credenciales individuales
        if (!userList && !singleUser && !passList && !singlePass) {
             alert("Debes proporcionar al menos una lista de usuarios/contraseñas o un usuario/contraseña individual.");
             return;
        }
        
        let command = `medusa -h ${ipTarget} -M ${protocol}`;

        // Agregar opciones de listas o credenciales individuales
        if (userList) command += ` -U ${userList}`;
        if (passList) command += ` -P ${passList}`;
        if (singleUser) command += ` -u ${singleUser}`;
        if (singlePass) command += ` -p ${singlePass}`;
        
        // Agregar opciones de control de ataque
        if (threads) command += ` -t ${threads}`;
        if (verboseOutput) command += ` -v`;
        if (nologin) command += ` -n`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.medusa = medusaModule;