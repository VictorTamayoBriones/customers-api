import express from 'express'
import { getCustomerById, getCustomers } from '../services/customer.service';
import { cleanBodyRequest } from '../helpers/cleanBodyRequest';
import { requestCustomer } from '../models/customer.models';

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

router.patch('/:id', async(req, res)=>{
    const { id } = req.params;
    const bodyParams = req.body;
    const paramsExpected: requestCustomer = { full_name: '', nss: '', rfc: '', phone: 0, address: '', contrac: ''};

    if(id != ''){
        
        const bodyParamsCleaned = cleanBodyRequest(paramsExpected, bodyParams);
        
        console.log(bodyParamsCleaned)
        res.send('update successfully');
    }else{
        res.status(404).json({message: 'Customer not found'});
    }
})

export default router;