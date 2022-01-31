import User from "../models/User";
import sendEmail from "../utils/SendEmail";
import got from "got";
exports.Register = async (
  firstName,
  lastName,
  email,
  phone,
  password,
  agentType,
  role,
  businessAddress,
  tin,
  ipatante
) => {
  try {
    let code = null;
    code = 100000 + Math.round(Math.random() * 900000);
    const agentData = {
      code,
      balance: 0,
      approved: false,
      type: agentType,
      businessAddress,
      tin,
      ipatante,
      phone,
    };
    console.log("agent data type=====>", typeof agentData);
    const paymentOption = "MOMO";
    const odr = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      agentData,
      //   paymentLogs: payment,
    });
    console.log("fname=>", firstName);
    console.log("email=>", phone);
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
            amount: 11800,
            currency: "RWF",
            email: momoEmail,
            name: firstName,
            phone_number: phone,
            // redirect_url: "https://byihuse.rw/#/en/session/thank-you-agent",
            redirect_url: "http://localhost:8080/#/en/session/thank-you-agent",
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
    const odr = await User.findById(orderId);
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
      const res = await User.updateMany(
        {
          _id: odr._id,
        },
        {
          $set: {
            amountPaid: amount,
          },
        }
      );
      console.log("code", odr.agentData.code);
      sendEmail.sendMail(
        odr.email,
        "Registration successful",
        "agent",
        odr.firstName,
        odr.agentData.code
      );
      return res;
    } else {
      User.deleteOne({ _id: odr._id });
      return -1; //payment verfication errors
    }
  } catch (err) {
    throw err;
  }
};
exports.getAgentBalance = async (id) => {
  try {
    return await User.find({ _id: id })
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
