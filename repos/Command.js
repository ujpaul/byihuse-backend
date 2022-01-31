import Command from "../models/Command";
import customerCommand from "../models/CustomerCommand";
import ConfirmedReceivedCommand from "../models/ConfirmationReceivedCommand";
exports.create = async (names, phone, email, product, details, amount) => {
  try {
    const newCommand = await Command.create({
      names,
      phone,
      email,
      product,
      details,
      amount,
    });
    return newCommand;
  } catch (err) {
    throw err;
  }
};

exports.confirmedReceivedCommand = async (
  names,
  phone,
  email,
  product,
  operatorNames
) => {
  try {
    const newCommand = await ConfirmedReceivedCommand.create({
      names,
      phone,
      email,
      product,
      operatorNames,
    });
    return newCommand;
  } catch (err) {
    throw err;
  }
};

exports.assignCommandToCustomer = async (
  name,
  description,
  category,
  department,
  company,
  price1,
  price2,
  price3,
  totalPrice,
  cost,
  isMadeInRwanda,
  vat,
  commandOwner,
  pictures
) => {
  try {
    if (
      parseInt(price1) + parseInt(price2) + parseInt(price3) !==
      parseInt(totalPrice)
    ) {
      console.log("Invalid price");
      return 0;
    }
    const newProduct = await customerCommand.create({
      name,
      description,
      category,
      department,
      company,
      price1,
      price2,
      price3,
      totalPrice,
      cost,
      commandOwner,
      isMadeInRwanda,
      vat,
      pictures,
    });
    return newProduct;
  } catch (err) {
    throw err;
  }
};
exports.getCommand = async () => {
  try {
    return await Command.find()
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
exports.getApprovedCommand = async () => {
  try {
    return await customerCommand
      .find()
      .populate("department", "name")
      .populate("category", "name")
      .populate("company")
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
exports.getApprovedCommandForCustomer = async (email) => {
  try {
    return await customerCommand
      .find({ commandOwner: email })
      .populate("department", "name")
      .populate("category", "name")
      .populate("company")
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
