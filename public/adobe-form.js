// adobe-form.js
// This script runs only on adobe-form.html
// It grabs the form data and sends it to our Node backend.

// Find the form and status text elements
const form = document.getElementById('agreementForm');
const statusEl = document.getElementById('status');

// Only continue if the form exists on this page
if (form) {
    form.addEventListener('submit', async (event) => {
        // Stop the page from reloading
        event.preventDefault();

        // Build a JS object from the form fields
        const formData = new FormData(form);
        const payload = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            notes: formData.get('notes'),
        };

        // Show the user we're working
        statusEl.textContent = 'Sending to backend...';

        try {
            // Send the data to our Node API as JSON
            const response = await fetch('/api/adobe-sign/create-agreement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Parse the JSON response from the server
            const data = await response.json();

            if (!response.ok) {
                // If the HTTP status is not 2xx, treat as error
                throw new Error(data.error || 'Server error');
            }

            // Show success and the mock agreement ID
            statusEl.textContent = `✅ Agreement created! ID: ${data.agreementId}`;
        } catch (err) {
            console.error('Error sending form:', err);
            statusEl.textContent = '❌ Something went wrong sending your agreement.';
        }
    });
}
