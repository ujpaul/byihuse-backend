import Service from '../models/Service';

exports.create = async (name, description, category, department, company, price, pictures) =>{
    try{
        const newService = await Service.create({
            name,
            description,
            category,
            department,
            company,
            price,
            pictures
        });
        return newService;
    }catch(err){
        throw err;
    }
};

exports.update = async (serviceId, name, description, company, price, featured) => {
    try {
        return await Service.findByIdAndUpdate(
            {_id: serviceId},
            {name, description, company, price, featured},
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

exports.getServiceDetails = async (serviceId) => {
    try {
        return await Service.findById(serviceId)
                .populate('department', 'name')
                .populate('category', 'name')
                .populate('company', 'name')
                .exec()
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                })
    } catch (error) {
        throw error
    }
}

exports.getAll = async () => {
    try {
        return await Service.find()
                .populate('department', 'name')
                .populate('category', 'name')
                .populate('company', 'name')
                .exec()
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                })
    } catch (error) {
        throw error
    }
}
