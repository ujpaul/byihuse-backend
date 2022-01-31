import axios from "axios";
import Order from "../models/Order";
import Customer from "../models/CustomerRefund";
import Product from "../models/Product";
import SoldProducts from "../models/SoldProducts";
import got from "got";
import User from "../models/User";
import globalConfigs from "../config/globals";
const Ravepay = require("flutterwave-node");

var forge = require("node-forge");
let finalCustomerRefund = 0;
let customerId = null;
let fname = null;
let lname = null;
let code = null;
let product = null;
let productProfit = 0;
let discount = 0;
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
  totalAmmount
) => {
  product = products;
  try {
    const orderedProducts = [];
    let prod = null;
    let prodOrder = null;
    let productPrice = 0;
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
    if (agentCode) {
      code = agentCode;
    }
    for (let product of products) {
      prod = await Product.findById(product._id);
      if (!prod) return 0; //error code for anavailable product
      productPrice = prod.price * product.quantity;
      cost = prod.cost * product.quantity;
      productProfit += productPrice - cost;
      if (prod.vat === true) {
        vat += parseInt(((productPrice - cost) * 18) / 100);
      } else {
        vat = 0;
      }
      if (
        product.additionalServices &&
        Array.isArray(product.additionalServices)
      ) {
        for (const ac of product.additionalServices) {
          productPrice += ac.price * product.quantity;
        }
      }
      totalQuantity += parseInt(product.quantity);
      totalPrice += productPrice;
      totalCost += cost;
      if (totalQuantity > 11) {
        discount = (totalPrice * 3) / 100;
        totalPrice = totalPrice - discount;
      }
      prodOrder = {
        _id: prod._id,
        productPrice: prod.price,
        additionalServices: product.additionalServices,
        quantity: product.quantity,
      };
      orderedProducts.push(prodOrder);
    }
    if (totalQuantity > 11) {
      if (parseInt(totalPrice) !== parseInt(totalAmmount)) return 0;
    }
    if (totalQuantity < 12) {
      if (parseInt(totalPrice) !== parseInt(totalAmmount)) return 0;
    }
    discount = discount;
    console.log("discount:", discount);
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
    let payment = [];
    let logs = [];
    if (paymentOption === "MOMO") {
      payment = [
        {
          amount: totalPrice,
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
            // redirect_url: "https://byihuse.rw/#/en/session/thank-you",
            redirect_url: "http://localhost:8080/#/en/session/thank-you",
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
// Charge visa card
// const rave = new Ravepay(
//   "FLWPUBK_TEST-f0570661411b60a7301844b491aa4414-X",
//   "FLWSECK_TEST-928a473a1a03f7dbea5cdeafecc83df8-X",
//   false
// );

// const payload = {
//   card_number: "5531 8866 5214 2950",
//   cvv: "564",
//   expiry_month: "09",
//   expiry_year: "32",
//   currency: "RWF",
//   amount: "1000",
//   email: "user@gmail.com",
//   fullname: "yemi desola",
//   tx_ref: "MC-3243e",
//   redirect_url: "https://webhook.site/3ed41e38-2c79-4c79-b455-97398730866c",
// };
// const stringified = JSON.stringify(payload);
// const key = "be18e819baaaae33bda4b37c";

// exports.chargeCard = async (data) => {
//   console.log(data);

//   var cipher = forge.cipher.createCipher(
//     "3DES-ECB",
//     forge.util.createBuffer(key)
//   );
//   cipher.start({ iv: "" });
//   cipher.update(forge.util.createBuffer(stringified, "utf-8"));
//   cipher.finish();
//   var encrypted = cipher.output.toHex();
//   console.log("encccc==>", encrypted);
// return forge.util.encode64(encrypted.getBytes());

// // generate a random key and IV
// let key = "370651177bf6372b6bab797c";
// let iv = forge.random.getBytesSync(8);

// // encrypt some bytes
// let cipher = forge.rc2.createEncryptionCipher(key);
// cipher.start(iv);
// cipher.update(forge.util.createBuffer(stringified));
// cipher.finish();
// let encrypted = cipher.output;
// const enkey = encrypted.toHex();
// // outputs encrypted hex
// console.log("ENC==>", encrypted.toHex());

// // decrypt some bytes
// let decCipher = forge.rc2.createDecryptionCipher(key);
// cipher.start(iv);
// cipher.update(encrypted);
// cipher.finish();
// // outputs decrypted hex
// console.log("DEC==>", decCipher.output.toHex());
// // const enc
// const data = {
//   client: enkey,
// };

// axios({
//   method: "POST",
//   url: "https://api.flutterwave.com/v3/charges?type=card",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer FLWSECK-be18e819baaa44c6298ebc69c0e5cee2-X",
//   },
//   data: {
//     client: encrypted,
//   },
// })
//   .then((res) => console.log("res==>", res))
//   .catch((err) => console.log(err));
// const res = await got.post(
//   "https://api.flutterwave.com/v3/charges?type=card ",
//   {
//     client: enkey,
//   }
// );

// rave.Card.charge({
//   cardno: cardNbr,
//   cvv: cvv,
//   expirymonth: expirymonth,
//   expiryyear: expiryYear,
//   currency: "rwf",
//   country: "RW",
//   amount: amount,
//   email: email,
//   phonenumber: phone,
//   firstname: firstname,
//   lastname: lastname,
//   IP: "",
//   txRef: "MC-" + Date.now(), // your unique merchant reference
//   meta: [{ metaname: "flightID", metavalue: "123949494DC" }],
//   redirect_url: "http://localhost:8080/#/en/session/thank-you",
//   device_fingerprint: "",
// })
//   .then((resp) => {
//     console.log("First response====>>", resp.body.data);
//     rave.Card.validate({
//       transaction_reference: resp.body.data.flwRef,
//       otp: 123567,
//     }).then((response) => {
//       console.log("res two===>", response.body.data);
//     });
//     return resp.body;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// rave.Card.charge({
//   cardno: "5438898014560229",
//   cvv: "564",
//   expirymonth: "10",
//   expiryyear: "24",
//   currency: "NGN",
//   country: "NG",
//   amount: "10",
//   email: "user@gmail.com",
//   phonenumber: "0902620185",
//   firstname: "temi",
//   lastname: "desola",
//   IP: "355426087298442",
//   txRef: "MC-" + Date.now(), // your unique merchant reference
//   meta: [{ metaname: "flightID", metavalue: "123949494DC" }],
//   redirect_url: "https://rave-webhook.herokuapp.com/receivepayment",
//   device_fingerprint: "69e6b7f0b72037aa8428b70fbe03986c",
// })
//   .then((resp) => {
//     // console.log(resp.body);
//     rave.Card.validate({
//       transaction_reference: resp.body.data.flwRef,
//       otp: 12345,
//     }).then((response) => {
//       console.log(response.body.data.tx);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };

// charge card
const chargeCard = async () => {
  try {
    const response = await flw.Charge.card(payload);
    console.log(response);
    if (response.meta.authorization.mode === "pin") {
      let payload2 = payload;
      payload2.authorization = {
        mode: "pin",
        fields: ["pin"],
        pin: 3310,
      };
      const reCallCharge = await flw.Charge.card(payload2);

      const callValidate = await flw.Charge.validate({
        otp: "12345",
        flw_ref: reCallCharge.data.flw_ref,
      });
      console.log(callValidate);
    }
    if (response.meta.authorization.mode === "redirect") {
      var url = response.meta.authorization.redirect;
      open(url);
    }

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// chargeCard();

const saveSoldProducts = async (products, discount = 0, agentFee) => {
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
        singleVat = parseInt(singlePrice * qty - (prod.cost * qty * 18) / 100);
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
      console.log("Prod===>", prod);
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
        payment: prod.paymentMethod,
        agentFees: agentFee,
      });
      await soldProducts.save();
    }
  } else {
    for (let product of products) {
      prod = await Product.findById(product._id);
      if (!prod) return 0; //error code for anavailable product
      if (prod.vat === true) {
        singleVat = parseInt(((singlePrice - prod.cost * qty) * 18) / 100);
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
        payment: prod.paymentMethod,
        agentFees: agentFee,
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
          $inc: { balance: o.totalAmountPaid * globalConfigs.agentPercentage },
        }
      );
    }
    return newOrder;
  } catch (err) {
    throw err;
  }
};

exports.verifyMoMoPayment = async (orderId, transactionId, user) => {
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

    if (
      body.status === "success" &&
      body.data.tx_ref === orderId &&
      body.data.currency === "RWF" &&
      body.data.amount === odr.totalAmmount
    ) {
      console.log("user id", customerId);
      //saving customer refund fees
      const customer = new Customer({
        refund: finalCustomerRefund,
        user: customerId,
        phone: body.data.customer.phone_number,
        email: body.data.customer.email,
      });
      const savedCustomer = await customer.save();
      console.log("email", body.data.customer.email);
      let updatedOrder = await Order.findByIdAndUpdate(
        {
          _id: orderId,
        },
        {
          totalAmountPaid: odr.totalAmmount,

          $push: {
            payment: {
              amount: odr.totalAmmount,
              time: Date.now(),
              method: "MOMO",
              receivedBy: null,
            },
            logs: {
              name: user.firstName + " " + user.lastName,
              role: user.role,
              action: "MOMO payment",
              comment: "verified MOMO payment",
            },
          },
        },
        {
          new: true,
        }
      );
      let commission = 0;
      if (code !== null) {
        const agentdt = await User.find({ "agentData.code": code });
        if (agentdt[0].agentData.type === "mobile") {
          commission = (parseInt(productProfit) * 7) / 100;
        } else {
          commission = (parseInt(productProfit) * 10) / 100;
        }

        // const fullCommission = parseagentdt[0].agentData.balance + commission
        await User.updateMany(
          { _id: agentdt[0]._id },
          {
            $set: {
              "agentData.balance": agentdt[0].agentData.balance + commission,
            },
          }
        );
      }
      saveSoldProducts(product, discount, commission);
      console.log("mission==>", commission);
      console.log("discount ==>", discount);
      sendEmail.sendMail(
        "jpbusiness250@gmail.com",
        "Client order",
        `${odr.firstName} ${odr.lastName} has made on byihuse just now`
      );
      return [savedCustomer, updatedOrder];
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
