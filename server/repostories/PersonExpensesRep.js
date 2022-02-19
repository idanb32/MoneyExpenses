const Expense = require('../models/expenes');
const PersonExpenses = require('../models/personExpenses');
const container = require('../contaierConfig');
const mongose = container.resolve('mongoose');


module.exports = class PersonExpensesRep {

    async addPersonFromBody(body) {
        return await this.addPerson(body.Name, body.Balance, body.DayOfTracking)
    }

    async getPersonFromBody(body) {
        let person = await this.getPerson(body.id);
        return person;
    }

    async addExpenseFromBody(body) {
        return await this.addExpense(body.id, body.Amount, body.DayOfPurches, body.NameOfShop);
    }

    async updatePersonFromBody(body) {
        let personAfterChange = await this.updatePerson(body.id, body.Name, body.Balance, body.DayOfTracking);
        return personAfterChange;
    }

    async handlePayFromBody(body) {
        return await this.handlePay(body.id);
    }

    async addPerson(Name, Balance, DayOfTracking) {
        try {
            let newPerson = new PersonExpenses({
                Name: Name,
                Balance: Balance,
                DayOfTracking: DayOfTracking,
                AmountToPayThisMonth: 0
            });
            await newPerson.save();
            return newPerson._id;
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async addExpense(id, Amount, DayOfPurches, NameOfShop) {
        try {
            let newExpense = new Expense({
                Amount: Amount,
                DayOfPurches: DayOfPurches,
                NameOfShop: NameOfShop
            })
            newExpense.save();
            let person = await this.getPerson(id);
            person.PurchesOfMonth.push(newExpense._id);
            person.AmountToPayThisMonth += Number(Amount);
            await person.save();
            return (newExpense);
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async getPerson(id) {
        try {
            let personSearch = await PersonExpenses.findById(id);
            return personSearch;
        }
        catch (error) {
            console.log(error)
            return error
        }
    }
    async getMonthlyExpensesByIdFromBody(body) {
        let res = await this.getMonthlyExpensesById(body.id);
        return res;
    }

    async getMonthlyExpensesById(id) {
        let person = await this.getPerson(id);
        let PurchesOfMonth = [];
        if (person.PurchesOfMonth != []) {
            for (let id of person.PurchesOfMonth) {
                let purches = await this.getPurchesById(id);
                PurchesOfMonth.push(purches);
            }
            PurchesOfMonth.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            })
        }
        return PurchesOfMonth;
    }

    async getPurchesById(id) {
        try {
            let purches = await Expense.findById(id);
            return purches;
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async handlePay(id) {
        try {
            let person = await this.getPerson(id);
            console.log()
            if (new Date(Date.now()) >= new Date(person.DayOfTracking)) {
                person.Balance = Number(person.Balance) - Number(person.AmountToPayThisMonth);
                person.AmountToPayThisMonth = 0;
                await this.cleanPersonPurches(person.PurchesOfMonth);
                person.PurchesOfMonth = [];
            }
            await person.save();
            return person;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    async cleanPersonPurches(arrOfId) {
        try {
            for (let id of arrOfId) {
                await Expense.deleteOne({ _id: id })
            }
        }
        catch (error) {
            console.log(error)
            return error;
        }
    }

    async updatePerson(id, Name, Balance, DayOfTracking) {
        try {
            await PersonExpenses.updateOne({ _id: id }, {
                Name: Name,
                Balance: Balance,
                DayOfTracking: DayOfTracking
            });
        }
        catch (err) {
            console.log(err);
            return err;
        }
        try {
            let person = this.getPerson(id);
            return person
        }
        catch (err2) {
            console.log(err2);
            return err2;
        }
    }

}