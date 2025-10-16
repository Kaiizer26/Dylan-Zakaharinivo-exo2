const mongoose = require('mongoose');

function connectDB() {
    const mongoURI = process.env.MONGO_URI;
    
    mongoose.connect(mongoURI);
    
    mongoose.connection.on('connected', function() {
        console.log('MongoDB connecté avec succès');
    });
    
    mongoose.connection.on('error', function(err) {
        console.log('Erreur MongoDB: ' + err);
    });
}

module.exports = connectDB;
