import Log from '../models/Log';
exports.save = (userName, userType, action, actionType, model, succeded) =>{
    try{
        console.log(userName, userType, action, model, succeded);
        return Log.create({userName, userType, action, actionType, model, succeded});
    }catch(err){
        throw err;
    }
};

