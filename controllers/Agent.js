import Agent from "../repos/Agent";
import bcrypt from "bcrypt";
import Response from "../utils/Responses";
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      type,
      password,
      businessAddress,
      tin,
      role,
    } = req.body;
    console.log("request body==>", req.body);
    let file = null;
    if (req.file) {
      file = req.file.filename;
    }
    const ipatante = file;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const results = await Agent.Register(
      firstName,
      lastName,
      email,
      phone,
      encryptedPassword,
      type,
      role,
      businessAddress,
      tin,
      ipatante
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
    const results = await Agent.verifyMoMoPayment(orderId, transactionId);
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
exports.getAgentBalance = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await Agent.getAgentBalance(id);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
