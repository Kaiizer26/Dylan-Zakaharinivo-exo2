// model - gestion des données des tâches

let tasks = [];
let nextId = 1;

const Task = {
    // récupérer toutes les tâches
    getAll: function() {
        return tasks;
    },

    // ajouter une nouvelle tâche
    add: function(title) {
        const newTask = {
            id: nextId,
            title: title,
            completed: false
        };
        tasks.push(newTask);
        nextId++;
        return newTask;
    },

    // supprimer une tâche par son id
    remove: function(id) {
        const index = tasks.findIndex(task => task.id === parseInt(id));
        if (index !== -1) {
            const deletedTask = tasks.splice(index, 1);
            return deletedTask[0];
        }
        return null;
    }
};

module.exports = Task;
