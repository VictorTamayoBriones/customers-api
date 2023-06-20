import express from 'express';
import RouterCustomer from './routes/customers.routes';

const app = express();
app.use(express.json());
const PORT = 3000;

app.use('/api/customers', RouterCustomer);

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
});