import Company from "../repos/Company";
import Response from "../utils/Responses";
import Log from "../utils/Log";
exports.create = async (req, res) => {
  try {
    const { name, paymentMethod } = req.body;
    if (!req.file) {
      return Response.validationError(res, "please provide the company logo");
    }
    const logo = req.file.filename;
    const results = await Company.create(name, paymentMethod, logo);

    Log.save(
      req.user.firstName + " " + req.user.lastName,
      req.user.role,
      "create company: " + name,
      "create company",
      "company",
      true
    );

    Response.Success(res, 200, "created successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};

exports.update = async (req, res) => {
  try {
    const { name, logo } = req.body;
    const { companyId } = req.params;
    const results = await Company.update(companyId, name, logo);

    Log.save(
      req.user.firstName + " " + req.user.lastName,
      req.user.role,
      "update company: " + companyId + " to:" + name,
      "update company",
      "company",
      true
    );

    Response.Success(res, 200, "Updated successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const results = await Company.getCompanies();
    Response.Success(res, 200, "queried successfully", results);
  } catch (err) {
    console.log(err);
    Response.InternalServerError(
      res,
      "We are having issues! please try again soon"
    );
  }
};
