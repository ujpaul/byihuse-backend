import Tech from "../models/Technician";
import requestedTechnician from "../models/requestedTechnicians";
import TechOrder from "../models/TechniciansOrder";
import got from "got";
import sendEmail from "../utils/SendEmail";

let lawyernames = "";
let lawyeridNumber = "";
let lawyeremail = "";
let lawyerphoneNumber = "";
let lawyerprovince = "";
let lawyerdistrict = "";
let lawyertype = "";
let lawyercv = "";
let lawyerpassport = "";
let lawyerworkedOnImage = "";
let lawyerdiploma = "";
let lawyerlevel = "";
exports.addOrder = async (
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
) => {
  try {
    lawyernames = names;
    lawyeridNumber = idNumber;
    (lawyeremail = email), (lawyerphoneNumber = phoneNumber);
    lawyerprovince = province;
    lawyerdistrict = district;
    lawyerpassport = passport;
    lawyerworkedOnImage = workedOnImage;
    lawyerdiploma = diploma;
    lawyercv = cv;
    lawyertype = type;
    lawyerlevel = level;

    const odr = new requestedTechnician({
      names,
      email,
      phoneNumber,
      idNumber,
      province,
      district,
      totalAmmount: 6000,
      //   paymentLogs: payment,
    });
    const dataResponse = await odr.save();
    let response = null;
    if (paymentOption === "MOMO") {
      let momoEmail = null;
      email ? (momoEmail = email) : (momoEmail = "noemail@byihuse.rw");

      const { body } = await got.post(
        "https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda",
        {
          json: {
            tx_ref: odr._id,
            amount: 6000,
            currency: "RWF",
            email: momoEmail,
            name: names,
            phone_number: phoneNumber,
            redirect_url:
              "https://byihuse.rw/#/en/session/thank-you-technician",
            payment_options: "mobilemoneyrwanda",
            meta: "",
          },
          headers: {
            Authorization: "Bearer " + process.env.FLW_SEC_KEY,
          },
          responseType: "json",
        }
      );
      response = body;
    }
    const res = Object.assign(odr._doc, response);
    return res;
    // return {
    //     ...odr._doc,
    // 	payment: response
    // };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.verifyMoMoPayment = async (orderId, transactionId) => {
  try {
    const odr = await requestedTechnician.findById(orderId);
    if (!odr) return 0; //error code for anavailable order
    const { body } = await got.get(
      "https://api.flutterwave.com/v3/transactions/" +
        transactionId +
        "/verify",
      {
        headers: {
          Authorization: "Bearer " + process.env.FLW_SEC_KEY,
        },
        responseType: "json",
      }
    );

    if (
      body.status === "success" &&
      body.data.tx_ref === orderId &&
      body.data.currency === "RWF"
      //   &&body.data.amount === odr.totalAmmount
    ) {
      //saving Lawyer records
      const amount = body.data.amount;
      const technician = new Tech({
        names: lawyernames,
        idNumber: lawyeridNumber,
        email: lawyeremail,
        phone: lawyerphoneNumber,
        province: lawyerprovince,
        district: lawyerdistrict,
        type: lawyertype,
        cv: lawyercv,
        diploma: lawyerdiploma,
        workedOnImage: lawyerworkedOnImage,
        passport: lawyerpassport,
        level: lawyerlevel,
        amount,
      });
      sendEmail.sendMail(
        "jpbusiness250@gmail.com",
        "Command Paid",
        `${lawyernames} has registered as ${lawyertype} technician`
      );
      const res = await technician.save();
      return res;
    } else {
      return -1; //payment verfication errors
    }
  } catch (err) {
    throw err;
  }
};

exports.paidCash = async (orderId, amount, user) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) return null;

    return await Order.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        $inc: {
          totalAmountPaid: amount,
        },
        $push: {
          logs: {
            name: user.firstName + " " + user.lastName,
            role: user.role,
            action: "Received cash: " + amount,
            status: true,
            time: Date.now(),
          },
          paymentLogs: {
            receivedBy: user.firstName + " " + user.lastName,
            method: "CASH",
            amount: amount,
            time: Date.now(),
          },
        },
      },
      (err, success) => {
        if (err) {
          console.log(err);
          return false;
        }
        return success;
      }
    );
  } catch (err) {
    throw err;
  }
};
exports.getTechnicianByType = async (type) => {
  try {
    return await Tech.find({ type: type })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (error) {
    throw error;
  }
};
exports.getTechnicianById = async (id) => {
  try {
    return await Tech.find({ _id: id })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (error) {
    throw error;
  }
};
exports.getAllTechnicians = async () => {
  try {
    return await Tech.find({})
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (error) {
    throw error;
  }
};
let totalamnt = "";

exports.orderTechnician = async (
  names,
  email,
  phone,
  type,
  experience,
  workPlace,
  details,
  paymentOption
) => {
  try {
    if (workPlace === "kigali" && type === "barber") {
      totalamnt = 5000;
    } else if (workPlace === "kigali" && type !== "barber") {
      totalamnt = 15000;
    } else {
      totalamnt = 50000;
    }
    const odr = new TechOrder({
      names,
      email,
      phone,
      type,
      experience,
      workPlace,
      details,
      //   paymentLogs: payment,
    });
    await odr.save();
    let response = null;
    if (paymentOption === "MOMO") {
      let momoEmail = null;
      email ? (momoEmail = email) : (momoEmail = "noemail@byihuse.rw");

      const { body } = await got.post(
        "https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda",
        {
          json: {
            tx_ref: odr._id,
            amount: totalamnt,
            currency: "RWF",
            email: momoEmail,
            name: names,
            phone_number: phone,
            redirect_url:
              "https://byihuse.rw/#/en/session/thank-you-tech-order",
            payment_options: "mobilemoneyrwanda",
            meta: "",
          },
          headers: {
            Authorization: "Bearer " + process.env.FLW_SEC_KEY,
          },
          responseType: "json",
        }
      );
      response = body;
    }
    const res = Object.assign(odr._doc, response);
    return res;
    // return {
    //     ...odr._doc,
    // 	payment: response
    // };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.verifyTechnicianOrderPayment = async (orderId, transactionId) => {
  try {
    const odr = await TechOrder.findById(orderId);
    if (!odr) return 0; //error code for anavailable order
    const { body } = await got.get(
      "https://api.flutterwave.com/v3/transactions/" +
        transactionId +
        "/verify",
      {
        headers: {
          Authorization: "Bearer " + process.env.FLW_SEC_KEY,
        },
        responseType: "json",
      }
    );

    if (
      body.status === "success" &&
      body.data.tx_ref === orderId &&
      body.data.currency === "RWF"
      //   &&body.data.amount === odr.totalAmmount
    ) {
      //Updating technician order
      const amount = body.data.amount;
      const res = await TechOrder.updateMany(
        {
          _id: odr._id,
        },
        {
          $set: {
            amount: amount,
            paymentStatus: " Fully Paid",
          },
        }
      );
      // Sending email to the customer
      sendEmail.sendMail(
        odr.email,
        `Dear ${odr.names} your order has been received. We will be in touch shortly.`
      );
      return res;
    } else {
      return -1; //payment verfication errors
    }
  } catch (err) {
    throw err;
  }
};
exports.getAllTechniciansOrder = async () => {
  try {
    return await TechOrder.find({ paymentStatus: "FullyPaid" })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (error) {
    throw error;
  }
};
