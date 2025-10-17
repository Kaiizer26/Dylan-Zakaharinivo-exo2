const { getPool } = require('../config/postgres');

class TaskPostgreSQL {
    // ajouter une tâche dans PostgreSQL
    static async add(title) {
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Le titre doit être une chaîne de caractères non vide');
        }

        const pool = getPool();
        const query = 'INSERT INTO tasks (title, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING *';
        
        try {
            const result = await pool.query(query, [title.trim()]);
            console.log('✅ Tâche ajoutée dans PostgreSQL:', result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error('❌ Erreur PostgreSQL add:', error.message);
            throw new Error(`Impossible d'ajouter la tâche: ${error.message}`);
        }
    }

    // récupérer toutes les tâches
    static async getAll() {
        const pool = getPool();
        const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
        
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('❌ Erreur PostgreSQL getAll:', error.message);
            throw new Error(`Impossible de récupérer les tâches: ${error.message}`);
        }
    }

    // récupérer une tâche par ID
    static async getById(id) {
        const pool = getPool();
        const query = 'SELECT * FROM tasks WHERE id = $1';
        
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0] || null;
        } catch (error) {
            console.error('❌ Erreur PostgreSQL getById:', error.message);
            throw new Error(`Impossible de récupérer la tâche: ${error.message}`);
        }
    }

    // mettre à jour une tâche
    static async update(id, title) {
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Le titre doit être une chaîne de caractères non vide');
        }

        const pool = getPool();
        const query = 'UPDATE tasks SET title = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
        
        try {
            const result = await pool.query(query, [title.trim(), id]);
            return result.rows[0] || null;
        } catch (error) {
            console.error('❌ Erreur PostgreSQL update:', error.message);
            throw new Error(`Impossible de mettre à jour la tâche: ${error.message}`);
        }
    }

    // supprimer une tâche
    static async remove(id) {
        const pool = getPool();
        const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
        
        try {
            const result = await pool.query(query, [id]);
            if (result.rows[0]) {
                console.log('✅ Tâche supprimée de PostgreSQL:', result.rows[0]);
            }
            return result.rows[0] || null;
        } catch (error) {
            console.error('❌ Erreur PostgreSQL remove:', error.message);
            throw new Error(`Impossible de supprimer la tâche: ${error.message}`);
        }
    }
}

module.exports = TaskPostgreSQL;
