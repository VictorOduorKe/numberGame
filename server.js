const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/shutdown', (req, res) => {
    exec('shutdown /s /t 10', (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${error.message}`);
            res.send("Error shutting down.");
            return;
        }
        res.send("⚠️ PC will shut down in 10 seconds! Click 'Cancel Shutdown' if needed.");
    });
});

app.get('/cancel-shutdown', (req, res) => {
    exec('shutdown /a', (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${error.message}`);
            res.send("Error canceling shutdown.");
            return;
        }
        res.send("✅ Snodehutdown canceled successfully!");
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
