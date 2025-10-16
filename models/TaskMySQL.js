const { getPool } = require('../config/mysql');

class TaskMySQL {
    // ajouter une tâche dans MySQL
    static async add(mongoId, title) {
        const pool = getPool();
        const query = 'INSERT INTO tasks (mongo_id, title) VALUES (?, ?)';
        
        try {
            const [result] = await pool.query(query, [mongoId, title]);
            return result;
        } catch (error) {
            console.log('Erreur MySQL add: ' + error);
            throw error;
        }
    }

    // récupérer toutes les tâches
    static async getAll() {
        const pool = getPool();
        const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
        
        try {
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            console.log('Erreur MySQL getAll: ' + error);
            throw error;
        }
    }

    // supprimer une tâche
    static async remove(mongoId) {
        const pool = getPool();
        const query = 'DELETE FROM tasks WHERE mongo_id = ?';
        
        try {
            const [result] = await pool.query(query, [mongoId]);
            return result;
        } catch (error) {
            console.log('Erreur MySQL remove: ' + error);
            throw error;
        }
    }
}

module.exports = TaskMySQL;
