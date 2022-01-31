import Order from "../repos/Lawyers";
import Response from "../utils/Responses";
exports.lawyersOrder = async (req, res) => {
  try {
    const {
      names,
      idNumber,
      email,
      phoneNumber,
      province,
      district,
      type,
      paymentOption,
    } = req.body;
    console.log("Request body:", req.body);
    const document = req.files.document[0].filename;
    const image = req.files.image[0].filename;
    console.log("document:", document);
    const results = await Order.addOrder(
      names,
      idNumber,
      email,
      phoneNumber,
      province,
      district,
      type,
      document,
      image,
      paymentOption
    );
    console.log("response:", results);
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
    const results = await Order.verifyMoMoPayment(
      orderId,
      transactionId
      //     {
      //   firstName,
      //   lastName,
      //   role: "CLIENT",
      // }
    );
    if (results === 0) {
      return Response.validationError(res, "Order chosen does not exist");
    }
    if (results === -1) {
      console.log("verification failed results:", results);
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
exports.getAllLawyers = async (req, res) => {
  try {
    const results = await Order.getAllLawyers();
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getLawyerByDistrict = async (req, res) => {
  const { keyword, type } = req.params;
  try {
    const results = await Order.getLawyerByDistrict(keyword, type);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
