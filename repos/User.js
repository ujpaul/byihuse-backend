import User from '../models/User';

exports.create = async (firstName, lastName, email, password, role, assignedDepartments = null) =>{
    try{
        let agentData = null;
        if(role === 'AGENT'){
            code = 100000 + Math.round( Math.random() * 900000 );
            agentData = {
                code,
                balance: 0,
                approved: false
            }
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role,
            agentData,
            assignedDepartments
        });
        return await newUser.save();
    }catch(err){
        throw err;
    }
};

exports.updateName = async (userId, firstName, lastName) => {
    try {
        return await User.findByIdAndUpdate(
            {_id: userId},
            { firstName, lastName},
            (err, success) => {
                if(err){
                    console.log(err);
                    return false;
                }
                return success;
            }
        );
        
    } catch (error) {
        throw error;
    }
}

exports.updateEmail = async (userId, email) => {
    try {
        return await User.findByIdAndUpdate(
            {_id: userId},
            {email},
            (err, success) => {
                if(err){
                    console.log(err);
                    return false;
                }
                return success;
            }
        );
        
    } catch (error) {
        throw error;
    }
}

exports.updatePassword = async (userId, password) => {
    try {
        return await User.findByIdAndUpdate(
            {_id: userId},
            {password},
            (err, success) => {
                if(err){
                    console.log(err);
                    return false;
                }
                return success;
            }
        );
        
    } catch (error) {
        throw error;
    }
}

exports.updateAssignedDepartments = async (userId, assignedDepartments) => {
    try {
        return await User.findByIdAndUpdate(
            {_id: userId},
            {assignedDepartments},
            (err, success) => {
                if(err){
                    console.log(err);
                    return false;
                }
                return success;
            }
        );
        
    } catch (error) {
        throw error;
    }
}

exports.getUserByEmail = async (email) => {
    try {
        return await User.findOne({email: email})
                .populate('assignedDepartments')
                .exec()
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
    } catch (error) {
        throw error
    }
}

exports.getUserById = async (userId) => {
    try {
        return await User.findById(userId)
                .populate('assignedDepartments')
                .exec()
                .then(res => {
                    console.log(res);
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
    } catch (error) {
        throw error
    }
}

exports.getAllUsers = async (role) => {
    try {
        return await User.find({role: role})
                    .populate('assignedDepartments')
                    .exec()
                    .then(res => {
                        return res;
                    })
                    .catch(err => {
                        console.log(err);
                        return false;
                    });
    } catch (error) {
        throw error
    }
}

exports.payAgent = async (agentId, amount, paymentMethod, user) => {
    try {
        const agent = await User.findById(agentId);
        if(!agent)
            return 0; //agent does not exists
        if(parseInt(amount) > parseInt(agent.agentData.balance))
            return -1; //insuffient amount
        
        return await User.findByIdAndUpdate(
            {_id: agentId},
            {
                "agentData.balance": parseInt(agent.agentData.balance) - parseInt(amount),
                $push: {
                    "agentData.paymentLogs": {
                        paymentMethod,
                        amount,
                        balance: parseInt(agent.agentData.balance) - parseInt(amount),
                        time: Date.now(),
                        paidBy: user.role + ': ' + user.firstName + ' ' + lastName, 
                    }
                }
            },
            {new: true}
        );
        
    } catch (error) {
        throw error;
    }
}
