let db;
const request = indexedDB.open('CommunityProgramsDB', 1);

request.onerror = function(event) {
    console.error('Database error:', event.target.error);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore('programs', { keyPath: 'id', autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    displayPrograms();
};

function displayPrograms() {
    const transaction = db.transaction(['programs'], 'readonly');
    const objectStore = transaction.objectStore('programs');
    const request = objectStore.getAll();

    request.onsuccess = function(event) {
        const programs = event.target.result;
        const listElement = document.getElementById('programsList');
        listElement.innerHTML = programs.map(program =>
            `<div class="card text-bg-primary mb-2" style="width: 100%">
            <div class="card mb-2">
                <div class="card-body">
                    <h5 class="card-title">${program.title}</h5>
                    <p class="card-text">${program.description}</p>
                    <button onclick="editProgram(${program.id})" class="btn btn-secondary">Editar</button>
                    <button onclick="deleteProgram(${program.id})" class="btn btn-danger">Eliminar</button>
                </div>
            </div>
            </div>
            `
        ).join('');
    };
}

document.getElementById('programForm').onsubmit = function(event) {
    event.preventDefault();
    const title = document.getElementById('programTitle').value;
    const description = document.getElementById('programDescription').value;
    const id = document.getElementById('programId').value;

    const transaction = db.transaction(['programs'], 'readwrite');
    const objectStore = transaction.objectStore('programs');
    const data = { title, description };

    if (id) {
        data.id = Number(id);
    }

    objectStore.put(data);

    transaction.oncomplete = function() {
        displayPrograms();
        document.getElementById('programForm').reset();
        document.getElementById('programId').value = '';
    };
};

function editProgram(id) {
    const transaction = db.transaction(['programs'], 'readonly');
    const objectStore = transaction.objectStore('programs');
    const request = objectStore.get(id);

    request.onsuccess = function(event) {
        const program = event.target.result;
        document.getElementById('programTitle').value = program.title;
        document.getElementById('programDescription').value = program.description;
        document.getElementById('programId').value = program.id;
    };
}

function deleteProgram(id) {
    const transaction = db.transaction(['programs'], 'readwrite');
    const objectStore = transaction.objectStore('programs');
    objectStore.delete(id);

    transaction.oncomplete = function() {
        displayPrograms();
    };
}
