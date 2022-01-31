import Order from "../models/Order";
import Customer from "../models/CustomerRefund";
import Product from "../models/CustomerCommand";
import SoldProducts from "../models/SoldProducts";
import got from "got";
import User from "../models/User";
import globalConfigs from "../config/globals";
import sendEmail from "../utils/SendEmail";
let finalCustomerRefund = 0;
let productPrice = 0;
let installmentPrice = "";
let customerId = null;
let fname = null;
let lname = null;
let commandId = null;
let phase = "";
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
  installment
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
    installmentPrice = installment;
    for (let product of products) {
      commandId = product._id;
      prod = await Product.findById(product._id);
      if (!prod) return 0; //error code for anavailable product
      if (installment === "Phase1") {
        phase = "Phase 1";
        productPrice = prod.price1 * product.quantity;
      } else if (installment === "Phase2") {
        phase = "Phase 2";
        productPrice = prod.price2 * product.quantity;
      } else {
        phase = "Phase 3";
        productPrice = prod.price3 * product.quantity;
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
      }
      // Calculating discount and customer refund
      if (installmentPrice === "Phase3") {
        let grossProfit = 0;
        grossProfit = parseInt(totalPrice) - parseInt(totalCost);
        profit = grossProfit - vat;
        taxOverProfit = (parseInt(profit) * 3) / 100;
        profitAfterTax = profit - taxOverProfit;
        customerRefund = (parseInt(profitAfterTax) * 15) / 100;
        finalCustomerRefund = customerRefund;
        customerId = id;
        fname = firstName;
        lname = lastName;
      }
      console.log("discount:", discount);

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
    console.log("total amount:", productPrice);
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
      totalAmmount: productPrice,
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
            amount: productPrice,
            currency: "RWF",
            email: momoEmail,
            name: firstName + " " + lastName,
            phone_number: MoMoPhoneNumber,
            redirect_url: "https://byihuse.rw/#/en/session/thank-you-command",
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
exports.saveSoldProducts = async (products, discount = 0) => {
  let profitAfterVat = 0;
  let totalQty = 0;
  let singleProfit = 0;
  let singleVat = 0;
  let singleTaxOverProfit = 0;
  let singleProfitAfterTax = 0;
  let singleCustomerRefund = 0;
  let singleProfitNet = 0;
  let singleDiscount = 0;
  let singleInitialCost = 0;
  let qty = 1;
  let prod = null;
  let singlePrice = 0;
  let reduction = 0;
  for (let product of products) {
    prod = await Product.findById(product._id);
    totalQty += parseInt(product.quantity);
  }
  if (totalQty > 11) {
    for (let product of products) {
      qty = parseInt(product.quantity);
      prod = await Product.findById(product._id);
      if (!prod) return 0; //error code for anavailable product
      if (prod.vat === true) {
        singleVat = parseInt((singlePrice * qty * 18) / 100);
      } else {
        singleVat = 0;
      }

      singleInitialCost = prod.cost * qty;
      reduction = (discount / qty).toFixed(2);
      singleDiscount = (discount - reduction).toFixed(2);
      singlePrice = (prod.price * qty - reduction).toFixed(2);
      singleProfit = (singlePrice - singleInitialCost).toFixed(2);
      profitAfterVat = (singleProfit - singleVat * qty).toFixed(2);
      singleTaxOverProfit = ((profitAfterVat * 3) / 100).toFixed(2);
      singleProfitAfterTax = (profitAfterVat - singleTaxOverProfit).toFixed(2);
      singleCustomerRefund = ((singleProfitAfterTax * 15) / 100).toFixed(2);
      singleProfitNet = (singleProfitAfterTax - singleCustomerRefund).toFixed(
        2
      );

      // save purchased product
      const soldProducts = new SoldProducts({
        customerNames: fname + " " + lname,
        name: prod.name.en,
        initialCost: singleInitialCost,
        price: singlePrice,
        vat: singleVat,
        profit: profitAfterVat,
        taxOverProfit: singleTaxOverProfit,
        profitAfterTax: singleProfitAfterTax,
        customerRefund: singleCustomerRefund,
        profitNet: singleProfitNet,
        discount: singleDiscount,
        quantity: qty,
      });
      await soldProducts.save();
    }
  } else {
    for (let product of products) {
      prod = await Product.findById(product._id);
      if (!prod) return 0; //error code for anavailable product
      if (prod.vat === true) {
        singleVat = parseInt((singlePrice * 18) / 100);
      } else {
        singleVat = 0;
      }
      qty = parseInt(product.quantity);
      singleInitialCost = prod.cost * qty;
      singlePrice = prod.price * qty;
      singleProfit = parseInt(singlePrice - singleInitialCost);
      profitAfterVat = singleProfit - singleVat;
      singleTaxOverProfit = (profitAfterVat * 3) / 100;
      singleProfitAfterTax = profitAfterVat - singleTaxOverProfit;
      singleCustomerRefund = (singleProfitAfterTax * 15) / 100;
      singleProfitNet = singleProfitAfterTax - singleCustomerRefund;
      singleDiscount = 0;

      // save purchased product
      const soldProducts = new SoldProducts({
        customerNames: fname + " " + lname,
        name: prod.name.en,
        initialCost: singleInitialCost,
        price: singlePrice,
        vat: singleVat,
        profit: profitAfterVat,
        taxOverProfit: singleTaxOverProfit,
        profitAfterTax: singleProfitAfterTax,
        customerRefund: singleCustomerRefund,
        profitNet: singleProfitNet,
        discount: singleDiscount,
        quantity: qty,
      });
      await soldProducts.save();
    }
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
      if (installmentPrice === "Phase3") {
        //saving customer refund fees

        const customer = new Customer({
          refund: finalCustomerRefund,
          user: customerId,
          phone: body.data.customer.phone_number,
          email: body.data.customer.email,
        });
        customer.save();
      }

      //update customer command
      const cmd = await Product.find({ _id: commandId });
      const totalPaid = parseInt(cmd[0].totalPaid) + parseInt(productPrice);
      const commandUpdate = await Product.updateMany(
        {
          _id: commandId,
        },
        {
          $set: {
            totalPaid: totalPaid,
            status: installmentPrice + " Paid",
          },
        }
      );
      const replacemnts = {
        phase: phase,
      };
      sendEmail.sendMail(odr.email, "Phase Paid", replacemnts);
      sendEmail.sendMail(
        "jpbusiness250@gmail.com",
        "Command Paid",
        `${odr.firstName} ${odr.lastName} has paid ${phase} of command`
      );
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

exports.getAll = async (customerId) => {
  try {
    return await Order.find({ userId: customerId })
      .populate("userId")
      .exec()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    throw err;
  }
};

exports.getOrderByEmail = async (email) => {
  try {
    return await Order.find({
      email: email,
    })
      .populate("products._id")
      .exec()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    throw err;
  }
};
exports.getCustomerRefund = async () => {
  try {
    return await Customer.find()
      .populate("users._id")
      .exec()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    throw err;
  }
};
