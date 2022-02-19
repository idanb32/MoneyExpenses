const container = require('../contaierConfig');
const mongoose = container.resolve('mongoose');
const Schema = mongoose.Schema;

const expenseScheme = new Schema({
    Amount:{
        type:Number,
        require:[true,"The Amount of the purches is a required field"]
    },
    DayOfPurches:{
        type:Date,
        require:[true,"The Day of the purches is a required field"]
    },
    NameOfShop:{
        type:String
    }
});


const Expense = mongoose.model('Expense', expenseScheme);
module.exports = Expense;