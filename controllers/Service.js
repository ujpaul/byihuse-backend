import Service from '../repos/Service';
import Response from '../utils/Responses';
import Log from '../utils/Log';

exports.create = async (req, res) =>{
    try{
        const {
            name,
            description,
            category,
            department,
            company,
            price
        } = req.body;
        const nameObj = JSON.parse(name)
        const descriptionObj = JSON.parse(description)

        if(!req.files.picture1 || !req.files.picture2 || !req.files.picture3 || !req.files.picture4){
            Log.save(req.user.firstName + ' ' + req.user.lastName, req.user.role, "create service: " + name.en + " failed because of pictures", 'create service', 'service', false);
            return Response.validationError(res, "please provide all four pictures: picture1, picture2, picture3, picture4")
        }
        const pictures = {
            pic1: req.files.picture1[0].filename,
            pic2: req.files.picture2[0].filename,
            pic3: req.files.picture3[0].filename,
            pic4: req.files.picture4[0].filename,
        }
        
        const results = await Service.create(nameObj, descriptionObj, category, department, company, price, pictures);
        Log.save(req.user.firstName + ' ' + req.user.lastName, req.user.role, "create service: " + name.en, 'create service', 'service', true);
        Response.Success(res, 200, "Created successfully", results);
        
    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.update = async (req, res) =>{
    try{
        const {
            name,
            description,
            company,
            price,
            featured
        } = req.body;
        const {serviceId} = req.params;
        const nameObj = JSON.parse(name);
        const descriptionObj = JSON.parse(description);
        const results = await Service.update(serviceId, nameObj, descriptionObj, company, price, featured);
        Log.save(req.user.firstName + ' ' + req.user.lastName, req.user.role, "update service: " + serviceId + ", " + name.en, 'update service', 'service', true);
        Response.Success(res, 200, "Updated successfully", results);

    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};


exports.getServiceDetails = async (req, res) =>{
    try{
        const {serviceId} = req.params;
        const results = await Service.getServiceDetails(serviceId);
        Response.Success(res, 200, "queried successfully", results);
    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};
exports.getAll = async (req, res) =>{
    try{
        const results = await Service.getAll();
        Response.Success(res, 200, "queried successfully", results);
    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};