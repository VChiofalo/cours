const express = require('express');
const app = express();

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Le serveur est lancé sur http://localhost:${PORT}`));