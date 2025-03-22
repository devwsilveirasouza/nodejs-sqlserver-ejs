const sql = require('mssql');
const db = require('../models/db');

// Listar todos os produtos
exports.getAll = async (req, res) => {
  try {
    const pool = await db.getConnection();
    const result = await pool.request().query('SELECT * FROM produtos ORDER BY id DESC');
    res.render('index', { 
      title: 'Lista de Produtos', 
      produtos: result.recordset,
      success: req.query.success
    });
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).send('Erro ao carregar a página');
  }
};

// Renderizar página de criação de produto
exports.createForm = (req, res) => {
  res.render('create', { title: 'Novo Produto' });
};

// Salvar novo produto
exports.create = async (req, res) => {
  try {
    const { name, description, supplier, categorie, price, quantity_min, quantity_max, stock } = req.body;
    
    const pool = await db.getConnection();
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('description', sql.NVarChar, description || null)
      .input('supplier', sql.NVarChar, supplier || null)
      .input('categorie', sql.NVarChar, categorie || null)
      .input('price', sql.Decimal(10, 2), price)
      .input('quantity_min', sql.Int, quantity_min || null)
      .input('quantity_max', sql.Int, quantity_max || null)
      .input('stock', sql.Int, stock)
      .query(`
        INSERT INTO produtos (name, description, supplier, categorie, price, quantity_min, quantity_max, stock)
        VALUES (@name, @description, @supplier, @categorie, @price, @quantity_min, @quantity_max, @stock)
      `);
    
    res.redirect('/?success=Produto+adicionado+com+sucesso');
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(500).send('Erro ao adicionar produto');
  }
};

// Renderizar página de detalhes do produto
exports.details = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await db.getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM produtos WHERE id = @id');
    
    if (result.recordset.length > 0) {
      res.render('details', { 
        title: 'Detalhes do Produto', 
        produto: result.recordset[0] 
      });
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } catch (err) {
    console.error('Erro ao buscar detalhes do produto:', err);
    res.status(500).send('Erro ao carregar detalhes');
  }
};

// Renderizar página de edição do produto
exports.editForm = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await db.getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM produtos WHERE id = @id');
    
    if (result.recordset.length > 0) {
      res.render('edit', { 
        title: 'Editar Produto', 
        produto: result.recordset[0] 
      });
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } catch (err) {
    console.error('Erro ao buscar produto para edição:', err);
    res.status(500).send('Erro ao carregar formulário de edição');
  }
};

// Atualizar produto
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, supplier, categorie, price, quantity_min, quantity_max, stock } = req.body;
    
    const pool = await db.getConnection();
    await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, name)
      .input('description', sql.NVarChar, description || null)
      .input('supplier', sql.NVarChar, supplier || null)
      .input('categorie', sql.NVarChar, categorie || null)
      .input('price', sql.Decimal(10, 2), price)
      .input('quantity_min', sql.Int, quantity_min || null)
      .input('quantity_max', sql.Int, quantity_max || null)
      .input('stock', sql.Int, stock)
      .query(`
        UPDATE produtos 
        SET name = @name, 
            description = @description, 
            supplier = @supplier, 
            categorie = @categorie, 
            price = @price, 
            quantity_min = @quantity_min, 
            quantity_max = @quantity_max,
            stock = @stock
        WHERE id = @id
      `);
    
    res.redirect('/?success=Produto+atualizado+com+sucesso');
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).send('Erro ao atualizar produto');
  }
};

// Excluir produto
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    const pool = await db.getConnection();
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM produtos WHERE id = @id');
    
    res.redirect('/?success=Produto+excluído+com+sucesso');
  } catch (err) {
    console.error('Erro ao excluir produto:', err);
    res.status(500).send('Erro ao excluir produto');
  }
};