# API Todolist avec Express.js

## Description
Une API REST simple pour gérer une liste de tâches (Todolist) avec Express.js, MongoDB, PostgreSQL et une architecture MVC. L'application peut utiliser soit MongoDB soit PostgreSQL selon la configuration.

## Prérequis

- Node.js installé
- MongoDB installé et en cours d'exécution (si vous utilisez MongoDB)
- PostgreSQL installé et en cours d'exécution (si vous utilisez PostgreSQL)

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
PORT=3000

# Choix de la base de données : "mongodb" ou "postgres"
DB_TYPE=mongodb

# Configuration MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/todolist

# Configuration PostgreSQL
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=votre_mot_de_passe
PG_DATABASE=todolist
PG_PORT=5432
```

3. Si vous utilisez PostgreSQL, créer la base de données :
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
├── src/
│   ├── config/
│   │   ├── db.js                # Configuration MongoDB
│   │   └── postgres.js          # Configuration PostgreSQL
│   ├── models/
│   │   ├── Task.js              # Modèle Mongoose - Schéma des tâches
│   │   └── TaskPostgreSQL.js    # Modèle PostgreSQL - Gestion des tâches
│   ├── controllers/
│   │   └── taskController.js    # Contrôleur - Logique métier
│   ├── routes/
│   │   └── taskRoutes.js        # Routes - Endpoints de l'API
│   └── server.js                # Point d'entrée
├── .env                         # Variables d'environnement
├── package.json                 # Configuration du projet
└── README.md                    # Documentation
```

## Technologies utilisées

- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **PostgreSQL** - Base de données relationnelle
- **Mongoose** - ODM pour MongoDB
- **pg** - Driver PostgreSQL pour Node.js
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

L'application peut utiliser **soit MongoDB soit PostgreSQL** selon la valeur de `DB_TYPE` dans le fichier `.env`.

### MongoDB
Chaque tâche contient :
- `_id` : Identifiant unique MongoDB
- `title` : Titre de la tâche
- `createdAt` : Date de création
- `updatedAt` : Date de dernière modification

### PostgreSQL
Table `tasks` avec les colonnes :
- `id` : Identifiant auto-incrémenté (SERIAL)
- `title` : Titre de la tâche (VARCHAR)
- `created_at` : Date de création (TIMESTAMP)

## Basculer entre MongoDB et PostgreSQL

Pour changer de base de données, modifiez la variable `DB_TYPE` dans le fichier `.env` :

**Pour utiliser MongoDB :**
```bash
DB_TYPE=mongodb
```

**Pour utiliser PostgreSQL :**
```bash
DB_TYPE=postgres
```
