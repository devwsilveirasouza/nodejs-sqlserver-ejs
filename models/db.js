const sql = require('mssql');

const config = {
  server: 'localhost',
  port: 1433,
  user: 'sa',
  password: 'MinhaSenhaForte@123',
  database: 'nodejs',
  options: {
    enableArithAbort: true,
    trustServerCertificate: true
  }
};

// Criação da tabela produtos se não existir
async function setupDatabase() {
  try {
    const pool = await sql.connect(config);
    
    const createTableQuery = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='produtos' AND xtype='U')
    CREATE TABLE produtos (
      id INT IDENTITY(1,1) PRIMARY KEY,
      name NVARCHAR(100) NOT NULL,
      description NVARCHAR(255),
      supplier NVARCHAR(100),
      categorie NVARCHAR(100),
      price DECIMAL(10, 2) NOT NULL,
      quantity_min INT,
      quantity_max INT,
      stock INT NOT NULL
    )`;
    
    await pool.request().query(createTableQuery);
    console.log('Banco de dados configurado com sucesso');
  } catch (err) {
    console.error('Erro ao configurar o banco de dados:', err);
  }
}

// Inicializa o banco de dados
setupDatabase();

module.exports = {
  getConnection: async () => {
    try {
      const pool = await sql.connect(config);
      return pool;
    } catch (err) {
      console.error('Erro na conexão com o banco de dados:', err);
      throw err;
    }
  }
};