const Category = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Wishlist = require('../models/wishlistModel');

exports.addcategory = async (req, res) => {
    console.log('Inside add category');
    const { category } = req.body;
    console.log(req.body);

    try {
        const exitingCategory = await Category.findOne({ category });
        if (!exitingCategory) {
            const newCategory = new Category({ category });
            await newCategory.save();
            res.status(200).json({ message: 'Category added success', newCategory });
        }
        else {
            res.status(402).json('Category already exist');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

exports.getCategory = async (req, res) => {
    console.log('Inside get category');
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.addsubcategory = async (req, res) => {
    console.log('Inside add subcategory');
    const { category, subCategory } = req.body;
    console.log('Received category:', category);
    console.log('Received subCategory:', subCategory);
    try {
        const exitingCategory = await Category.findById(category)
        console.log(category);

        if (exitingCategory) {
            const newSubCategory = new SubCategory({ subCategory, category: exitingCategory.category });
            await newSubCategory.save();
            res.status(200).json({ message: 'SubCategory add Success', newSubCategory });
        }
        else {
            res.status(404).json('Invalid category');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

exports.getSubCategory = async (req, res) => {
    console.log('Inside all product');
    try {
        const subcategory = await SubCategory.find();
        res.status(200).json(subcategory);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

exports.addproduct = async (req, res) => {
    console.log('Inside add product');
    const { productname, category, subCategory, variants } = req.body;
    console.log('Add product request:', req.body);
    //  const UploadedImages=[];
    const UploadedImages = req.files.map(item => item.filename);
    console.log(UploadedImages);
    const parsedVariants = JSON.parse(variants);
    try {
        const categoryy = await Category.findOne({ category });
        if (categoryy) {
            const subcategory = await SubCategory.findOne({ subCategory })
            if (subcategory) {
                const newproduct = new Product({ productname, category: categoryy.category, subCategory: subcategory.subCategory, UploadedImages, variants: parsedVariants });
                await newproduct.save();
                res.status(200).json({ message: 'Product added success', newproduct });
                console.log('Found category:', categoryy);
console.log('Found subcategory:', subcategory);
            }
            else {
                res.status(404).json('Invalid subcategory for the selected category')
            }
        }
        else {
            res.status(404).json('Invalid Category');
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getproduct = async (req, res) => {
    console.log('Inside all product');
    searchKey = req.query.search;
    try {
        const query = { productname: { $regex: searchKey, $options: 'i' } }
        const product = await Product.find(query);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

exports.viewproduct = async (req, res) => {
    console.log('Inside view product');
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

exports.updateproduct = async (req, res) => {
    console.log('Inside edit product');
    const { id } = req.params;
    const { productname, category, subCategory, variants } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, { productname, category, subCategory, variants }, { returnDocument: 'after', runValidators: true });
        if (product) {
            res.status(200).json({ message: 'Update success', product });
        }
        else {
            res.status(404).json('Product not found');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

exports.addwishlist = async (req, res) => {
    console.log('Inside add wishlist');

    const { email } = req.payload;
    const { productId, productname, price, image } = req.body;

    try {
        const wishlist = await Wishlist.findOne({ email, productId });

        if (wishlist) {
            return res.status(409).json('Already added to wishlist');
        }
        const product = await Product.findById(productId);
        const newWishlist = new Wishlist({ email, productId: product._id, productname: product.productname, price: product.variants[0]?.price, image: product.UploadedImages[0] });

        await newWishlist.save();

        return res.status(201).json({ message: 'Product added to wishlist successfully', newWishlist });

    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.getWishlist = async (req, res) => {
    console.log('Inside get wishlist');
    try {
        const product = await Wishlist.find();
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

exports.filtersubcategory = async (req, res) => {
    console.log('Inside filter subcategory');
    const { subCategory } = req.query;
    try {
        const product = await Product.find({ subCategory })
        res.status(200).json(product)
    }
    catch (err) {
        res.status(500).json(err);
    }
}

exports.deleteWishlistProduct = async (req, res) => {
    console.log('Inside delet product');
    const { id } = req.query;
    try {
        const product = await Wishlist.findByIdAndDelete(id);
        res.status(200).json('Product deleted success');
    }
    catch (err) {
        res.status(500).json(err);
    }
}