import ServiceOrder from '../models/ServiceOrder';
import Service from '../models/Service';

exports.addServiceOrder = async (serviceId, firstName, lastName, email, phone, address, details, agentCode) => {
    try {

        const service = await Service.findById(serviceId);
        if(!service)
            return null;

        const odr = new ServiceOrder({
            service,
            firstName,
            lastName,
            email,
            phone,
            address,
            details,
            agentCode,
            logs: [{name: firstName + ' ' + lastName, role: 'CLIENT', action: 'Placed order', status: true}]
        });

        await odr.save();
        return odr;

    } catch (err) {
        throw err;
    }
};

exports.updateStatus = async (orderId, status, comment, user) => {
    try {
        const order = await ServiceOrder.findById(orderId);
        if(!order)
            return null;
        const newServiceOrder = await ServiceOrder.findByIdAndUpdate({
            _id: orderId
        }, {
            status: {status, comment},
            $push: {
                logs: {
                    name: user.firstName + ' '+ user.lastName,
                    role: user.role,
                    action: status,
                    comment: comment,
                    status: true
                }
            }
        },{new: true});

        return newServiceOrder;
    } catch (err) {
        throw err;
    }
};

exports.updateExpectedAmount = async (orderId, expectedAmount, comment, user) => {
    try {
        const order = await ServiceOrder.findById(orderId);
        if(!order)
            return null;
        const newServiceOrder = await ServiceOrder.findByIdAndUpdate({
            _id: orderId
        }, {
            expectedAmount,
            $push: {
                logs: {
                    name: user.firstName + ' '+ user.lastName,
                    role: user.role,
                    action: "Updated expected amount to " + expectedAmount,
                    comment: comment,
                    status: true
                }
            }
        },{new: true});

        return newServiceOrder;
    } catch (err) {
        throw err;
    }
};

exports.paidCash = async (orderId, amount, user) => {
    try {
        
        const order = await ServiceOrder.findById(orderId);
        if(!order)
            return null;
            
        const newServiceOrder = await ServiceOrder.findByIdAndUpdate({
            _id: orderId
        }, {
            $inc: {totalAmountPaid: amount},
            $push: {
                logs: {
                    name: user.firstName + ' '+ user.lastName,
                    role: user.role,
                    action: 'Received cash: '+ amount,
                    comment: "",
                    status: true,
                    time: Date.now()
                },
                paymentLogs: {
                    receivedBy: user.firstName + ' '+ user.lastName,
                    method: 'CASH',
                    amount: amount,
                    time: Date.now()
                }
            }
        }, {new: true});
        return newServiceOrder;
    } catch (err) {
        throw err;
    }
};

exports.getAll = async () => {
    try {
        return await ServiceOrder.find()
            .populate('service')
            .exec()
            .then(res => {
                return res;
            })
            .catch(err => {
                return err;
            });

    } catch (err) {
        throw err;
    }
};

exports.getMyOrders = async (email) => {
    try {
        return await ServiceOrder.find({email: email})
            .populate('service')
            .exec()
            .then(res => {
                return res;
            })
            .catch(err => {
                return err;
            });

    } catch (err) {
        throw err;
    }
};