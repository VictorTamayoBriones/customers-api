import { pool } from "../db";


export const getCustomers = async () => {
    try{
        const [customers] = await pool.query("SELECT * FROM customers");
        return customers;
    }catch(err){
        return {message: 'Something goes wrong'};
    }
}