const mongoose = require('mongoose');
const Task = require('../src/models/Task');

describe('Task Model Test', () => {
    beforeAll(async () => {
        // Connexion à une base de données de test
        await mongoose.connect('mongodb://localhost:27017/tasktest', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(async () => {
        // Nettoyage de la base de données et déconnexion
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Nettoyage de la collection avant chaque test
        await Task.deleteMany({});
    });

    // Test de création d'une tâche valide
    it('should create & save task successfully', async () => {
        const validTask = new Task({
            title: 'Faire les courses'
        });
        const savedTask = await validTask.save();
        
        expect(savedTask._id).toBeDefined();
        expect(savedTask.title).toBe('Faire les courses');
        expect(savedTask.createdAt).toBeDefined();
        expect(savedTask.updatedAt).toBeDefined();
    });

    // Test de validation - tâche sans titre
    it('should fail to save task without required title field', async () => {
        const taskWithoutTitle = new Task({});
        let err;

        try {
            await taskWithoutTitle.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.title).toBeDefined();
        expect(err.errors.title.kind).toBe('required');
    });
});
