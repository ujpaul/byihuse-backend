import Category from '../repos/Category';
import Department from '../repos/Department';
import Response from '../utils/Responses';
import Log from '../utils/Log';

exports.create = async (req, res) =>{
    try{
        const {name, department} = req.body;
        const results = await Category.create(name, department);
        await Department.addCategory(department, results._id);
        Log.save(req.user.firstName + ' ' + req.user.lastName, req.user.role, "Created category: " + name.en, 'create category', 'category', true);
        Response.Success(res, 200, "Created successfully", results);
    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.update = async (req, res) =>{
    try{
        const {name} = req.body;
        const {categoryId} = req.params;
        const results = await Category.update(categoryId, name);
        Response.Success(res, 200, "Updated successfully", results);
        Log.save(req.user.firstName + ' ' + req.user.lastName, req.user.role, "udapte category: " + categoryId + " to:" + name.en, 'udapte category', 'category', true);
    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.getAllCategories = async (req, res) =>{
    try{
        const results = await Category.getAllCategories();
        Response.Success(res, 200, "queried successfully", results);

    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};


exports.getCategoryProducts = async (req, res) =>{
    try{
        const {categoryId} = req.params;
        const results = await Category.getCategoryProducts(categoryId);
        Response.Success(res, 200, "queried successfully", results);

    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};