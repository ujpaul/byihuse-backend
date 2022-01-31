import RentalOrder from '../models/RentalOrder';
import Rental from '../models/Rental';

exports.addRentalOrder = async (rentalId, firstName, lastName, email, phone, address, details, agentCode, estimatedHours) => {
    try {
        const rental = await Rental.findById(rentalId);
        if(!rental)
            return null;
        const odr = new RentalOrder({
            rental: rentalId,
            price: rental.price,
            firstName,
            lastName,
            email,
            phone,
            address,
            details,
            agentCode,
            estimatedHours: estimatedHours,
            status: {status: 'SENT'},
            realHours: estimatedHours,
            totalAmountExpected: rental.price * estimatedHours,
            rentingCost: rental.price * estimatedHours,
            totalAmountPaid: 0,
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
        const order = await RentalOrder.findById(orderId);
        if(!order)
            return null;
        const newRentalOrder = await RentalOrder.findByIdAndUpdate({
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
        }, {new: true},
        (err, success) => {
            if (err) {
                console.log(err);
                return false;
            }
            return success;
        });
        
        return newRentalOrder;
    } catch (err) {
        throw err;
    }
};

exports.returned = async (orderId, realHours, additionalCosts, comment, user) => {

    try {
        const order = await RentalOrder.findById(orderId);
        if(!order)
            return null;
            
        const rentingCost = order.price * realHours;
        const newRentalOrder = await RentalOrder.findByIdAndUpdate({
            _id: orderId
        }, {
            returned : {status: true, comment, date: Date.now()},
            rentingCost,
            realHours: realHours,
            totalAmountExpected: rentingCost + parseInt(additionalCosts.total),
            additionalCosts: additionalCosts,
            $push: {
                logs: {
                    name: user.firstName + ' '+ user.lastName,
                    role: user.role,
                    action: 'Returned',
                    comment: comment,
                    status: true
                }
            }

        }, {new: true}, (err, success) => {
            if (err) {
                console.log(err);
                return false;
            }
            return success;
        });
        return newRentalOrder;
    } catch (err) {
        throw err;
    }
};

exports.getAllOrders = async () => {
    try {
        return await RentalOrder.find()
            .populate('rental')
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

exports.paidCash = async (orderId, amount, user) => {
    try {
        
        const order = await RentalOrder.findById(orderId);
        if(!order)
            return null;
 
        const newRentalOrder = await RentalOrder.findByIdAndUpdate({
            _id: orderId
        }, {
            $inc: {totalAmountPaid: amount},
            $push: {
                logs: {
                    name: user.firstName + ' '+ user.lastName,
                    role: user.role,
                    action: 'Received cash: ' + amount,
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
        return newRentalOrder;
    } catch (err) {
        throw err;
    }
};

exports.getMyOrders = async (email) => {
    try {
        return await RentalOrder.find({email})
            .populate('rental')
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
