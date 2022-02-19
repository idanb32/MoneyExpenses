const container = require('./contaierConfig');
const awilix = require('awilix');
const PersonExpensesRep = require('./repostories/PersonExpensesRep')

container.register({
    PersonExpensesRep : awilix.asClass(PersonExpensesRep).singleton()
});
module.exports = container
