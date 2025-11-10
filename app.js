// application principale

const express = require('express');
const path = require('path');
const cors = require('cors');
const taskRoutes = require('./src/routes/taskRoutes');
const authRoutes = require('./src/routes/authRoutes');
const auth = require('./src/middleware/auth');

// créer l'application Express
const app = express();

// Configuration CORS avec options
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'], // Origines autorisées
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers autorisés
    credentials: true // Permet l'envoi de cookies
}));

// middleware pour parser le JSON
app.use(express.json());

// servir les fichiers statiques du dossier views
app.use(express.static(path.join(__dirname, 'views')));

// route de base - afficher la page HTML
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Routes publiques (sans authentification)
app.use('/api/auth', authRoutes);

// Routes protégées (avec authentification)
app.use('/api/tasks', auth, taskRoutes);

// utiliser les routes pour les tâches
app.use('/api/tasks', taskRoutes);

// exporter l'application
module.exports = app;
