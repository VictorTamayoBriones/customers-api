import express from 'express'
import { getCustomerById, getCustomers } from '../services/customer.service';

const router = express.Router();

router.get('/', async(_req, res)=>{
    await getCustomers()
        .then(customersList => {
            res.json(customersList);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.get('/:id', async(req, res)=>{

    const { id } = req.params;

    if(id != ''){
        const customer = await getCustomerById(id);
        res.json(customer);
    }else{
        res.status(404).json({message: 'Customer not found'});
    }

});



export default router;