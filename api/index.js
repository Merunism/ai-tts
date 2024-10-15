const express = require('express');
const app = express();
// ... your other requires and middleware

// Your routes here
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

app.post('/api/generate-speech', async (req, res) => {
    // Your text-to-speech logic here
});

// Instead of app.listen(), use:
module.exports = app;
