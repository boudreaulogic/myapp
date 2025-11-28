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

