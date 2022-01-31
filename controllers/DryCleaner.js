import DryCleaner from "../repos/DryCleaner";
import Response from "../utils/Responses";

let prod = null;
let disc = 0;
exports.Order = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      id,
      phoneNumber,
      streetNumber,
      city,
      country,
      agentCode,
      paymentOption,
      MoMoPhoneNumber,
      products,
      delivery,
      totalAmmount,
      discount,
      express,
    } = req.body;
    console.log("request body:", req.body);
    const results = await DryCleaner.addOrder(
      firstName,
      lastName,
      email,
      id,
      phoneNumber,
      streetNumber,
      city,
      country,
      agentCode,
      paymentOption,
      MoMoPhoneNumber,
      products,
      delivery,
      totalAmmount,
      express
    );
    // if (!results)
    //     return Response.validationError(res, "check your inputs again");
    prod = products;
    disc = discount;
    if (results === 0) {
      console.log("results error", results);
      return Response.validationError(
        res,
        "Some of the products you are ordering do not exist in our stores anymore, Please remove them and try again"
      );
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
// exports.updateStatus = async (req, res) => {
//   try {
//     const { status, comment } = req.body;
//     const { orderId } = req.params;

//     const results = await Order.updateStatus(
//       orderId,
//       status,
//       comment,
//       req.user
//     );
//     if (!results)
//       return Response.validationError(res, "order chosen does not exist");
//     Response.Success(res, 200, "updated successfully", results);
//   } catch (err) {
//     console.log(err);
//     Response.InternalServerError(
//       res,
//       "We are having issues! please try again soon"
//     );
//   }
// };

exports.verifyMoMoPayment = async (req, res) => {
  try {
    const { orderId, transactionId, firstName, lastName } = req.body;

    const results = await DryCleaner.verifyMoMoPayment(orderId, transactionId, {
      firstName,
      lastName,
      role: "CLIENT",
    });
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
      "We are having issues! please try again soon"
    );
  }
};

exports.paidCash = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { amount } = req.body;

    const results = await Order.paidCash(orderId, amount, req.user);
    if (!results)
      return Response.validationError(res, "order chosen does not exist");
    Response.Success(res, 200, "updated successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.create = async (req, res) => {
  try {
    const { name, price, type } = req.body;
    const results = await DryCleaner.addService(name, price, type);
    Response.Success(
      res,
      200,
      "Dry cleaner serice added successfully",
      results
    );
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getAllServices = async (req, res) => {
  try {
    const results = await DryCleaner.getAllServices();
    Response.Success(res, 200, "Data fetched successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getServiceByType = async (req, res) => {
  try {
    const { type } = req.params;
    const results = await DryCleaner.getServiceByType(type);
    Response.Success(res, 200, "Data fetched successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getCustomerOrder = async (req, res) => {
  const { trackNumber } = req.params;
  try {
    const results = await DryCleaner.getCustomerOrder(trackNumber);
    Response.Success(res, 200, "Data fetched successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const results = await DryCleaner.getAllOrders();
    Response.Success(res, 200, "Data fetched successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.updateStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const results = await DryCleaner.updateStatus(orderId, status);
    Response.Success(res, 200, "Status updated successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
