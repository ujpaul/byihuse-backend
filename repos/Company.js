import Company from "../models/Company";
exports.create = async (name, paymentMethod, logo) => {
  try {
    const newCompany = await Company.create({
      name,
      paymentMethod,
      logo,
    });
    return newCompany;
  } catch (err) {
    throw err;
  }
};

exports.update = async (companyId, name, logo) => {
  try {
    return await Company.findByIdAndUpdate(
      {
        _id: companyId,
      },
      {
        name,
        logo,
      },
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

exports.getCompanies = async () => {
  try {
    return await Company.find()
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
