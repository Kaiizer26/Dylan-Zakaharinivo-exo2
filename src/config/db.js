const mongoose = require('mongoose');

async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI;
        
        // attendre la connexion MongoDB
        await mongoose.connect(mongoURI);
        
        console.log('✅ MongoDB connecté avec succès');
        
        mongoose.connection.on('error', function(err) {
            console.error('❌ Erreur MongoDB:', err);
        });
        
        mongoose.connection.on('disconnected', function() {
            console.log('⚠️  MongoDB déconnecté');
        });
        
    } catch (error) {
        console.error('❌ Erreur de connexion MongoDB:', error.message);
        throw error; // propager l'erreur pour arrêter le serveur
    }
}

module.exports = connectDB;
