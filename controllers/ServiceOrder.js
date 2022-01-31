import ServiceOrder from '../repos/ServiceOrder';
import Response from '../utils/Responses';

exports.addServiceOrder = async (req, res) => {
    try {
        const {
            serviceId,
            firstName,
            lastName,
            email,
            phone,
            address,
            details, 
            agentCode
        } = req.body;
        

         const results = await ServiceOrder.addServiceOrder(serviceId, firstName, lastName, email, phone, address, details, agentCode);
         if(!results)
            return Response.validationError(res, "Service chosen does not exist");
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
        const results = await ServiceOrder.updateStatus(orderId, status, comment, req.user);
        if(!results)
            return Response.validationError(res, "Order chosen does not exist");
        Response.Success(res, 200, "updated successfully", results);
    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.updateExpectedAmount = async (req, res) => {
    try {
        const {
            expectedAmount,
            comment
        } = req.body;
        const {
            orderId
        } = req.params;
        const results = await ServiceOrder.updateExpectedAmount(orderId, expectedAmount, comment, req.user);
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

        const results = await ServiceOrder.paidCash(orderId, amount, req.user );
        if(!results)
            return Response.validationError(res, "order chosen does not exist");
        Response.Success(res, 200, "updated successfully", results);
    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};


exports.getAll = async (req, res) => {
    try {

        const results = await ServiceOrder.getAll();
        Response.Success(res, 200, "queried successfully", results);

    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}

exports.getMyOrders = async (req, res) => {
    try {
        const {email} = req.user;
        const results = await ServiceOrder.getMyOrders(email);
        Response.Success(res, 200, "queried successfully", results);

    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}