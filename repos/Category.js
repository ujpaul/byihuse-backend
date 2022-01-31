import Category from '../models/Category';
exports.create = async (name, department) =>{
    try{
        const newCategory = await Category.create({name, department});
        return newCategory;
    }catch(err){
        throw err;
    }
};

exports.update = async (categoryId, name) => {
    try {
        return await Category.findByIdAndUpdate(
            {_id: categoryId},
            {name},
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

exports.getAllCategories = async () => {
    try {
        return await Category.find()
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

exports.addProduct = async (categoryId, productId) => {
    try {
        return await Category.update(
            {_id: categoryId},
            {$push: {products: productId}}
        );
        
    } catch (error) {
        throw error;
    }
}

exports.getCategoryProducts = async (categoryId) => {
    try {
        return await Category.findById(categoryId)
                .populate('products')
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
