const db = require("../config/db");

const Product = {
  getAll: (callback) => {
    db.query("SELECT * FROM products", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM products WHERE id = ?", [id], callback);
  },

  add: (product, callback) => {
    const sql = `INSERT INTO products 
      (name, description, brand, price, category, releaseDate, productAvailable, stockQuantity, imagename, imagetype, imagedata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      product.name,
      product.description,
      product.brand,
      product.price,
      product.category,
      product.releaseDate,
      product.productAvailable,
      product.stockQuantity,
      product.imagename,
      product.imagetype,
      product.imagedata,
    ];
    db.query(sql, values, callback);
  },

  update: (id, product, callback) => {
    const sql = `UPDATE products SET 
      name=?, description=?, brand=?, price=?, category=?, releaseDate=?, 
      productAvailable=?, stockQuantity=?, imagename=?, imagetype=?, imagedata=? 
      WHERE id=?`;
    const values = [
      product.name,
      product.description,
      product.brand,
      product.price,
      product.category,
      product.releaseDate,
      product.productAvailable,
      product.stockQuantity,
      product.imagename,
      product.imagetype,
      product.imagedata,
      id
    ];
    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM products WHERE id = ?", [id], callback);
  },

  search: (keyword, callback) => {
    const sql = `SELECT * FROM products WHERE 
      LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR 
      LOWER(brand) LIKE ? OR LOWER(category) LIKE ?`;
    const k = `%${keyword.toLowerCase()}%`;
    db.query(sql, [k, k, k, k], callback);
  }
};

module.exports = Product;
