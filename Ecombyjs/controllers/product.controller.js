const Product = require("../models/product.model");
const fs = require("fs");

exports.getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getProductById = (req, res) => {
  Product.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length) return res.status(404).send("Product not found");
    res.json(results[0]);
  });
};

exports.addProduct = (req, res) => {
  const product = JSON.parse(req.body.product);
  const file = req.file;
  product.imagename = file.originalname;
  product.imagetype = file.mimetype;
  product.imagedata = file.buffer;

  Product.add(product, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, ...product });
  });
};

exports.getProductImage = (req, res) => {
  Product.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length) return res.status(404).send("Image not found");

    const product = results[0];
    res.set("Content-Type", product.imagetype);
    res.send(product.imagedata);
  });
};

exports.updateProduct = (req, res) => {
  const product = JSON.parse(req.body.product);
  const file = req.file;
  product.imagename = file.originalname;
  product.imagetype = file.mimetype;
  product.imagedata = file.buffer;

  Product.update(req.params.id, product, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send("Product not found");
    res.send("Product updated successfully");
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send("Product not found");
    res.send("Product deleted successfully");
  });
};

exports.searchProduct = (req, res) => {
  const keyword = req.query.keyword;
  Product.search(keyword, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};
