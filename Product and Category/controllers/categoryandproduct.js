const { Category, Product } = require('../models');
const { where , Op} = require("sequelize");

const getAllCategoriesWithProducts = async (req, res) => {
  try {
    const {page , limit , search = ""} = req.body;

    const pagenum = parseInt(page) || 1;
    const limitnum = parseInt(limit) || 5;

    const offset = (pagenum - 1)  * limitnum;

    const {count , rows : categories } = await Category.findAndCountAll({
      where: {
        status: true, 
        ...(search&& {
          [Op.or] : [
            {category_name  :  { [Op.like]: `%${search}%` } },
            {description    :  { [Op.like]: `%${search}%` } },
          ]
        })
      },
      offset : offset,
      limit : limitnum,
      include: [
        {
          model: Product,
          as: 'products',
        },
      ],
    });

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: 'Active categories with products fetched successfully',
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching active categories with products:', error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};


const getAllProductswithCategories = async (req, res) => {
  try {
    const {page , limit , search = ""} = req.body;

    const pagenum = parseInt(page) || 1;
    const limitnum = parseInt(limit) || 5;

    const offset = (pagenum - 1)  * limitnum;

    const {count , rows : products } = await Product.findAndCountAll({
      where : {
         ...(search&& {
          [Op.or] : [
            {product_name  :  { [Op.like]: `%${search}%` } },
          ]
        })
      },
      offset : offset,
      limit : limitnum,
      include: [
        {
          model: Category,
          as: 'category',
        },
      ],
    });

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: 'Products with active categories fetched successfully',
      data: products,
    });
  } catch (error) {
    console.error('Error fetching active categories with products:', error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};


const getcategorybyid = async (req, res) => {
  try {

        const { page, limit } = req.body;

        const pagenum = parseInt(page) || 1;
        const limitnum = parseInt(limit) || 5;

        const offset = (pagenum - 1) * limitnum

        const category = await Category.findOne({
          where: { id: req.params.id, status: true },
          offset: offset,
          limit: limitnum,
          include: [
            {
              model: Product,
              as: "products",
            },
          ],
        });

        if(!category)
        {
          return res.status(400).json({
            statuscode: 400,
            status: false,
            message: "Category not found with this id",

          })
        }

        return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Category fetched successfully",
          category: {
            data: category,
          },
        });

  } catch (error) {
        return res.status(500).json({
          statuscode: 500,
          status: false,
          message: error.message,
        });
  }
};

const getproductbyid = async (req, res) => {
  try {

        const { page, limit } = req.body;

        const pagenum = parseInt(page) || 1;
        const limitnum = parseInt(limit) || 5;

        const offset = (pagenum - 1) * limitnum

        const product = await Product.findOne({
          where: { id: req.params.id },
          offset: offset,
          limit: limitnum,
          include: [
            {
              model: Category,
              as: "category",
            },
          ],
        });

        if(!product)
        {
          return res.status(400).json({
            statuscode: 400,
            status: false,
            message: "Product not found with this id",

          })
        }

        return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Product fetched successfully",
          product: {
            data: product,
          },
        });

  } catch (error) {
        return res.status(500).json({
          statuscode: 500,
          status: false,
          message: error.message,
        });
  }
};

const createCategoryWithProducts = async (req, res) => {
  try {
    const { category_name, description, products } = req.body;

    
    const newCategory = await Category.create({
      category_name,
      description,
    });

    
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'At least one product must be provided',
      });
    }

    
    const productsToInsert = products.map((product) => ({
      ...product,
      category_id: newCategory.id,
    }));

    const createdProducts = await Product.bulkCreate(productsToInsert);

  
    res.status(201).json({
      statusCode: 201,
      status: true,
      message: 'Category and products created successfully',
      data: {
        category: newCategory,
        products: createdProducts,
      },
    });
  } catch (error) {
    console.error('Error creating category and products:', error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};


const createProduct = async (req, res) => {
  try {
    const { category_id, product_name, price, stock_quantity } = req.body;


    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Category not found',
      });
    }

  
    const newProduct = await Product.create({
      category_id,
      product_name,
      price,
      stock_quantity,
    });

    res.status(201).json({
      statusCode: 201,
      status: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};


const UpdateCategory = async (req, res) => {
  try{
        const { category_name, description , status }  = req.body;
        const category = await Category.update({ category_name, description , status } ,
          { where : {id : req.body.id , status: true}},
         );

         if(category[0] === 0)
         {
            return res.status(400).json({
              statuscode: 400,
              status: false,
              message: "Category not found or already deleted",
            });
         }

         const updatedcategory = await Category.findOne({where : {id : req.body.id , status: true}});

         return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Category updated Successfully",
          data : updatedcategory,

         })
        
    }
    catch(error)
    {
      res.status(500).json({message: error.message});
    }
}

const UpdateProduct = async (req, res) => {
  try{
        const { category_id, product_name, price, stock_quantity }  = req.body;
        const product = await Product.update({ category_id, product_name, price, stock_quantity } ,
          { where : {id : req.body.id }},
         );

         if(product[0] === 0)
         {
            return res.status(400).json({
              statuscode: 400,
              status: false,
              message: "Product not found or already deleted",
            });
         }

         const updatedproduct = await Product.findOne({where : {id : req.body.id }});

         return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Product updated Successfully",
          data : updatedproduct,

         })
        
    }
    catch(error)
    {
      res.status(500).json({message: error.message});
    }
}

// Soft deleted
const DeleteCategory = async(req , res) => {
    try
    {
        const category = await Category.update({ status : false } , 
            { where : {id : req.body.id }}
        );

        if(category[0] === 0)
        {
            return res.status(404).json({
                statuscode: 404,
                status: false,
                message: "Category not found or already deleted",
            });
        }

        res.status(200).json({ 
            statuscode: 200,
            status: true,
            message : "Category deleted successsfully"
        });
    }
    catch(error)
    {
        res.status(500).json({ message : error.message});
    }

};

const DeleteProduct = async(req , res) => {
    try
    {
        const product = await Product.destroy(
            { where : {id : req.body.id }}
        );

        if(product[0] === 0)
        {
            return res.status(404).json({
                statuscode: 404,
                status: false,
                message: "Product not found or already deleted",
            });
        }

        res.status(200).json({ 
            statuscode: 200,
            status: true,
            message : "Product deleted successsfully"
        });
    }
    catch(error)
    {
        res.status(500).json({ message : error.message});
    }

};

module.exports = {
  getAllCategoriesWithProducts,
  getAllProductswithCategories,
  getcategorybyid,
  getproductbyid,
  createCategoryWithProducts,
  createProduct,
  UpdateCategory,
  UpdateProduct,
  DeleteCategory,
  DeleteProduct,
};
