import Order from "../repos/CommandOrder";
import Response from "../utils/Responses";

let prod = null;
let disc = 0;
exports.commandOrder = async (req, res) => {
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
      installment,
    } = req.body;
    const results = await Order.addOrder(
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
      installment
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

    const results = await Order.verifyMoMoPayment(orderId, transactionId, {
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
    await Order.saveSoldProducts(prod, disc);
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
