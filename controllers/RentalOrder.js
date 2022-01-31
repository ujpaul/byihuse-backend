import RentalOrder from '../repos/RentalOrder';
import Response from '../utils/Responses';

exports.addOrder = async (req, res) => {
    try {
        const {
            rentalId,
            firstName,
            lastName,
            email,
            phone,
            address,
            details,
            agentCode,
            estimatedHours
        } = req.body;
        

        const results = await RentalOrder.addRentalOrder(rentalId, firstName, lastName, email, phone, address, details, agentCode, estimatedHours);
        if(!results)
            return Response.validationError(res, "Rental chosen does not exist");
        Response.Success(res, 200, "submitted successfully", results);
    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const {
            status,
            comment
        } = req.body;
        const {
            orderId
        } = req.params;
        
        const results = await RentalOrder.updateStatus(orderId, status, comment, req.user);
        if(!results)
            return Response.validationError(res, "Order chosen does not exist");
        Response.Success(res, 200, "updated successfully", results);
    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.returned = async (req, res) => {
    try {
        const {
            orderId
        } = req.params;
        const {
            realHours,
            additionalCosts,
            comment
        } = req.body;

        const results = await RentalOrder.returned(orderId, realHours, additionalCosts, comment, req.user);
        if(!results)
        return Response.validationError(res, "Order chosen does not exist");
        Response.Success(res, 200, "updated successfully", results);
    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.paidCash = async (req, res) => {
    try {
        const {
            amount
        } = req.body;
        const {
            orderId
        } = req.params;

        const results = await RentalOrder.paidCash(orderId, amount, req.user );
        if(!results)
            return Response.validationError(res, "order chosen does not exist");
        Response.Success(res, 200, "updated successfully", results);
    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.getAllOrders = async (req, res) => {
    try {

        const results = await RentalOrder.getAllOrders();
        Response.Success(res, 200, "queried successfully", results);

    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}

exports.getMyOrders = async (req, res) => {
    try {
        const {email} = req.user;
        const results = await RentalOrder.getMyOrders(email);
        Response.Success(res, 200, "queried successfully", results);

    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}
