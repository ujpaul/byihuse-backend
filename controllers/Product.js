import Product from "../repos/Product";
import Category from "../repos/Category";
import Department from "../repos/Department";
import Response from "../utils/Responses";
import Log from "../utils/Log";

exports.create = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      department,
      company,
      price,
      cost,
      vat,
      isMadeInRwanda,
      additionalServices,
      paymentMethod,
    } = req.body;
    const nameObj = JSON.parse(name);
    const descriptionObj = JSON.parse(description);
    const additionalServicesObj = JSON.parse(additionalServices);
    if (
      !req.files.picture1 ||
      !req.files.picture2 ||
      !req.files.picture3 ||
      !req.files.picture4
    ) {
      Log.save(
        req.user.firstName + " " + req.user.lastName,
        req.user.role,
        "create product: " + name.en + " failed because of pictures",
        "create product",
        "product",
        false
      );
      return Response.validationError(
        res,
        "please provide all four pictures: picture1, picture2, picture3, picture4"
      );
    }
    const pictures = {
      pic1: req.files.picture1[0].filename,
      pic2: req.files.picture2[0].filename,
      pic3: req.files.picture3[0].filename,
      pic4: req.files.picture4[0].filename,
    };
    const results = await Product.create(
      nameObj,
      descriptionObj,
      category,
      department,
      company,
      price,
      cost,
      isMadeInRwanda,
      vat,
      pictures,
      additionalServicesObj,
      paymentMethod
    );
    await Category.addProduct(category, results._id);
    await Department.addProduct(department, results._id);
    Log.save(
      req.user.firstName + " " + req.user.lastName,
      req.user.role,
      "create product: " + name.en,
      "create product",
      "product",
      true
    );
    Response.Success(res, 200, "Created successfully", results);
    console.log(results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};

exports.update = async (req, res) => {
  try {
    const {
      name,
      description,
      company,
      price,
      cost,
      vat,
      isMadeInRwanda,
      featured,
    } = req.body;
    const { productId } = req.params;
    const results = await Product.update(
      productId,
      name,
      description,
      price,
      cost,
      vat,
      isMadeInRwanda,
      featured
    );
    Log.save(
      req.user.firstName + " " + req.user.lastName,
      req.user.role,
      "update product: " + productId + ", " + name.en,
      "update product",
      "product",
      true
    );
    Response.Success(res, 200, "Updated successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const results = await Product.getProductDetails(productId);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const results = await Product.getAll();
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};

exports.getAllMadeInRwandaProducts = async (req, res) => {
  try {
    const results = await Product.getAllMadeInRwandaProducts();
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.searchProducts(keyword);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await Product.deleteProduct(id);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
