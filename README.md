# API Todolist avec Express.js

## Description
Une API REST simple pour gérer une liste de tâches (Todolist) avec Express.js, MongoDB et une architecture MVC.

## Prérequis

- Node.js installé
- MongoDB installé et en cours d'exécution

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Créer un fichier `.env` à la racine du projet :
```bash
MONGO_URI=mongodb://localhost:27017/todolist
PORT=3000
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
- **Paramètre** : id MongoDB de la tâche à supprimer

## Architecture MVC

```
Exo2/
├── config/
│   └── db.js                # Configuration MongoDB
├── models/
│   └── Task.js              # Modèle Mongoose - Schéma des tâches
├── views/
│   └── index.html           # Vue - Interface utilisateur
├── controllers/
│   └── taskController.js    # Contrôleur - Logique métier
├── routes/
│   └── taskRoutes.js        # Routes - Endpoints de l'API
├── server.js                # Point d'entrée
├── .env                     # Variables d'environnement
└── package.json             # Configuration du projet
```

## Technologies utilisées

- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **dotenv** - Gestion des variables d'environnement

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
curl -X DELETE http://localhost:3000/api/tasks/<ID_MONGODB>
```

## Base de données

Les tâches sont sauvegardées dans MongoDB. Chaque tâche contient :
- `_id` : Identifiant unique MongoDB
- `title` : Titre de la tâche
- `createdAt` : Date de création
- `updatedAt` : Date de dernière modification
