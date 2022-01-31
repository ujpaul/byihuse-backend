import Message from '../repos/Message';
import Response from '../utils/Responses';

exports.create = async (req, res) =>{
    try{
        const {
            firstName,
            lastName,
            email,
            subject,
            message
        } = req.body;
        const results = await Message.create(firstName, lastName, email, subject, message);
        Response.Success(res, 200, "created successfully", results);
    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.getMessages= async (req, res) =>{
    try{
        const results = await Message.getMessages();
        Response.Success(res, 200, "queried successfully", results);

    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};


