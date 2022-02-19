const container = require('../containerRep');
const rep = container.resolve('PersonExpensesRep');

const express = require('express');
const router = express.Router();

router.post('/AddPerson',async(req,res)=>{
    let personId = await rep.addPersonFromBody(req.body);
    res.send(personId);
});

router.post('/AddExpense', async(req,res)=>{
    let newExpense = await rep.addExpenseFromBody(req.body);
    res.send(newExpense);
});

router.post('/GetPerson',async (req,res)=>{
    let personId = await rep.getPersonFromBody(req.body);
    res.send(personId);
});

router.post('/GetPersonExpenses',async (req,res)=>{
    let monthlyRes = await rep.getMonthlyExpensesByIdFromBody(req.body);
    res.send(monthlyRes);
});

router.post("/UpdatePerson" ,async(req,res)=>{
    let personAfterChange = await rep.updatePersonFromBody(req.body);
    res.send(personAfterChange);
});

router.post("/PayIfNeeded", async(req,res)=>{
    let personAfterPayment = await rep.handlePayFromBody(req.body);
    res.send(personAfterPayment);
})

module.exports = router;

