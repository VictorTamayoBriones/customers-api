import express from 'express'
import { createCustomer, deleteCustomerById, getCustomerById, getCustomers, getDeletedCustomers, resetVersion, updateCustomerById } from '../services/customer.service';
import { cleanBodyRequest } from '../helpers/cleanBodyRequest';
import { requestCustomer } from '../models/customer.models';

const router = express.Router();
router.get('/deleted', async(_req, res)=>{
    console.log('sdksdhkfjdshkf')
    const customer = await getDeletedCustomers();
    res.json(customer);

});

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
    const paramsExpected: requestCustomer = { full_name: '', nss: '', rfc: '', phone: 0};

    if(id != ''){
        
        const bodyParamsCleaned = cleanBodyRequest(paramsExpected, bodyParams);
        await updateCustomerById(id, bodyParamsCleaned)
            .then( ()=> {
                res.send('updated successfully');
            })
            .catch(err => res.json(err));
        
    }else{
        res.status(404).json({message: 'Customer not found'});
    }
})

router.post('/version/:id', async(req, res) =>{
    const { id } = req.params;
    await resetVersion(id)
        .then(response =>{
            res.json(response)
        })
        .catch(err=>res.status(500).json(err))
})

router.post('/', async(req, res) =>{
    const bodyParams = req.body;
    const paramsExpected: requestCustomer = { full_name: '', nss: '', rfc: '', phone: 0};
    const bodyParamsCleaned = cleanBodyRequest(paramsExpected, bodyParams);
    await createCustomer(bodyParamsCleaned)
        .then( (response)=> {
            if(response.message){
                res.json(response)
            }
        })
        .catch(err => res.json(err)); 
})


router.delete('/:id', async(req, res)=>{
    const { id } = req.params;

    if(id != ''){
        await deleteCustomerById(id);
        res.json({message: 'Deleted successfully'});
    }else{
        res.status(404).json({message: 'Customer not found'});
    }
})

export default router;