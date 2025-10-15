# API Todolist avec Express.js

## Description
Une API REST simple pour gérer une liste de tâches (Todolist) avec Express.js et une architecture MVC.

## Installation

1. Installer les dépendances :
```bash
npm install
```

## Lancement

Démarrer le serveur :
```bash
npm start
```

Le serveur démarre sur : http://localhost:3000

## Endpoints de l'API

### 1. Afficher toutes les tâches
- **URL** : `GET /api/tasks`
- **Réponse** : Liste de toutes les tâches

### 2. Ajouter une tâche
- **URL** : `POST /api/tasks`
- **Body** : 
```json
{
  "title": "Ma nouvelle tâche"
}
```

### 3. Supprimer une tâche
- **URL** : `DELETE /api/tasks/:id`
- **Paramètre** : id de la tâche à supprimer

## Architecture MVC

```
Exo2/
├── models/
│   └── Task.js              # Modèle - Gestion des données
├── views/
│   └── index.html           # Vue - Interface utilisateur
├── controllers/
│   └── taskController.js    # Contrôleur - Logique métier
├── routes/
│   └── taskRoutes.js        # Routes - Endpoints de l'API
├── app.js                   # Configuration Express
├── server.js                # Point d'entrée
└── package.json             # Configuration du projet
```

## Test avec curl ou Postman

### Afficher les tâches
```bash
curl http://localhost:3000/api/tasks
```

### Ajouter une tâche
```bash
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d "{\"title\":\"Faire les courses\"}"
```

### Supprimer une tâche
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```
