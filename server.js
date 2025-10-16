// serveur - point d'entrée de l'application

require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// connecter à la base de données
connectDB();

// créer l'application express
const app = express();

// middleware pour parser le json
app.use(express.json());

// servir les fichiers statiques du dossier views
app.use(express.static(path.join(__dirname, 'views')));

// route de base - afficher la page html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// utiliser les routes pour les tâches
app.use('/api/tasks', taskRoutes);

// définir le port
const PORT = process.env.PORT;

// démarrer le serveur
app.listen(PORT, function() {
    console.log('===================================');
    console.log('Serveur démarré avec succès !');
    console.log('Port: ' + PORT);
    console.log('URL: http://localhost:' + PORT);
    console.log('===================================');
});
