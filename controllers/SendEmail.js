import Response from "../utils/Responses";
import sendMail from "../utils/SendEmail";
exports.sendMail = (req, res) => {
  const { email, message } = req.body;
  try {
    const results = sendMail.sendMail(email, message);
    Response.Success(res, 200, "Reply sent successfully", results);
  } catch (error) {
    console.log("server error:" + error);
    Response.InternalServerError(
      res,
      "We are having issues to send email! please try again soon"
    );
  }
};
