// server.js
// Backend Node app: serves static files and handles simple APIs

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// ---------- Middleware ----------

// Allow JSON bodies in POST requests (needed for our Adobe form POST)
app.use(express.json());

// Serve static files from the "public" folder
// e.g. /index.html, /style.css, /adobe-form.html, /adobe-form.js
app.use(express.static(path.join(__dirname, 'public')));

// ---------- Simple example route ----------

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Node backend!' });
});

// ---------- New route: handle "Send to Adobe Sign" requests ----------

// This is called by adobe-form.js via fetch('/api/adobe-sign/create-agreement', { ... })
app.post('/api/adobe-sign/create-agreement', (req, res) => {
    const { fullName, email, notes } = req.body;

    console.log('New agreement request received:');
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Notes:', notes);

    // Fake "agreement created" response
    const mockAgreementId = 'AGREEMENT-' + Date.now();

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
