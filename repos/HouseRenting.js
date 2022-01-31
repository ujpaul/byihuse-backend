import Rent from "../models/Rental";
import RentalOrder from "../models/RentalOrder";
import customerRefund from "../models/CustomerRefund";
import sendEmail from "../utils/SendEmail";
import got from "got";
exports.addOrder = async (
  firstName,
  lastName,
  email,
  phone,
  idCard,
  rental,
  rentalHours,
  totalAmountExpected,
  rentOption,
  type,
  paymentOption
) => {
  try {
    const odr = new RentalOrder({
      firstName,
      lastName,
      email,
      phone,
      idCard,
      rental,
      rentalHours,
      totalAmountExpected,
      rentOption,
      type,
      paymentOption,
    });
    await odr.save();
    const rentalItem = await Rent.findById(rental);
    if (!rentalItem) return 0;
    const amnt = rentalItem.price * rentalHours;
    let response = null;
    if (paymentOption === "MOMO") {
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
            name: firstName + lastName,
            phone_number: phone,
            redirect_url:
              "https://byihuse.rw/#/en/session/thank-you-house-renting",
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
    const odr = await RentalOrder.findById(orderId);
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
      body.data.currency === "RWF" &&
      body.data.amount === odr.totalAmountExpected
    ) {
      const res = await RentalOrder.updateMany(
        {
          _id: odr._id,
        },
        {
          $set: {
            totalAmountPaid: odr.totalAmountExpected,
            paymentStatus: "Paid",
          },
        }
      );
      let refund = "";
      const rental = await Rent.findById(odr.rental);
      if (odr.rentOption === "hours") {
        refund = ((rental.price - rental.costPerHour) * 15) / 100;
      } else {
        refund = ((rental.pricePerDay - rental.costPerDay) * 15) / 100;
      }
      const customerSalary = await customerRefund.find({ email: odr.email });
      await customerRefund.updateMany(
        {
          _id: customerSalary[0]._id,
        },
        {
          $set: {
            refund: customerSalary[0].refund + refund,
          },
        }
      );
      sendEmail.sendMail(
        odr.email,
        "Order received",
        "Thank you for making request to our platform byihuse.rw, your request has been received.Thanks"
      );
      sendEmail.sendMail(
        "jpbusiness250@gmail.com",
        "House rent order",
        `${firstName} ${lastName} has made rent order`
      );
      return res;
    } else {
      return -1; //payment verfication errors
    }
  } catch (err) {
    throw err;
  }
};
exports.getHouseRentOrders = async (type) => {
  try {
    return await RentalOrder.find({ type: type })
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
