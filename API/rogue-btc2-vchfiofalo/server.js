require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const playerRoutes = require('./routes/players.routes');
const gameRoutes = require('./routes/games.routes');
const adminRoutes = require('./routes/admin.routes');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/auth', authRoutes);
app.use('/players', playerRoutes);
app.use('/games', gameRoutes);
app.use('/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));