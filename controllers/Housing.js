import Housing from "../repos/Housing";
import Response from "../utils/Responses";
exports.request = async (req, res) => {
  try {
    const { names, email, phone, type, status, trackNumber } = req.body;
    const contract = req.file.filename;
    const results = await Housing.request(
      names,
      email,
      phone,
      type,
      contract,
      status,
      trackNumber
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

exports.payPhases = async (req, res) => {
  try {
    const { names, email, phone, type, status, trackNumber } = req.body;
    const results = await Housing.payPhases(
      names,
      email,
      phone,
      type,
      status,
      trackNumber
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
    console.log("transactions:", req.body);
    const results = await Housing.verifyMoMoPayment(
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
exports.getConstructionProcess = async (req, res) => {
  const { truckingNumber } = req.params;
  try {
    const results = await Housing.getConstructionProcess(truckingNumber);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
