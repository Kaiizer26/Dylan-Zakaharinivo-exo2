class Task {
    // propriétés statiques pour stocker les données
    static tasks = [];
    static nextId = 1;

    // récupérer toutes les tâches
    static getAll() {
        return this.tasks;
    }

    // ajouter une nouvelle tâche
    static add(title) {
        const newTask = {
            id: this.nextId,
            title: title
        };
        this.tasks.push(newTask);
        this.nextId++;
        return newTask;
    }

    // supprimer une tâche par son id
    static remove(id) {
        const index = this.tasks.findIndex(task => task.id === parseInt(id));
        if (index !== -1) {
            const deletedTask = this.tasks.splice(index, 1);
            return deletedTask[0];
        }
        return null;
    }
}

module.exports = Task;
