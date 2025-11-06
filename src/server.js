// serveur - point d'entrée de l'application

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { connectPostgreSQL } = require('./config/postgres');
const taskRoutes = require('./routes/taskRoutes');

// déterminer quelle base de données utiliser
const DB_TYPE = process.env.DB_TYPE || 'mongodb';

// fonction asynchrone pour démarrer le serveur
async function startServer() {
    try {
        // connecter à la base de données choisie
        if (DB_TYPE === 'postgres') {
            console.log(' Connexion à PostgreSQL...');
            await connectPostgreSQL();
        } else {
            console.log(' Connexion à MongoDB...');
            await connectDB(); // attendre la connexion MongoDB
        }

        // créer l'application express
        const app = express();

        // middlewares pour parser le body AVANT les routes
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // route de base
        app.get('/', function(req, res) {
            res.json({
                message: 'API TodoList - Bienvenue',
                endpoints: {
                    getTasks: 'GET /api/tasks',
                    addTask: 'POST /api/tasks',
                    deleteTask: 'DELETE /api/tasks/:id'
                },
                database: DB_TYPE
            });
        });

        // utiliser les routes pour les tâches
        app.use('/api/tasks', taskRoutes);

        // middleware pour les routes non trouvées
        app.use(function(req, res) {
            res.status(404).json({
                success: false,
                message: 'Route non trouvée'
            });
        });

        // middleware de gestion des erreurs
        app.use(function(err, req, res, next) {
            console.error('Erreur serveur:', err);
            res.status(500).json({
                success: false,
                message: 'Erreur interne du serveur',
                error: err.message
            });
        });

        // définir le port
        const PORT = process.env.PORT || 3000;

        // démarrer le serveur
        app.listen(PORT, function() {
            console.log('===================================');
            console.log(' Serveur démarré avec succès !');
            console.log(' Port:', PORT);
            console.log(' URL: http://localhost:' + PORT);
            console.log(' Base de données:', DB_TYPE === 'postgres' ? 'PostgreSQL' : 'MongoDB');
            console.log('===================================');
        });
    } catch (error) {
        console.error(' Erreur au démarrage du serveur:', error.message);
        process.exit(1);
    }
}

// démarrer le serveur
startServer();
