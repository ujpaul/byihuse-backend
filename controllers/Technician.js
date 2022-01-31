import Tech from "../repos/Technician";
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
      level,
      paymentOption,
    } = req.body;
    console.log("Request body:", req.body);
    const cv = req.files.cv[0].filename;
    const passport = req.files.passport[0].filename;
    const workedOnImage = req.files.previous[0].filename;
    const diploma = req.files.diploma[0].filename;
    const results = await Tech.addOrder(
      names,
      idNumber,
      email,
      phoneNumber,
      province,
      district,
      type,
      level,
      cv,
      passport,
      workedOnImage,
      diploma,
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
    console.log("transactions:", req.body);
    const results = await Tech.verifyMoMoPayment(
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

    const results = await Tech.paidCash(orderId, amount, req.user);
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
exports.getTechnicianByType = async (req, res) => {
  const { type } = req.params;
  try {
    const results = await Tech.getTechnicianByType(type);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getTechnicianById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await Tech.getTechnicianById(id);
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getAllTechnicians = async (req, res) => {
  try {
    const results = await Tech.getAllTechnicians();
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.getAllTechniciansOrder = async (req, res) => {
  try {
    const results = await Tech.getAllTechniciansOrder();
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
exports.orderTechnician = async (req, res) => {
  try {
    const {
      names,
      email,
      phoneNumber,
      type,
      experience,
      workPlace,
      details,
      paymentOption,
    } = req.body;
    const results = await Tech.orderTechnician(
      names,
      email,
      phoneNumber,
      type,
      experience,
      workPlace,
      details,
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
exports.verifyTechnicianOrderPayment = async (req, res) => {
  try {
    const { orderId, transactionId } = req.body;
    const results = await Tech.verifyTechnicianOrderPayment(
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
