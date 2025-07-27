const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear base de datos SQLite para memoria persistente
function initSQLiteMemory() {
  const dbPath = path.join(__dirname, '..', '.claude-flow', 'memory.sqlite');
  console.log('🗄️ Inicializando base de datos SQLite en:', dbPath);
  
  try {
    const db = new sqlite3.Database(dbPath);
    
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        // Crear tabla de conversaciones
        db.run(`
          CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            agent_type TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            metadata TEXT DEFAULT '{}'
          )
        `);
        
        // Crear tabla de estado del proyecto
        db.run(`
          CREATE TABLE IF NOT EXISTS project_state (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE NOT NULL,
            value TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        
        // Crear tabla de preferencias del usuario
        db.run(`
          CREATE TABLE IF NOT EXISTS user_preferences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            preference_key TEXT NOT NULL,
            preference_value TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, preference_key)
          )
        `);
        
        // Crear tabla de progreso de aprendizaje
        db.run(`
          CREATE TABLE IF NOT EXISTS learning_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            topic TEXT NOT NULL,
            level INTEGER DEFAULT 1,
            completed_lessons TEXT DEFAULT '[]',
            last_activity DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        
        // Insertar datos iniciales
        const stmt = db.prepare(`INSERT OR REPLACE INTO project_state (key, value) VALUES (?, ?)`);
        stmt.run('project_initialized', new Date().toISOString());
        stmt.run('memory_system_version', '1.0.0');
        stmt.run('agents_configured', JSON.stringify(['asistente', 'ejecutor', 'profesor']));
        stmt.finalize();
        
        console.log('✅ Base de datos SQLite inicializada correctamente');
        console.log('📊 Tablas creadas: conversations, project_state, user_preferences, learning_progress');
      });
      
      db.close((err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
    
  } catch (error) {
    console.error('❌ Error inicializando SQLite:', error.message);
    return false;
  }
}

// Verificar estado de la base de datos
function checkSQLiteStatus() {
  const dbPath = path.join(__dirname, '..', '.claude-flow', 'memory.sqlite');
  
  try {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
    
    return new Promise((resolve, reject) => {
      db.all(`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`, (err, tables) => {
        if (err) {
          reject(err);
          return;
        }
        
        console.log('📋 Tablas en la base de datos:');
        let tableCount = 0;
        
        if (tables.length === 0) {
          console.log('   - No hay tablas creadas');
          db.close();
          resolve(true);
          return;
        }
        
        tables.forEach((table, index) => {
          db.get(`SELECT COUNT(*) as count FROM ${table.name}`, (err, result) => {
            if (!err) {
              console.log(`   - ${table.name}: ${result.count} registros`);
            }
            tableCount++;
            
            if (tableCount === tables.length) {
              db.close();
              resolve(true);
            }
          });
        });
      });
    });
    
  } catch (error) {
    console.error('❌ Error verificando SQLite:', error.message);
    return Promise.resolve(false);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  console.log('🚀 Inicializando sistema de memoria SQLite...');
  
  initSQLiteMemory()
    .then((success) => {
      if (success) {
        console.log('\n🔍 Verificando estado...');
        return checkSQLiteStatus();
      }
    })
    .catch((error) => {
      console.error('❌ Error en la inicialización:', error.message);
    });
}

module.exports = {
  initSQLiteMemory,
  checkSQLiteStatus
};