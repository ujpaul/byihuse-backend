import Housing from "../models/Housing";
import Order from "../models/HousingOrder";
import sendEmail from "../utils/SendEmail";
import got from "got";

let amnt = 0;
let sts = "";
let tracknbr = "";
exports.request = async (names, email, phone, type, contract, status) => {
  sts = status;
  try {
    if (type === "Category I") {
      amnt = 10000;
    } else {
      amnt = 20000;
    }
    const odr = new Housing({
      names,
      email,
      phone,
      type,
      contract,
    });
    await odr.save();
    let response = null;
    let momoEmail = null;
    email ? (momoEmail = email) : (momoEmail = "noemail@byihuse.rw");

    const { body } = await got.post(
      "https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda",
      {
        json: {
          tx_ref: odr._id,
          amount: amnt,
          currency: "RWF",
          email: momoEmail,
          name: names,
          phone_number: phone,
          redirect_url: "https://byihuse.rw/#/en/session/thank-you-housing",
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
    const res = Object.assign(odr._doc, response);
    console.log("response:", response);
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
    let odr = "";
    if (sts === "Phase 1") {
      odr = await Housing.findById(orderId);
      if (!odr) return 0; //error code for anavailable order
    }
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
      let res = "";
      //update customer Order
      if (sts === "Phase 1") {
        //saving Lawyer records
        const amount = body.data.amount;
        // creating tracking order number
        var txt = odr._id;
        var numb = txt.toString().match(/\d/g);
        numb = numb.join("");
        res = await Housing.updateMany(
          {
            _id: odr._id,
          },
          {
            $set: {
              totalPaid: amount,
              paymentStatus: sts + " Fully Paid",
              trackNumber: numb,
            },
          }
        );
        // Sending email to the customer
        sendEmail.sendMail(
          odr.email,
          "Order received",
          `Dear ${odr.names} your request has been received. You can use this Tracking Number: ${numb} to follow up construction process. Thank you for working with us.`
        );
      } else {
        console.log("hey YO MY TURN");
        const odr = await Housing.find({ trackNumber: tracknbr });
        let totalamnt = 0;
        console.log("res:", odr);
        console.log("tracking number:", tracknbr);
        totalamnt = parseInt(odr[0].totalPaid) + parseInt(body.data.amount);
        console.log("total paid:", odr[0].totalPaid);
        console.log("total amount:", body.data.amount);
        res = await Housing.updateMany(
          {
            _id: odr[0]._id,
          },
          {
            $set: {
              totalPaid: totalamnt,
              paymentStatus: sts + " Fully Paid",
            },
          }
        );
        // Sending email to the customer
        sendEmail.sendMail(
          odr[0].email,
          `Dear ${odr[0].names} your payment of ${sts} of your house was well received, Thank you for working with us.`
        );
        sendEmail.sendMail(
          "jpbusiness250@gmail.com",
          "Phase paid",
          `${odr[0].names} has paid ${sts} of house`
        );
      }

      return res;
    } else {
      return -1; //payment verfication errors
    }
  } catch (err) {
    throw err;
  }
};

exports.payPhases = async (names, email, phone, type, status, trackNumber) => {
  sts = status;
  tracknbr = trackNumber;
  try {
    if (type === "Category I") {
      amnt = 6000;
    } else {
      amnt = 6000;
    }
    const odr = new Order({
      names,
      email,
      phone,
      type,
      status,
      trackNumber,
    });
    await odr.save();
    let response = null;
    let momoEmail = null;
    email ? (momoEmail = email) : (momoEmail = "noemail@byihuse.rw");

    const { body } = await got.post(
      "https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda",
      {
        json: {
          tx_ref: odr._id,
          amount: amnt,
          currency: "RWF",
          email: momoEmail,
          name: names,
          phone_number: phone,
          redirect_url: "https://byihuse.rw/#/en/session/thank-you-housing",
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
    const res = Object.assign(odr._doc, response);
    console.log("response:", response);
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
exports.getConstructionProcess = async (tracknbr) => {
  try {
    return await Housing.find({ trackNumber: tracknbr })
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
