import Response from "../utils/Responses";
import Rental from "../repos/DecorationRenting";

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
      type,
      paymentOption,
    } = req.body;
    console.log("body:", req.body);
    const idCard = req.file.filename;
    const results = await Rental.addOrder(
      firstName,
      lastName,
      email,
      phoneNumber,
      idCard,
      rentalId,
      rentalHours,
      price,
      rentOption,
      type,
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
exports.getDecorationRentOrders = async (req, res) => {
  try {
    const type = "decoration";
    const results = await Rental.getDecorationRentOrders(type);
    if (results === 0) {
      return Response.validationError(res, "Order chosen does not exist");
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
