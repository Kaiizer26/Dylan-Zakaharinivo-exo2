// application principale

const express = require('express');
const path = require('path');
const taskRoutes = require('./src/routes/taskRoutes');

// créer l'application Express
const app = express();

// middleware pour parser le JSON
app.use(express.json());

// servir les fichiers statiques du dossier views
app.use(express.static(path.join(__dirname, 'views')));

// route de base - afficher la page HTML
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// utiliser les routes pour les tâches
app.use('/api/tasks', taskRoutes);

// exporter l'application
module.exports = app;
