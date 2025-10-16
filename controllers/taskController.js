const Task = require('../models/Task');

class TaskController {
    // afficher toutes les tâches
    static displayTasks(req, res) {
        const allTasks = Task.getAll();
        res.json({
            count: allTasks.length,
            tasks: allTasks
        });
    }

    // ajouter une tâche
    static addTask(req, res) {
        const title = req.body.title;
        
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Le titre de la tâche est requis'
            });
        }

        const newTask = Task.add(title);
        res.status(201).json({
            success: true,
            message: 'Tâche ajoutée avec succès',
            task: newTask
        });
    }

    // supprimer une tâche
    static removeTask(req, res) {
        const id = req.params.id;
        const deletedTask = Task.remove(id);

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
    }
}

module.exports = TaskController;
