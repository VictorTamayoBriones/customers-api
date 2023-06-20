import { pool } from "../db";


export const getCustomers = async () => {
    try{
        const [customers] = await pool.query("SELECT * FROM customers");
        return customers;
    }catch(err){
        return {message: 'Something goes wrong'};
    }
}

export const getCustomerById = async (id: string) =>{
    try{
        const [customers] = await pool.query("SELECT * FROM customers WHERE id = ?", [id]);
        return customers;
    }catch(err){
        return {message: 'Something goes wrong'}
    }
}