//  définition des endpoints de l'api
const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

// get /api/tasks - afficher toutes les tâches
router.get('/', TaskController.displayTasks);

// post /api/tasks - ajouter une nouvelle tâche
router.post('/', TaskController.addTask);

// delete /api/tasks/:id - supprimer une tâche
router.delete('/:id', TaskController.removeTask);

module.exports = router;
