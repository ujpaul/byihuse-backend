import Response from "../utils/Responses";
import Rental from "../repos/Renting";

exports.rentalOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      rentalHours,
      rentOption,
      rentalId,
      price,
      destination,
      paymentOption,
    } = req.body;
    const contract = req.files.contract[0].filename;
    const idCard = req.files.idCard[0].filename;
    const licence = req.files.licence[0].filename;
    const destObj = JSON.parse(destination);
    const results = await Rental.addOrder(
      firstName,
      lastName,
      email,
      phoneNumber,
      idCard,
      contract,
      licence,
      rentalId,
      rentalHours,
      price,
      destObj,
      rentOption,
      paymentOption
    );
    if (results === 0) {
      return Response.validationError(res, "Please try again");
    }
    if (results === -1) {
      return Response.validationError(
        res,
        "Error calculating total ammount, please try again. If this error persists please clear your cart and try again"
      );
    }
    Response.Success(res, 200, "submitted successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.rentOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      rentalHours,
      rentalDays,
      rentalId,
      driver,
      price,
      destination,
      paymentOption,
    } = req.body;
    const destObj = JSON.parse(destination);
    const driverId = req.files.driverId[0].filename;
    const driverLicence = req.files.driverLicence[0].filename;
    const forDriver = Object.values(JSON.parse(driver));
    forDriver.push(driverId);
    forDriver.push(driverLicence);
    const driverObj = {};
    driverObj.firstName = forDriver[0];
    driverObj.phone = forDriver[2];
    driverObj.lastName = forDriver[3];
    driverObj.drivingLicence = forDriver[4];
    driverObj.idCard = forDriver[5];
    console.log("For driver:", driverObj);
    const results = await Rental.rentOrder(
      firstName,
      lastName,
      email,
      phoneNumber,
      driverObj,
      rentalId,
      rentalHours,
      rentalDays,
      price,
      destObj,
      paymentOption
    );
    if (results === 0) {
      console.log("results error", results);
      return Response.validationError(res, "Please try again");
    }
    if (results === -1) {
      return Response.validationError(
        res,
        "Error calculating total ammount, please try again. If this error persists please clear your cart and try again"
      );
    }
    Response.Success(res, 200, "submitted successfully", results);
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
exports.getRentalByCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const results = await Rental.getRentalByCategory(category);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getRentalById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await Rental.getRentalById(id);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getAllRentalOrders = async (req, res) => {
  try {
    const results = await Rental.getAllRentalOrders();
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.rentAndReturnCar = async (req, res) => {
  const { id, available, type } = req.body;
  try {
    const results = await Rental.rentAndReturnCar(id, available, type);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getRentAndReturnCar = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await Rental.getRentAndReturnCar(id);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
