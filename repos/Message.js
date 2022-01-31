import Message from '../models/Message';
exports.create = async (firstName, lastName, email, subject, message) => {
    try {
        const newMessage = await Message.create({
            firstName,
            lastName,
            email,
            subject,
            message
        });
        return newMessage;
    } catch (err) {
        throw err;
    }
};

exports.getMessages = async () => {
    try {
        return await Message.find()
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