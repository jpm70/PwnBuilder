const hydraModule = {
    html: `
        <h2>Hydra - Generador de Comandos</h2>
        <p>Realiza ataques de fuerza bruta a servicios de login.</p>

        <label for="ipTarget">Dirección IP o Dominio (Obligatorio):</label>
        <input type="text" id="ipTarget" placeholder="Ej: 192.168.1.1 o example.com">

        <label for="protocol">Protocolo/Servicio (Obligatorio):</label>
        <input type="text" id="protocol" placeholder="Ej: ssh, ftp, http-post-form">

        <label for="userList">Lista de Usuarios (-L, opcional):</label>
        <input type="text" id="userList" placeholder="Ej: /usr/share/wordlists/users.txt">

        <label for="passList">Lista de Contraseñas (-P, opcional):</label>
        <input type="text" id="passList" placeholder="Ej: /usr/share/wordlists/rockyou.txt">

        <label for="singleUser">Usuario Individual (-l, opcional):</label>
        <input type="text" id="singleUser" placeholder="Ej: admin">

        <label for="singlePass">Contraseña Individual (-p, opcional):</label>
        <input type="text" id="singlePass" placeholder="Ej: password123">

        <div class="checkbox-group">
            <h3>Opciones de Ataque</h3>
            <label for="tasks">Tareas Concurrentes (-t, opcional):</label>
            <input type="number" id="tasks" value="4" min="1" max="128">
            <label for="tasks">Número de tareas</label><br>

            <input type="checkbox" id="verboseOutput">
            <label for="verboseOutput">Modo Verbose (-V)</label><br>
            
            <input type="checkbox" id="noCheck">
            <label for="noCheck">Deshabilitar PING/Conexión previa (-n)</label><br>
        </div>

        <label for="timeout">Tiempo de Espera (-W, opcional, en segundos):</label>
        <input type="number" id="timeout" placeholder="Ej: 30">

        <label for="outputFile">Archivo de Salida (-o, opcional):</label>
        <input type="text" id="outputFile" placeholder="Ej: hydra_results.txt">

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">hydra</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de todos los campos
        const ipTarget = document.getElementById('ipTarget').value.trim();
        const protocol = document.getElementById('protocol').value.trim();
        const userList = document.getElementById('userList').value.trim();
        const passList = document.getElementById('passList').value.trim();
        const singleUser = document.getElementById('singleUser').value.trim();
        const singlePass = document.getElementById('singlePass').value.trim();
        const tasks = document.getElementById('tasks').value.trim();
        const verboseOutput = document.getElementById('verboseOutput').checked;
        const noCheck = document.getElementById('noCheck').checked;
        const timeout = document.getElementById('timeout').value.trim();
        const outputFile = document.getElementById('outputFile').value.trim();

        // Validación de campos obligatorios
        if (!ipTarget || !protocol) {
            alert("La dirección IP y el protocolo son campos obligatorios.");
            return;
        }

        // Validación de listas o credenciales individuales
        if (!userList && !singleUser && !passList && !singlePass) {
             alert("Debes proporcionar al menos una lista de usuarios/contraseñas o un usuario/contraseña individual.");
             return;
        }
        
        let command = "hydra";

        // Agregar opciones de listas o credenciales individuales
        if (userList) command += ` -L ${userList}`;
        if (passList) command += ` -P ${passList}`;
        if (singleUser) command += ` -l ${singleUser}`;
        if (singlePass) command += ` -p ${singlePass}`;
        
        // Agregar opciones de control de ataque
        if (tasks) command += ` -t ${tasks}`;
        if (verboseOutput) command += ` -V`;
        if (noCheck) command += ` -n`;
        if (timeout) command += ` -W ${timeout}`;
        
        // Agregar archivo de salida
        if (outputFile) command += ` -o ${outputFile}`;
        
        // Agregar el objetivo y el protocolo al final del comando
        command += ` ${ipTarget} ${protocol}`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.hydra = hydraModule;