import Currency from '../repos/Currency';
import Response from '../utils/Responses';
import Log from '../utils/Log';
exports.create = async (req, res) =>{
    try{
        const {name, symbol, currentValue} = req.body;
        const {_id, firstName, lastName} = req.user;
        
        const results = await Currency.create(name, symbol, currentValue, {_id, firstName, lastName} );

        Response.Success(res, 200, "created successfully", results);
    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.update = async (req, res) =>{
    try{
        const {currentValue} = req.body;
        const {currencyId} = req.params;
        const {_id, firstName, lastName} = req.user;

        const results = await Currency.update(currencyId, currentValue, {_id, firstName, lastName});
   
        Response.Success(res, 200, "Updated successfully", results);

    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.getCurrencies = async (req, res) =>{
    try{
        const results = await Currency.getCurrencies();
        Response.Success(res, 200, "queried successfully", results);

    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};


