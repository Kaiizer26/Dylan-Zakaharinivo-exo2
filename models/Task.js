const mongoose = require('mongoose');

// définir le schéma de la tâche
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// créer le modèle
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
