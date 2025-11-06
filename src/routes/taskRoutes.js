//  définition des endpoints de l'api
const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tâches
 *     summary: Récupère toutes les tâches
 *     responses:
 *       200:
 *         description: Liste des tâches
 */
router.get('/', TaskController.displayTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tâches
 *     summary: Crée une nouvelle tâche
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tâche créée
 */
router.post('/', TaskController.addTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     tags:
 *       - Tâches
 *     summary: Supprime une tâche
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tâche supprimée
 */
router.delete('/:id', TaskController.removeTask);

module.exports = router;
