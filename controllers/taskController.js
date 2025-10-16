const Task = require('../models/Task');

class TaskController {
    // afficher toutes les tâches
    static async displayTasks(req, res) {
        try {
            const allTasks = await Task.find();
            res.json({
                count: allTasks.length,
                tasks: allTasks
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des tâches'
            });
        }
    }

    // ajouter une tâche
    static async addTask(req, res) {
        const title = req.body.title;
        
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Le titre de la tâche est requis'
            });
        }

        try {
            const newTask = await Task.create({ title: title });
            res.status(201).json({
                success: true,
                message: 'Tâche ajoutée avec succès',
                task: newTask
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la création de la tâche'
            });
        }
    }

    // supprimer une tâche
    static async removeTask(req, res) {
        const id = req.params.id;
        
        try {
            const deletedTask = await Task.findByIdAndDelete(id);

            if (deletedTask) {
                res.json({
                    success: true,
                    message: 'Tâche supprimée avec succès',
                    task: deletedTask
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Tâche non trouvée'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression de la tâche'
            });
        }
    }
}

module.exports = TaskController;
