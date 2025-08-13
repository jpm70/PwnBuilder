const enum4linuxModule = {
    html: `
        <h2>Enum4linux - Generador de Comandos</h2>
        <p>Enumera información de Samba y Active Directory desde sistemas Windows y Linux.</p>

        <label for="ipTarget">Dirección IP de Destino (Obligatorio):</label>
        <input type="text" id="ipTarget" placeholder="Ej: 192.168.1.100">
        
        <div class="checkbox-group">
            <h3>Opciones de Enumeración</h3>
            <input type="checkbox" id="allInfo">
            <label for="allInfo">Enumerar toda la información (-a)</label><br>
            
            <input type="checkbox" id="users">
            <label for="users">Enumerar usuarios (-U)</label><br>

            <input type="checkbox" id="groups">
            <label for="groups">Enumerar grupos (-G)</label><br>

            <input type="checkbox" id="shares">
            <label for="shares">Enumerar recursos compartidos (-S)</label><br>

            <input type="checkbox" id="passPolicy">
            <label for="passPolicy">Obtener política de contraseñas (-P)</label><br>

            <input type="checkbox" id="osInfo">
            <label for="osInfo">Obtener información del sistema operativo (-o)</label><br>
            
            <input type="checkbox" id="verbose">
            <label for="verbose">Modo Verbose (-v)</label><br>
        </div>

        <button>Generar Comando</button>

        <div class="command-box">
            <h4>Comando generado:</h4>
            <p id="outputCommand">enum4linux</p>
        </div>
    `,
    generateCommand: () => {
        // Recopila los valores de los campos
        const ipTarget = document.getElementById('ipTarget').value.trim();
        const allInfo = document.getElementById('allInfo').checked;
        const users = document.getElementById('users').checked;
        const groups = document.getElementById('groups').checked;
        const shares = document.getElementById('shares').checked;
        const passPolicy = document.getElementById('passPolicy').checked;
        const osInfo = document.getElementById('osInfo').checked;
        const verbose = document.getElementById('verbose').checked;

        // Validación del campo obligatorio
        if (!ipTarget) {
            alert("La dirección IP de destino es un campo obligatorio.");
            return;
        }
        
        let command = "enum4linux";

        // Agregar las opciones seleccionadas
        if (allInfo) command += ` -a`;
        if (users) command += ` -U`;
        if (groups) command += ` -G`;
        if (shares) command += ` -S`;
        if (passPolicy) command += ` -P`;
        if (osInfo) command += ` -o`;
        if (verbose) command += ` -v`;

        // Agregar el objetivo
        command += ` ${ipTarget}`;

        document.getElementById('outputCommand').textContent = command;
    }
};

// Se registra la herramienta en el objeto global
toolForms.enum4linux = enum4linuxModule;