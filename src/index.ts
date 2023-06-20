import express from 'express';
import RouterCustomer from './routes/customers.routes';
import RouterUsers from './routes/users.routes';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());
const PORT = 3000;

app.use('/api/customers', RouterCustomer);
app.use('/api/users', RouterUsers);

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
});