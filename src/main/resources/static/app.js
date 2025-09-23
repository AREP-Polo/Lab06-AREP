const API_BASE_URL = 'http://localhost:8080/api/properties';

document.addEventListener('DOMContentLoaded', function () {
    loadProperties();
    setupForm();
});

function setupForm() {
    const form = document.getElementById('propertyForm');
    const cancelBtn = document.getElementById('cancelBtn');

    form.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', cancelEdit);
}

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = getFormData();

    if (document.getElementById('propertyId').value) {
        updateProperty(formData);
    } else {
        createProperty(formData);
    }
}

function getFormData() {
    return {
        address: document.getElementById('address').value,
        price: parseFloat(document.getElementById('price').value),
        size: parseInt(document.getElementById('size').value),
        description: document.getElementById('description').value
    };
}

function createProperty(property) {
    // Implementation for creating property
}

function updateProperty(property) {
    // Implementation for updating property
}

function deleteProperty(id) {
    // Implementation for deleting property
}

function loadProperties() {
    // Implementation for loading all properties
}

function displayProperties(properties) {
    // Implementation for displaying properties list
}

function editProperty(id) {
    // Implementation for editing property
}

function cancelEdit() {
    // Implementation for canceling edit
}

function showMessage(message, type) {
    // Implementation for showing messages
}

function resetForm() {
    // Implementation for resetting form
}