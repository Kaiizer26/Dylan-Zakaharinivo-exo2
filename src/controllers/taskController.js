const Task = require('../models/Task');
const TaskPostgreSQL = require('../models/TaskPostgreSQL');

// determiner quelle base de données utiliser
const DB_TYPE = process.env.DB_TYPE || 'mongodb';

class TaskController {
    // afficher toutes les tâches
    static async displayTasks(req, res) {
        try {
            let allTasks;
            
            if (DB_TYPE === 'postgres') {
                allTasks = await TaskPostgreSQL.getAll();
            } else {
                allTasks = await Task.find();
            }
            
            res.json({
                success: true,
                count: allTasks.length,
                tasks: allTasks,
                database: DB_TYPE
            });
        } catch (error) {
            console.error('❌ Erreur displayTasks:', error.message);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des tâches',
                error: error.message
            });
        }
    }

    // ajouter une tâche
    static async addTask(req, res) {
        const title = (req.body && req.body.title) || req.query.title || req.get('x-task-title');

        // minimal validation
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ success: false, message: 'Le titre est requis' });
        }

        const cleanTitle = title.trim();

        try {
            let newTask;

            if (DB_TYPE === 'postgres') {
                newTask = await TaskPostgreSQL.add(cleanTitle);
                // return the created row
            } else {
                newTask = await Task.create({ title: cleanTitle });
            }

            return res.status(201).json({ success: true, task: newTask, database: DB_TYPE });
        } catch (error) {
            console.error('addTask error:', error && error.message ? error.message : error);
            return res.status(500).json({ success: false, message: 'Impossible d\'ajouter la tâche', error: error.message || String(error) });
        }
    }

    // supprimer une tâche
    static async removeTask(req, res) {
        const id = req.params.id;
        
        // validation de l'ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID de la tâche manquant'
            });
        }

        try {
            let deletedTask;
            
            if (DB_TYPE === 'postgres') {
                // supprimer de PostgreSQL
                deletedTask = await TaskPostgreSQL.remove(id);
            } else {
                // supprimer de MongoDB
                deletedTask = await Task.findByIdAndDelete(id);
            }

            if (deletedTask) {
                res.json({
                    success: true,
                    message: `Tâche supprimée avec succès de ${DB_TYPE === 'postgres' ? 'PostgreSQL' : 'MongoDB'}`,
                    task: deletedTask,
                    database: DB_TYPE
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Tâche non trouvée'
                });
            }
        } catch (error) {
            console.error('❌ Erreur removeTask:', error.message);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression de la tâche',
                error: error.message
            });
        }
    }
}

module.exports = TaskController;
