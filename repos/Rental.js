import Rental from "../models/Rental";
import got from "got";
import sendEmail from "../utils/SendEmail";
exports.create = async (
  name,
  description,
  category,
  department,
  company,
  price,
  pricePerDay,
  costPerHour,
  costPerDay,
  isMadeInRwanda,
  property,
  pictures
) => {
  try {
    const newRental = await Rental.create({
      name,
      description,
      category,
      department,
      company,
      price,
      pricePerDay,
      costPerHour,
      costPerDay,
      isMadeInRwanda,
      property,
      pictures,
    });
    return newRental;
  } catch (err) {
    throw err;
  }
};
exports.createCustomerProperty = async (
  names,
  email,
  phone,
  name,
  description,
  roadNumber,
  gateNumber,
  price,
  pricePerDay,
  property,
  type,
  upi,
  area,
  location,
  artistType,
  experience,
  artistDescription,
  pictures,
  paymentOption
) => {
  try {
    const odr = new Rental({
      names,
      email,
      phone,
      name: {
        en: name,
      },
      description: {
        en: description,
      },
      roadNumber,
      gateNumber,
      price,
      pricePerDay,
      property,
      type,
      upi,
      area,
      location,
      artistType,
      experience,
      artistDescription,
      pictures,
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
            amount: 6000,
            currency: "RWF",
            email: momoEmail,
            name: names,
            phone_number: phone,
            redirect_url:
              "https://byihuse.rw/#/en/session/thank-you-customer-property",
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
    throw err;
  }
};
exports.verifyMoMoPayment = async (orderId, transactionId) => {
  try {
    const odr = await Rental.findById(orderId);
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
    ) {
      const res = await Rental.updateMany(
        {
          _id: odr._id,
        },
        {
          $set: {
            amount: body.data.amount,
            paymentStatus: "Paid",
          },
        }
      );
      sendEmail.sendMail(
        odr.email,
        "Property registered",
        "Thank you for registering your property to our platform byihuse.rw, your request has been received.Thanks"
      );
      sendEmail.sendMail(
        "jpbusiness250@gmail.com",
        "Property Registered",
        `${names}has registered ${odr.property} on byihuse platform`
      );
      return res;
    } else {
      return -1; //payment verfication errors
    }
  } catch (err) {
    throw err;
  }
};
exports.update = async (
  rentalId,
  name,
  description,
  company,
  price,
  isMadeInRwanda,
  featured
) => {
  try {
    return await Rental.findByIdAndUpdate(
      { _id: rentalId },
      { name, description, company, price, isMadeInRwanda, featured },
      (err, success) => {
        if (err) {
          console.log(err);
          return false;
        }
        return success;
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.getRentalDetails = async (rentalId) => {
  try {
    return await Rental.findById(rentalId)
      .populate("department", "name")
      .populate("category", "name")
      .populate("company", "name")
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

exports.getAll = async () => {
  try {
    return await Rental.find()
      .populate("department", "name")
      .populate("category", "name")
      .populate("company", "name")
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
exports.getAllByCategory = async (category) => {
  try {
    return await Rental.find({ category: category })
      .populate("department", "name")
      .populate("category", "name")
      .populate("company", "name")
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
exports.getHouseByCategory = async (category) => {
  try {
    return await Rental.find({ category: "House", type: category })
      .populate("department", "name")
      .populate("category", "name")
      .populate("company", "name")
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
