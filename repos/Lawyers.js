import Lawyers from "../models/Lawyers";
import requestedLawyers from "../models/RequestedLawyers";
import got from "got";

let lawyernames = "";
let lawyeridNumber = "";
let lawyeremail = "";
let lawyerphoneNumber = "";
let lawyerprovince = "";
let lawyerdistrict = "";
let lawyertype = "";
let lawyerdocument = "";
let lawyerimage = "";
exports.addOrder = async (
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
) => {
  try {
    lawyernames = names;
    lawyeridNumber = idNumber;
    (lawyeremail = email), (lawyerphoneNumber = phoneNumber);
    lawyerprovince = province;
    lawyerdistrict = district;
    lawyerdocument = document;
    lawyerimage = image;
    lawyertype = type;

    const odr = new requestedLawyers({
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
            redirect_url: "https://byihuse.rw/#/en/session/thank-you-lawyer",
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
    const odr = await requestedLawyers.findById(orderId);
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
      const lawyer = new Lawyers({
        names: lawyernames,
        idNumber: lawyeridNumber,
        email: lawyeremail,
        phone: lawyerphoneNumber,
        province: lawyerprovince,
        district: lawyerdistrict,
        type: lawyertype,
        document: lawyerdocument,
        picture: lawyerimage,
        amount,
      });
      const res = await lawyer.save();
      sendMail.sendMail(
        odr.email,
        "Request received",
        "Thank you for registering to our platform byihuse.rw, your request has been received.Thanks"
      );
      sendEmail.sendMail(
        "jpbusiness250@gmail.com",
        "lawyer registered",
        `${odr.names} has registered as a lawyer`
      );
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
exports.getAllLawyers = async () => {
  try {
    return await Lawyers.find()
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
exports.getLawyerByDistrict = async (district, type) => {
  try {
    return await Lawyers.find({ district: district, type: type })
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
