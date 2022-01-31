import DryCleaner from "../models/DryCleaner";
import Order from "../models/DryCleanerOrder";
import sendEmail from "../utils/SendEmail";
import got from "got";
import User from "../models/User";
import globalConfigs from "../config/globals";

let finalCustomerRefund = 0;
let productPrice = 0;
let customerId = null;
exports.addOrder = async (
  firstName,
  lastName,
  email,
  id,
  phoneNumber,
  streetNumber,
  city,
  country,
  agentCode,
  paymentOption,
  MoMoPhoneNumber,
  products,
  delivery,
  totalAmmount,
  express
) => {
  try {
    const orderedProducts = [];
    let prod = null;
    let prodOrder = null;
    let totalPrice = 0;
    let totalQuantity = 0;
    let discount = 0;
    let cost = 0;
    let totalCost = 0;
    let profit = 0;
    let vat = 0;
    let taxOverProfit = 0;
    let customerRefund = 0;
    let profitAfterTax = 0;
    for (let product of products) {
      prod = await DryCleaner.findById(product._id);
      if (!prod) return 0; //error code for anavailable product
      if (express === "express") {
        productPrice = parseInt(prod.price * 2 * product.quantity);
      }
      cost = prod.cost * product.quantity;
      if (prod.vat === true) {
        vat += parseInt((productPrice * 18) / 100);
      } else {
        vat = 0;
      }
      totalQuantity += product.quantity;
      totalPrice += productPrice;
      totalCost += cost;
      if (totalQuantity > 11) {
        discount = (totalPrice * 3) / 100;
        totalPrice = totalPrice - discount;
      }
      // Calculating discount and customer refund
      let grossProfit = 0;
      grossProfit = parseInt(totalPrice) - parseInt(totalCost);
      profit = grossProfit - vat;
      taxOverProfit = (parseInt(profit) * 3) / 100;
      profitAfterTax = profit - taxOverProfit;
      customerRefund = (parseInt(profitAfterTax) * 15) / 100;
      finalCustomerRefund = customerRefund;
      customerId = id;
      // fname = firstName;
      // lname = lastName;

      prodOrder = {
        _id: prod._id,
        productPrice: prod.price,
        quantity: product.quantity,
      };
      orderedProducts.push(prodOrder);
    }
    // if (totalQuantity > 11) {
    //   if (parseInt(totalPrice) !== parseInt(totalAmmount)) return 0;
    // }
    // if (totalQuantity < 12) {
    //   if (parseInt(totalPrice) !== parseInt(totalAmmount)) return 0;
    // }
    let payment = [];
    let logs = [];
    if (paymentOption === "MOMO") {
      payment = [
        {
          amount: productPrice,
          time: Date.now(),
          method: "MOMO",
          receivedBy: null,
        },
      ];
      logs = {
        name: firstName + " " + lastName,
        role: "CLIENT",
        action: "MOMO payment",
        comment: "Initiated MOMO payment",
        status: true,
      };
    }
    const odr = new Order({
      firstName,
      lastName,
      email,
      phoneNumber,
      streetNumber,
      city,
      country,
      agentCode,
      paymentOption,
      MoMoPhoneNumber,
      products: orderedProducts,
      paymentLogs: payment,
      logs,
      delivery,
      totalAmmount: totalPrice,
      totalAmountPaid: 0,
      vat: vat,
      profitOverTax: taxOverProfit,
      customerRefund: customerRefund,
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
            amount: totalPrice,
            currency: "RWF",
            email: momoEmail,
            name: firstName + " " + lastName,
            phone_number: MoMoPhoneNumber,
            redirect_url:
              "https://byihuse.rw/#/en/session/thank-you-dry-cleaner",
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
exports.updateStatus = async (orderId, status, comment, user) => {
  try {
    const o = await Order.findById(orderId);
    if (!o) return null;

    const newOrder = await Order.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        status: {
          status,
          comment,
        },
        $push: {
          logs: {
            name: user.firstName + " " + user.lastName,
            role: user.role,
            action: status,
            comment: comment,
            status: true,
          },
        },
      },
      {
        new: true,
      }
    );
    if (status === "ORDER-SERVED-AND-CLOSED" && o.agentCode) {
      await User.findByIdAndUpdate(
        {
          "agentData.code": o.agentCode,
        },
        {
          $inc: {
            balance: o.totalAmountPaid * globalConfigs.agentPercentage,
          },
        }
      );
    }
    return newOrder;
  } catch (err) {
    throw err;
  }
};

exports.verifyMoMoPayment = async (orderId, transactionId) => {
  try {
    const odr = await Order.findById(orderId);
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
    body.data.customer["refund"] = finalCustomerRefund;
    body.data.customer["userId"] = customerId;
    console.log("Data amount", body.data.amount);

    if (
      body.status === "success" &&
      body.data.tx_ref === orderId &&
      body.data.currency === "RWF" &&
      body.data.amount === odr.totalAmmount
    ) {
      console.log("Amount:", body.data.amount);
      console.log("total Amount:", odr.totalAmmount);
      //saving customer refund fees

      // const customer = new Customer({
      //   refund: finalCustomerRefund,
      //   user: customerId,
      //   phone: body.data.customer.phone_number,
      //   email: body.data.customer.email,
      // });
      // customer.save();

      // creating tracking order number
      var txt = odr._id;
      var numb = txt.toString().match(/\d/g);
      numb = numb.join("");
      //update customer Order
      const commandUpdate = await Order.updateMany(
        {
          _id: odr._id,
        },
        {
          $set: {
            totalAmountPaid: odr.totalAmmount,
            paymentStatus: " Fully Paid",
            trackNumber: numb,
          },
        }
      );
      // Sending email to the customer
      sendEmail.sendMail(
        odr.email,
        "Order received",
        `Dear ${odr.firstName} ${odr.lastName} your order has been received. You can use this Tracking Number: ${numb} to follow up. Thank you for working with us.`
      );
      sendEmail.sendMail(
        "jpbusiness250@gmail.com",
        "Drycleaner Order",
        `${odr.firstName} ${odr.lastName} has made drycleaner order`
      );
      // const savedCustomer = await customer.save();
      // let updatedOrder = await Order.findByIdAndUpdate(
      //   {
      //     _id: orderId,
      //   },
      //   {
      //     totalAmountPaid: odr.totalAmmount,

      //     $push: {
      //       payment: {
      //         amount: odr.totalAmmount,
      //         time: Date.now(),
      //         method: "MOMO",
      //         receivedBy: null,
      //       },
      //       logs: {
      //         name: user.firstName + " " + user.lastName,
      //         role: user.role,
      //         action: "MOMO payment",
      //         comment: "verified MOMO payment",
      //       },
      //     },
      //   },
      //   {
      //     new: true,
      //   }
      // );
      return commandUpdate;
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
exports.addService = async (name, price, type) => {
  const newService = new DryCleaner({
    name,
    price,
    type,
  });
  try {
    return await newService.save();
  } catch (err) {
    throw err;
  }
};
exports.getAllServices = async () => {
  try {
    return await DryCleaner.find().catch((err) => {
      return err;
    });
  } catch (err) {
    throw err;
  }
};

exports.getServiceByType = async (type) => {
  try {
    return await DryCleaner.find({
      type: type,
    }).catch((err) => {
      return err;
    });
  } catch (err) {
    throw err;
  }
};
exports.getCustomerOrder = async (trackOrder) => {
  try {
    return await Order.find({
      trackNumber: trackOrder,
    })
      .populate("products._id", "name")
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
exports.getAllOrders = async () => {
  try {
    return await Order.find({})
      .populate("products._id", "name")
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
exports.updateStatus = async (orderId, status) => {
  try {
    const order = await Order.findById(orderId, status);
    if (!order) return null;
    const newStatus = await Order.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        status: {
          status,
        },
      }
    );
    return newStatus;
  } catch (error) {
    throw error;
  }
};
