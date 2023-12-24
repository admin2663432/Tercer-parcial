let db;
const request = indexedDB.open('testimonialsDB', 1);

request.onerror = function(event) {
    console.log('Error al abrir la base de datos', event);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore('testimonials', { keyPath: 'id', autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    readTestimonials();
};

function readTestimonials() {
    const transaction = db.transaction(['testimonials'], 'readonly');
    const objectStore = transaction.objectStore('testimonials');
    const request = objectStore.getAll();

    request.onsuccess = function(event) {
        const testimonials = event.target.result;
        const testimonialsElement = document.getElementById('testimonials');
        testimonialsElement.innerHTML = testimonials.map(t =>
            `<div class="testimonial" style="font-size: 12px">
                <blockquote><p><strong>${t.name}:</strong> ${t.message}</p><button onclick="deleteTestimonial(${t.id})" class="btn btn-sm btn-danger">Borrar</button></blockquote>
            </div>`
        ).join('');
    };
}

document.getElementById('testimonialForm').onsubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validación de los campos
    if (!name || !message) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const transaction = db.transaction(['testimonials'], 'readwrite');
    const objectStore = transaction.objectStore('testimonials');
    const request = objectStore.add({ name, message });

    request.onsuccess = function(event) {
        readTestimonials();
    };

    // Limpiar el formulario después del envío
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
};

function deleteTestimonial(id) {
    const transaction = db.transaction(['testimonials'], 'readwrite');
    const objectStore = transaction.objectStore('testimonials');
    objectStore.delete(id);

    transaction.oncomplete = function() {
        console.log('Testimonio borrado con éxito');
        readTestimonials(); // Recargar los testimonios
    };
}
