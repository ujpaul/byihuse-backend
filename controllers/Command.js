import Command from "../repos/Command";
import Category from "../repos/Category";
import Department from "../repos/Department";
import Response from "../utils/Responses";
import Log from "../utils/Log";
import send from "../utils/SendEmail";

exports.create = async (req, res) => {
  try {
    const { names, phone, email, product, details, amount } = req.body;
    const results = await Command.create(
      names,
      phone,
      email,
      product,
      details,
      amount
    );
    send.sendMail(email, "Command received", "email", names);
    Response.Success(res, 200, "Command submitted successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};

exports.confirmedReceivedCommand = async (req, res) => {
  try {
    const { names, phone, email, product, operatorNames } = req.body;
    const results = await Command.confirmedReceivedCommand(
      names,
      phone,
      email,
      product,
      operatorNames
    );
    send.sendMail(email, "Command received", "email", names);
    Response.Success(res, 200, "Command submitted successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};

exports.assignCommandToCustomer = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      department,
      company,
      price1,
      price2,
      price3,
      totalPrice,
      cost,
      vat,
      commandOwner,
      isMadeInRwanda,
    } = req.body;
    console.log("body:", req.body);
    const nameObj = JSON.parse(name);
    const descriptionObj = JSON.parse(description);
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
    const results = await Command.assignCommandToCustomer(
      nameObj,
      descriptionObj,
      category,
      department,
      company,
      price1,
      price2,
      price3,
      totalPrice,
      cost,
      isMadeInRwanda,
      vat,
      commandOwner,
      pictures
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

exports.getCommand = async (req, res) => {
  try {
    const results = await Command.getCommand();
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getApprovedCommand = async (req, res) => {
  try {
    const results = await Command.getApprovedCommand();
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getApprovedCommandForClient = async (req, res) => {
  const { email } = req.body;
  try {
    const results = await Command.getApprovedCommandForCustomer(email);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
