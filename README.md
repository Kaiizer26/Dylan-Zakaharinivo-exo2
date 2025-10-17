# API Todolist avec Express.js

## Description
Une API REST simple pour gérer une liste de tâches (Todolist) avec Express.js, MongoDB, MySQL et une architecture MVC. Les tâches sont sauvegardées simultanément dans MongoDB et MySQL.

## Prérequis

- Node.js installé
- MongoDB installé et en cours d'exécution
- MySQL installé et en cours d'exécution

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Créer un fichier `.env` à partir du fichier `.env.sample` :

**Windows (PowerShell)** :
```powershell
Copy-Item .env.sample .env
```

**Linux/Mac** :
```bash
cp .env.sample .env
```

Le fichier `.env` doit contenir :
```bash
MONGO_URI=mongodb://localhost:27017/todolist
PORT=3000

# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=todolist
```

3. Créer la base de données MySQL :
```sql
CREATE DATABASE todolist;
```
(La table `tasks` sera créée automatiquement au démarrage du serveur)

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
│   ├── db.js                # Configuration MongoDB
│   └── mysql.js             # Configuration MySQL
├── models/
│   ├── Task.js              # Modèle Mongoose - Schéma des tâches
│   └── TaskMySQL.js         # Modèle MySQL - Gestion des tâches
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
 )- **MySQL** - Base de données relationnelle
- **Mongoose** - ODM pour MongoDB
- **mysql2** - Driver MySQL pour Node.js
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

## Bases de données

Les tâches sont sauvegardées **simultanément** dans MongoDB et MySQL.

### MongoDB
Chaque tâche contient :
- `_id` : Identifiant unique MongoDB
- `title` : Titre de la tâche
- `createdAt` : Date de création
- `updatedAt` : Date de dernière modification

### MySQL
Table `tasks` avec les colonnes :
- `id` : Identifiant auto-incrémenté
- `mongo_id` : Référence à l'ID MongoDB
- `title` : Titre de la tâche
- `created_at` : Date de création
- `updated_at` : Date de dernière modification
