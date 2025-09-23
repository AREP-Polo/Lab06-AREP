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

    if (!formData.address || !formData.price || !formData.size || !formData.description) {
        showMessage('All fields are required.', 'error');
        return;
    }

    if (document.getElementById('propertyId').value) {
        updateProperty(formData);
    } else {
        createProperty(formData);
    }
}

function getFormData() {
    return {
        address: document.getElementById('address').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        size: parseInt(document.getElementById('size').value),
        description: document.getElementById('description').value.trim()
    };
}

function createProperty(property) {
    showLoading();
    fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(property)
    })
        .then(response => {
            hideLoading();
            if (response.ok) {
                showMessage('Property created successfully.', 'success');
                resetForm();
                loadProperties();
            } else {
                response.text().then(text => showMessage(text || 'Failed to create property.', 'error'));
            }
        })
        .catch(error => {
            hideLoading();
            showMessage('Error: ' + error.message, 'error');
        });
}

function updateProperty(property) {
    const id = document.getElementById('propertyId').value;
    showLoading();
    fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(property)
    })
        .then(response => {
            hideLoading();
            if (response.ok) {
                showMessage('Property updated successfully.', 'success');
                resetForm();
                loadProperties();
            } else {
                response.text().then(text => showMessage(text || 'Failed to update property.', 'error'));
            }
        })
        .catch(error => {
            hideLoading();
            showMessage('Error: ' + error.message, 'error');
        });
}

function deleteProperty(id) {
    if (confirm('Are you sure you want to delete this property?')) {
        showLoading();
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                hideLoading();
                if (response.ok) {
                    showMessage('Property deleted successfully.', 'success');
                    loadProperties();
                } else {
                    response.text().then(text => showMessage(text || 'Failed to delete property.', 'error'));
                }
            })
            .catch(error => {
                hideLoading();
                showMessage('Error: ' + error.message, 'error');
            });
    }
}

function loadProperties() {
    showLoading();
    fetch(API_BASE_URL)
        .then(response => {
            hideLoading();
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to load properties');
            }
        })
        .then(data => displayProperties(data))
        .catch(error => {
            hideLoading();
            showMessage('Error loading properties: ' + error.message, 'error');
        });
}

function displayProperties(properties) {
    const list = document.getElementById('propertiesList');
    list.innerHTML = '';
    properties.forEach(property => {
        const item = document.createElement('div');
        item.className = 'property-item';
        item.innerHTML = `
            <h3>${property.address}</h3>
            <p>Price: $${property.price}</p>
            <p>Size: ${property.size} sq ft</p>
            <p>Description: ${property.description}</p>
            <div class="property-actions">
                <button onclick="editProperty(${property.id})">Edit</button>
                <button onclick="deleteProperty(${property.id})" style="background-color: #f44336;">Delete</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function editProperty(id) {
    showLoading();
    fetch(`${API_BASE_URL}/${id}`)
        .then(response => {
            hideLoading();
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Property not found');
            }
        })
        .then(property => {
            document.getElementById('propertyId').value = property.id;
            document.getElementById('address').value = property.address;
            document.getElementById('price').value = property.price;
            document.getElementById('size').value = property.size;
            document.getElementById('description').value = property.description;
            document.getElementById('submitBtn').textContent = 'Update Property';
            document.getElementById('cancelBtn').style.display = 'inline-block';
        })
        .catch(error => {
            hideLoading();
            showMessage('Error loading property: ' + error.message, 'error');
        });
}

function cancelEdit() {
    resetForm();
}

function showMessage(message, type) {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = message;
    msgDiv.className = `message ${type}`;
    msgDiv.style.display = 'block';
    setTimeout(() => {
        msgDiv.style.display = 'none';
    }, 5000);
}

function resetForm() {
    document.getElementById('propertyForm').reset();
    document.getElementById('propertyId').value = '';
    document.getElementById('submitBtn').textContent = 'Add Property';
    document.getElementById('cancelBtn').style.display = 'none';
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}