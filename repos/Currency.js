import Currency from '../models/Currency';
exports.create = async (name, symbol, currentValue, user) => {
    try {
       
        const newCurrency = new Currency({
            name,
            symbol,
            currentValue,
        });
        
        newCurrency.logs.push({
            name: user.firstName + ' ' + user.lastName,
            role: user.role,
            updatedAmount: currentValue,
            time: Date.now()
         });

        await newCurrency.save();

        return newCurrency;
    } catch (err) {
        throw err;
    }
};

exports.update = async (currencyId,  currentValue, user) => {
    try {
        return await Currency.findByIdAndUpdate({
                _id: currencyId
            }, {
                currentValue,
                $push: {
                    logs: {
                        name: user.firstName + ' ' + user.lastName,
                        role: user.role,
                        updatedAmount: currentValue,
                        time: Date.now()
                     }
                }
            },{new: true}
        );

    } catch (error) {
        throw error;
    }
}

exports.getCurrencies = async () => {
    try {
        return await Currency.find()
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