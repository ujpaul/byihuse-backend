import Department from '../repos/Department';
import Response from '../utils/Responses';
import Log from '../utils/Log';

exports.create = async (req, res) => {
	try {
		const { name, offersServices, offersRental } = req.body;
		const results = await Department.create(name, offersServices, offersRental);
		Log.save(
			req.user.firstName + ' ' + req.user.lastName,
			req.user.role,
			'create department: ' + name,
			'create department',
			'department',
			true
		);

		Response.Success(res, 200, 'created successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};

exports.update = async (req, res) => {
	try {
		const { name, offersServices, offersRental } = req.body;
		const { departmentId } = req.params;
		const results = await Department.update(departmentId, name, offersServices, offersRental);
		Log.save(
			req.user.firstName + ' ' + req.user.lastName,
			req.user.role,
			'update department: ' + departmentId + ' to: ' + name,
			'update department',
			'department',
			true
		);
		Response.Success(res, 200, 'Updated successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};

exports.getAllDepartments = async (req, res) => {
	try {
		const results = await Department.getAllDepartments();
		Response.Success(res, 200, 'queried successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};

exports.getDepartmentCategories = async (req, res) => {
	try {
		const { departmentId } = req.params;
		const results = await Department.getDepartmentCategories(departmentId);
		Response.Success(res, 200, 'queried successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};

exports.getAllData = async (req, res) => {
	try {
		const results = await Department.getAllData();
		Response.Success(res, 200, 'queried successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};
exports.getAllMadeInRwandaData = async (req, res) => {
	try {
		const results = await Department.getAllMadeInRwandaData();
		Response.Success(res, 200, 'queried successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};
