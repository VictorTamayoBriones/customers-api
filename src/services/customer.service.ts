import { pool } from "../db";
import { unionVersions } from "../helpers/unionVersions";
import { ICustomer } from "../models/customer.models";
import { v4 as UUID } from 'uuid';


export const getCustomers = async () => {
    try{
        const [customers] = await pool.query("SELECT * FROM customers");
        const [versions] = await pool.query("SELECT * FROM versions");
        const data = unionVersions(customers, versions);
        return data;
    }catch(err){
        return {message: 'Something goes wrong'};
    }
}

export const getCustomerById = async (id: string) =>{
    try{
        const [customers]:any = await pool.query("SELECT * FROM customers WHERE id = ?", [id]);
        return customers[0];
    }catch(err){
        return {message: 'Something goes wrong'}
    }
}

export const updateCustomerById = async (id: string, params:any) =>{
    
    try{
        const tempData: ICustomer = await getCustomerById(id);
        const result:any = await pool.query("UPDATE customers SET full_name = IFNULL(?, full_name), nss = IFNULL(?, nss), rfc = IFNULL(?, rfc), phone = IFNULL(?, phone), address = IFNULL(?, address) WHERE id = ?", [params.full_name, params.nss, params.rfc, params.phone, params.address, id]);
        
        if(result[0].affectedRows > 0){
            await pool.query("INSERT INTO versions(id, id_customer, full_name, nss, rfc, phone, address) VALUES (?,?,?,?,?,?,?)", [UUID(), id, tempData.full_name, tempData.nss, tempData.rfc, tempData.phone, tempData.address]);
        }

        return result;
    }catch(err){
        return {message: 'Something goes wrong'}
    }
}