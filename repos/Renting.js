import Rent from "../models/Rental";
import RentalOrder from "../models/RentalOrder";
import RentPenalty from "../models/RentPenalty";
import CustomerRefund from "../models/CustomerRefund";
import { sendMail } from "../utils/SendEmail";
import got from "got";
exports.addOrder = async (
  firstName,
  lastName,
  email,
  phone,
  idCard,
  contract,
  drivingLicence,
  rental,
  rentalHours,
  totalAmountExpected,
  destination,
  rentOption,
  paymentOption
) => {
  try {
    const odr = new RentalOrder({
      firstName,
      lastName,
      email,
      phone,
      idCard,
      contract,
      drivingLicence,
      rental,
      rentalHours,
      totalAmountExpected,
      destination,
      rentOption,
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
            redirect_url: "https://byihuse.rw/#/en/session/thank-you-renting",
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
exports.rentOrder = async (
  firstName,
  lastName,
  email,
  phone,
  driver,
  rental,
  rentingHours,
  rentOption,
  totalAmountExpected,
  destination,
  paymentOption
) => {
  try {
    const odr = new RentalOrder({
      firstName,
      lastName,
      email,
      phone,
      driver,
      rental,
      rentingHours,
      rentOption,
      totalAmountExpected,
      destination,
      paymentOption,
    });
    await odr.save();
    const rentalItem = await Rent.findById(rental);
    if (!rentalItem) return 0;
    const amnt = rentalItem.price * rentingHours;
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
            phone_number: phoneNumber,
            redirect_url: "https://byihuse.rw/#/en/session/thank-you-renting",
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
      const customerSalary = await CustomerRefund.find({ email: odr.email });
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
      sendMail.sendMail(
        odr.email,
        "Order received",
        "Thank you for making request to our platform byihuse.rw, your request has been received.Thanks"
      );
      sendEmail.sendMail(
        "jpbusiness250@gmail.com",
        "Command Paid",
        `${odr.firstName} ${odr.lastName} has made car rent order`
      );
      return res;
    } else {
      return -1; //payment verfication errors
    }
  } catch (err) {
    throw err;
  }
};

exports.getAll = async (req, res) => {
  try {
    const rentals = await Rent.find({ property: "Cars", available: true });
    return rentals;
  } catch (err) {
    throw err;
  }
};
exports.getRentalByCategory = async (category) => {
  try {
    const rentals = await Rent.find({ property: category, available: true });
    return rentals;
  } catch (err) {
    throw err;
  }
};
exports.getRentalById = async (id) => {
  try {
    const rentals = await Rent.findById(id);
    return rentals;
  } catch (err) {
    throw err;
  }
};
exports.getAllRentalOrders = async () => {
  try {
    return await RentalOrder.find({ paymentStatus: "Paid" })
      .populate("rental", ["name", "available"])
      .exec()
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
exports.rentAndReturnCar = async (id, available, type) => {
  try {
    const res = await Rent.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        available: available,
      }
    );

    // Check if person rented car return it on time, if not penalty charges apply
    let updated = null;
    if (type === "rent") {
      const pickTime = new Date().getTime();
      const penalty = new RentPenalty({
        rental: id,
        pickTime: new Date(pickTime),
      });
      await penalty.save();
    } else {
      const time = await RentPenalty.find({ rental: id });
      if (time[0].rentOption === "hours") {
        const returnTime = new Date().getTime();
        const sevenPm = new Date(time[0].pickTime).setHours(19);
        const returnTimeHours = new Date(returnTime).getHours();
        const sevenPmHours = new Date(sevenPm).getHours();
        if (sevenPmHours - returnTimeHours > 0) {
          console.log("Its okay no penalty");
        } else {
          const difference = returnTimeHours - sevenPmHours;
          const penalty = difference * 10000;
          updated = await RentPenalty.findByIdAndUpdate(
            {
              _id: time[0]._id,
            },
            {
              returnTime: new Date(returnTime),
              penalty: penalty,
            }
          );
        }
      } else {
        const returnTime = new Date().getTime();
        const supposedReturnDate =
          new Date(returnTime).getDate() + time[0].rentOption;
        const returnDate = new Date(returnTime).getDate();
        if (supposedReturnDate - returnDate > 0) {
          console.log("Its okay no penalty");
        } else {
          const difference = returnDate - supposedReturnDate;
          const penalty = difference * 24 * 10000;
          updated = await RentPenalty.findByIdAndUpdate(
            {
              _id: time[0]._id,
            },
            {
              returnTime: new Date(returnTime),
              penalty: penalty,
            }
          );
        }
      }
    }
    let response = null;
    if (type === "return") {
      response = await RentPenalty.find({ _id: updated._id });
      return response;
    } else {
      return res;
    }
  } catch (error) {
    throw error;
  }
};
exports.getRentAndReturnCar = async (id) => {
  try {
    return await RentPenalty.find({ rental: id });
  } catch (error) {
    throw error;
  }
};
