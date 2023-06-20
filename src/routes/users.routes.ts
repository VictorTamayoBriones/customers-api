import express from 'express';
import { cleanBodyRequest } from '../helpers/cleanBodyRequest';
import { IAuthData } from '../models/users.model';
import { authuser } from '../services/user.service';

const router = express.Router();

router.post('/auth', async(req, res) =>{
    const bodyParams = req.body;
    const paramsExpected: IAuthData = { user: '', password: ''};
    const bodyParamsCleaned:any = cleanBodyRequest(paramsExpected, bodyParams);

    await authuser(bodyParamsCleaned)
        .then(response => {
            if(!response[0]){
                res.status(422).json({message: 'Email or password are not valid'});
            }else{
                res.json(response);
            }
        })
        .catch(err => res.status(500).json(err))
});
export default router;