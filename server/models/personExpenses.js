const container = require('../contaierConfig');
const mongoose = container.resolve('mongoose');
const Schema =mongoose.Schema;

const personExpensesScheme = new Schema({
    Name:{
        type: String,
        require:[true,"The person name is a require field"]
    },
    Balance:{
        type:Number,
        require:[true,"The blance is a required field"]
    },
    DayOfTracking:{
        type:Date,
        require:[true,"The Day of tracking is a required field"]
    },
    PurchesOfMonth:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Expense'
    }],
    AmountToPayThisMonth:{
        type:Number
    }

});

const PersonExpenses = mongoose.model('PersonExpenses', personExpensesScheme);
module.exports = PersonExpenses;