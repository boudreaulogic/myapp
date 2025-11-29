// Load Express (web server framework)
const express = require('express');

// Create an Express app instance
const app = express();

// Define what port the server runs on
const PORT = 3000;

// Tell Express to serve files from the "public" folder
app.use(express.static('public'));

// Example API route (backend endpoint)
app.get('/api/hello', (req, res) => {
    res.json({ message: "Hello from Node backend!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// server.js
// Backend Node app: serves static files and handles simple APIs

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// ---------- Middleware ----------

// Parse JSON request bodies (for POST / PUT requests)
app.use(express.json());

// Serve static files from the "public" folder
// e.g. /index.html, /style.css, /adobe-form.js
app.use(express.static('public'));

// ---------- Simple example route (from earlier) ----------

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Node backend!' });
});

// ---------- New route: handle "Send to Adobe Sign" requests ----------

// This is called by adobe-form.js via fetch('/api/adobe-sign/create-agreement', { ... })
app.post('/api/adobe-sign/create-agreement', (req, res) => {
    // Grab data from the form (sent as JSON)
    const { fullName, email, notes } = req.body;

    // At this stage, you could:
    // - validate the data
    // - save to database
    // - call Adobe Sign API
    // For now, we'll just log and return a mock response.

    console.log('New agreement request received:');
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Notes:', notes);

    // Fake "agreement created" response
    const mockAgreementId = 'AGREEMENT-' + Date.now();

    // Send JSON back to the browser
    res.json({
        success: true,
        agreementId: mockAgreementId,
        message: 'This is a mock Adobe Sign response (no real API call yet).',
    });
});

// ---------- Start the server ----------

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
