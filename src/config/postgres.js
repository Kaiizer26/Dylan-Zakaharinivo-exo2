const { Pool } = require('pg');

// créer le pool immédiatement avec la configuration
const pool = new Pool({
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'postgres',
    database: process.env.PG_DATABASE || 'todolist',
    port: process.env.PG_PORT || 5432,
    max: 20, // nombre maximum de connexions dans le pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// gestion des erreurs du pool
pool.on('error', function(err) {
    console.error('❌ Erreur inattendue du pool PostgreSQL:', err);
    process.exit(-1);
});

async function connectPostgreSQL() {
    try {
        // tester la connexion
        const client = await pool.connect();
        console.log('✅ PostgreSQL connecté avec succès');
        console.log('📊 Base de données:', process.env.PG_DATABASE || 'todolist');
        client.release();
        
        // créer la table si elle n'existe pas
        await createTable();
    } catch (err) {
        console.error('❌ Erreur de connexion PostgreSQL:', err.message);
        console.error('💡 Vérifiez que PostgreSQL est démarré et que les credentials sont corrects');
        throw err;
    }
}

async function createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    try {
        await pool.query(query);
        console.log('✅ Table "tasks" créée ou existe déjà');
    } catch (err) {
        console.error('❌ Erreur création table:', err.message);
        throw err;
    }
}

function getPool() {
    if (!pool) {
        throw new Error('❌ Le pool PostgreSQL n\'est pas initialisé');
    }
    return pool;
}

// fonction pour fermer proprement le pool
async function closePool() {
    if (pool) {
        await pool.end();
        console.log('🔌 Pool PostgreSQL fermé');
    }
}

module.exports = { connectPostgreSQL, getPool, closePool };
