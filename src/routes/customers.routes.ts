import express from 'express'
import { getCustomers } from '../services/customer.service';

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

router.get('/:id', (_req, res)=>{
    res.send('one customer');
});

export default router;