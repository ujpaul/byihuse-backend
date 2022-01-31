import Rental from "../repos/Rental";
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
      costPerDay,
      costPerHour,
      pricePerDay,
      isMadeInRwanda,
      property,
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
        "create rental: " + name.en + " failed because of pictures",
        "create rental",
        "rental",
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

    const results = await Rental.create(
      nameObj,
      descriptionObj,
      category,
      department,
      company,
      price,
      pricePerDay,
      costPerHour,
      costPerDay,
      isMadeInRwanda,
      property,
      pictures
    );
    Log.save(
      req.user.firstName + " " + req.user.lastName,
      req.user.role,
      "create rental: " + name.en,
      "create rental",
      "rental",
      true
    );
    Response.Success(res, 200, "Created successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};

exports.createCustomerProperty = async (req, res) => {
  try {
    const {
      names,
      email,
      phone,
      name,
      description,
      roadNumber,
      gateNumber,
      price,
      pricePerDay,
      property,
      type,
      upi,
      area,
      location,
      artistType,
      experience,
      artistDescription,
    } = req.body;
    console.log("body:", req.body);

    if (
      !req.files.picture1 ||
      !req.files.picture2 ||
      !req.files.picture3 ||
      !req.files.picture4 ||
      !req.files.picture5 ||
      !req.files.picture6
    ) {
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
      pic5: req.files.picture5[0].filename,
      pic6: req.files.picture6[0].filename,
    };
    const paymentOption = "MOMO";
    const results = await Rental.createCustomerProperty(
      names,
      email,
      phone,
      name,
      description,
      roadNumber,
      gateNumber,
      price,
      pricePerDay,
      property,
      type,
      upi,
      area,
      location,
      artistType,
      experience,
      artistDescription,
      pictures,
      paymentOption
    );
    Response.Success(res, 200, "Created successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};

exports.verifyMoMoPayment = async (req, res) => {
  try {
    const { orderId, transactionId } = req.body;
    const results = await Rental.verifyMoMoPayment(orderId, transactionId);
    if (results === 0) {
      return Response.validationError(res, "Order chosen does not exist");
    }
    if (results === -1) {
      return Response.validationError(
        res,
        "Payment can not be verified please try again later"
      );
    }
    Response.Success(res, 200, "updated successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      err
      // "We are having issues! please try again soon"
    );
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description, company, price, isMadeInRwanda, featured } =
      req.body;
    const { rentalId } = req.params;

    const nameObj = JSON.parse(name);
    const descriptionObj = JSON.parse(description);

    const results = await Rental.update(
      rentalId,
      nameObj,
      descriptionObj,
      company,
      price,
      isMadeInRwanda,
      featured
    );
    Log.save(
      req.user.firstName + " " + req.user.lastName,
      req.user.role,
      "update rental: " + rentalId + ", " + name.en,
      "update rental",
      "rental",
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

exports.getRentalDetails = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const results = await Rental.getRentalDetails(rentalId);
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
    const results = await Rental.getAll();
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getAllByCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const results = await Rental.getAllByCategory(category);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getHouseByCategory = async (req, res) => {
  const { category } = req.body;
  console.log("category:", category);
  try {
    const results = await Rental.getHouseByCategory(category);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
