import Product from "../models/Product";

exports.create = async (
  name,
  description,
  category,
  department,
  company,
  price,
  cost,
  isMadeInRwanda,
  vat,
  pictures,
  additionalServices,
  paymentMethod
) => {
  try {
    const newProduct = await Product.create({
      name,
      description,
      category,
      department,
      company,
      price,
      cost,
      isMadeInRwanda,
      vat,
      pictures,
      additionalServices,
      paymentMethod,
    });
    return newProduct;
  } catch (err) {
    throw err;
  }
};
exports.update = async (
  productId,
  name,
  description,
  price,
  cost,
  vat,
  isMadeInRwanda,
  featured
) => {
  try {
    return await Product.updateMany(
      { _id: productId },
      { name, description, price, isMadeInRwanda, cost, vat, featured },
      (err, success) => {
        if (err) {
          console.log(err);
          return false;
        }
        return success;
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.getProductDetails = async (productId) => {
  try {
    return await Product.findById(productId)
      .populate("department")
      .populate("category")
      .populate("company")
      .exec()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (error) {
    throw error;
  }
};

exports.getAll = async () => {
  try {
    return await Product.find()
      .populate("department", "name")
      .populate("category", "name")
      .populate("company")
      .exec()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (error) {
    throw error;
  }
};

exports.searchProducts = async (keyword) => {
  try {
    return await Product.find({
      $or: [
        { "name.en": { $regex: keyword, $options: "i" } },
        { "name.fr": { $regex: keyword, $options: "i" } },
        { "name.kiny": { $regex: keyword, $options: "i" } },
        { "name.sw": { $regex: keyword, $options: "i" } },
      ],
    })
      .populate("department", "name")
      .populate("category", "name")
      .populate("company", "name")
      .exec()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (error) {
    throw error;
  }
};
exports.deleteProduct = async (id) => {
  try {
    return await Product.deleteOne({ _id: id })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (error) {
    throw error;
  }
};
