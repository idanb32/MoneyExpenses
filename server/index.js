const express= require('express');
const cors= require('cors');

const container= require('./contaierConfig');
const config = container.resolve('config')
const PORT= config.get('DevServer.port');
const origin = config.get('DevServer.originAllowed');

const expensesRouter = require('./routers/PersonExpensesRouter');

const app = express();
app.use(express.json());
app.use(cors({
    origin:origin
}));

app.use('/expenses',expensesRouter);



app.listen(PORT, ()=>{
    console.log(`server is listening to the s1ck bits of PORT : ${PORT}`);
});
