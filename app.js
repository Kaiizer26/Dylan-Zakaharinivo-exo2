// Application principale Express

const express = require('express');
const path = require('path');
const taskRoutes = require('./src/routes/taskRoutes');

// Créer l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques du dossier views
app.use(express.static(path.join(__dirname, 'views')));

// Route de base - afficher la page HTML
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Utiliser les routes pour les tâches
app.use('/api/tasks', taskRoutes);

// Exporter l'application
module.exports = app;
