import User from '../repos/User';
import Response from '../utils/Responses';
import bcrypt from 'bcrypt';
import passportConfig from '../config/passport';
import Log from '../utils/Log';
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            role,
            assignedDepartments
        } = req.body;
        const check = await User.getUserByEmail(email);
        if (check !== null) {
            Log.save(email, null, "sign up", 'sign up', 'user', false);
            return Response.validationError(res, "Email already exists!");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const userData = await User.create(
            firstName,
            lastName,
            email,
            encryptedPassword,
            role,
            assignedDepartments
        );
        const payload = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            isVerified: userData.isVerified,
            assignedDepartments: userData.assignedDepartments
        };
        const token = await jwt.sign({
            user: payload
        }, passportConfig.secret);
        Log.save(userData.firstName + ' ' + userData.lastName, userData.role, "sign up", 'sign up', 'user', true);
        return Response.Success(res, 200, "user signed up successfully", {
            user: payload,
            token: token
        });

    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.updateName = async (req, res) => {
    try {
        const {
            firstName,
            lastName
        } = req.body;
        const userId = req.user.id;
        const userData = await User.updateName(userId, firstName, lastName);
        const payload = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            isVerified: userData.isVerified,
            assignedDepartments: userData.assignedDepartments
        };
        const token = await jwt.sign({
            user: payload
        }, passportConfig.secret);
        return Response.Success(res, 200, "updated successfully", {
            user: payload,
            token: token
        });
    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}

exports.updateEmail = async (req, res) => {
    try {
        const {
            email
        } = req.body;
        const userId = req.user.id;
        const check = await User.getUserByEmail(email);
        if (check !== null) {
            Log.save(email, null, "update email", 'update email', 'user', false);
            return Response.validationError(res, "Email already exists!");
        }

        const userData = await User.updateEmail(userId, email)
        const payload = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            isVerified: userData.isVerified,
            assignedDepartments: userData.assignedDepartments
        };
        const token = await jwt.sign({
            user: payload
        }, passportConfig.secret);
        return Response.Success(res, 200, "updated successfully", {
            user: payload,
            token: token
        });

    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const {
            oldPassword,
            newPassword
        } = req.body;
        console.log(req.user.id);
        const userId = req.user.id;

        const check = await User.getUserById(userId);
        if (check === null)
            return Response.validationError(res, "User does not exist");

        if (!await bcrypt.compare(oldPassword, check.password))
            return Response.validationError(res, "Invalid old password");

        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        const userData = await User.updatePassword(userId, encryptedPassword);

        const payload = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            isVerified: userData.isVerified,
            assignedDepartments: userData.assignedDepartments
        };
        const token = await jwt.sign({
            user: payload
        }, passportConfig.secret);
        return Response.Success(res, 200, "updated successfully", {
            user: payload,
            token: token
        });

    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}

exports.updateAssignedDepartments = async (req, res) => {
    try {
        const {
            assignedDepartments,
            userId
        } = req.body;

        const userData = await User.updateAssignedDepartments(userId, assignedDepartments);
        const payload = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            isVerified: userData.isVerified,
            assignedDepartments: userData.assignedDepartments
        };
        const token = await jwt.sign({
            user: payload
        }, passportConfig.secret);
        return Response.Success(res, 200, "updated successfully", {
            user: payload,
            token: token
        });

    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const {
            role
        } = req.params
        const users = await User.getAllUsers(role);
        Response.Success(res, 200, "queried successfully", users);
    } catch (error) {
        throw error
    }
}

exports.signin = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const userData = await User.getUserByEmail(email);
        if (userData === null) {
            Log.save(email, null, "sign in with invalid email", 'sign in', 'user', false);
            return Response.validationError(res, "Email does not exists!");
        }

        if (!await bcrypt.compare(password, userData.password)) {
            Log.save(email, null, "sign in with invalid password", 'sign in', 'user', false);
            return Response.validationError(res, "Invalid credentials");
        }

        const payload = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            isVerified: userData.isVerified,
            assignedDepartments: userData.assignedDepartments
        };
        const token = await jwt.sign({
            user: payload
        }, passportConfig.secret);
        Log.save(userData.firstName + ' ' + userData.lastName, userData.role, "sign in", 'sign in', 'user', true);
        return Response.Success(res, 200, "user signed in successfully", {
            user: payload,
            token: token
        });

    } catch (error) {
        throw error
    }
}


exports.payAgent = async (req, res) => {
    try {
        const {
            amount, paymentMethod
        } = req.body;
        const {
            agentId
        } = req.params;
        
        const results = await User.payAgent(agentId, amount, paymentMethod, req.user);
        
        if(results === 0)
            return Response.validationError(res, "agent chosen does not exixt");
        if(results === -1)
            return Response.validationError(res, "Insuficient balance");

        Response.Success(res, 200, "updated successfully", results);

    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}

exports.authenticate = async (req, res) => {
    try {
        const {
            id
        } = req.user;
        const userData = await User.getUserById(id);
        if (userData === null)
            return Response.validationError(res, "Invalid token!");

        const payload = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            isVerified: userData.isVerified,
            assignedDepartments: userData.assignedDepartments
        };
        const token = await jwt.sign({
            user: payload
        }, passportConfig.secret);
        return Response.Success(res, 200, "Token is valid", {
            user: payload,
            token: token
        });

    } catch (error) {
        throw error
    }
}