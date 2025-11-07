const { pool } = require('../config/postgres');

class UserPostgreSQL {
    static async findOne(criteria) {
        try {
            const query = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
            const result = await pool.query(query, [criteria.email]);
            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la recherche de l\'utilisateur:', error);
            throw error;
        }
    }

    static async create(userData) {
        try {
            const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
            const values = [userData.name, userData.email, userData.password];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
            throw error;
        }
    }
}

module.exports = UserPostgreSQL;