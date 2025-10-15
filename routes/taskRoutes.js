// routes - définition des endpoints de l'api

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// get /api/tasks - afficher toutes les tâches
router.get('/', taskController.displayTasks);

// post /api/tasks - ajouter une nouvelle tâche
router.post('/', taskController.addTask);

// delete /api/tasks/:id - supprimer une tâche
router.delete('/:id', taskController.removeTask);

module.exports = router;
